import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { createHmac, timingSafeEqual } from 'crypto';
import type { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { InterestLevel, LeadStatus } from '@prisma/client';

type CalendlyWebhookBody = {
  event?: string;
  payload?: {
    email?: string;
    name?: string;
    scheduled_event?: { uri?: string; name?: string };
    event?: string;
  };
};

@Controller('webhooks')
export class WebhooksController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  @Post('calendly')
  @HttpCode(200)
  async calendly(
    @Headers('calendly-webhook-signature') signature: string | undefined,
    @Body() body: CalendlyWebhookBody,
    @Req() req: Request & { rawBody?: Buffer },
  ) {
    this.verifyCalendlySignature(signature, req.rawBody);

    const event = body.event;
    if (event !== 'invitee.created' && event !== 'invitee.canceled') {
      return { received: true, ignored: event };
    }

    const email = body.payload?.email?.trim().toLowerCase();
    if (!email) {
      throw new BadRequestException('Missing invitee email in webhook payload.');
    }

    const lead = await this.prisma.lead.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });

    if (!lead) {
      return { received: true, matched: false };
    }

    if (event === 'invitee.canceled') {
      return { received: true, matched: true, action: 'no_change' };
    }

    const eventUri = body.payload?.scheduled_event?.uri ?? null;

    await this.prisma.lead.update({
      where: { id: lead.id },
      data: {
        status: LeadStatus.meeting_scheduled,
        interestLevel: InterestLevel.meeting_requested,
        calendlyEventUri: eventUri,
      },
    });

    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL;
    if (adminEmail) {
      this.mail
        .sendInterestNotification({
          adminEmail,
          clientName: lead.fullName,
          clientEmail: lead.email,
          projectType: lead.projectType,
          interestType: 'meeting_requested',
          leadId: lead.id,
        })
        .catch(() => {});
    }

    return { received: true, matched: true, leadId: lead.id };
  }

  private verifyCalendlySignature(
    signature: string | undefined,
    rawBody: Buffer | undefined,
  ): void {
    const secret = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
    if (!secret) {
      return;
    }
    if (!signature || !rawBody) {
      throw new UnauthorizedException('Missing Calendly webhook signature.');
    }

    const parts = Object.fromEntries(
      signature.split(',').map((p) => {
        const [k, v] = p.split('=');
        return [k.trim(), v?.trim() ?? ''];
      }),
    );
    const timestamp = parts.t;
    const provided = parts.v1;
    if (!timestamp || !provided) {
      throw new UnauthorizedException('Malformed Calendly webhook signature.');
    }

    const payload = `${timestamp}.${rawBody.toString('utf8')}`;
    const expected = createHmac('sha256', secret).update(payload).digest('hex');

    try {
      const ok = timingSafeEqual(
        Buffer.from(expected, 'hex'),
        Buffer.from(provided, 'hex'),
      );
      if (!ok) throw new Error('mismatch');
    } catch {
      throw new UnauthorizedException('Invalid Calendly webhook signature.');
    }
  }
}
