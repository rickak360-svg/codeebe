import {
  Injectable,
  NotFoundException,
  GoneException,
} from '@nestjs/common';
import { InterestLevel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import type { SRSDocument, MarketComparison } from '../leads/srs.generator';
import type { EstimateResult } from '../leads/types/lead.types';
import { buildQuotationPdf } from './quotation.pdf';

@Injectable()
export class QuotationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  async getByToken(token: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { quotationToken: token },
    });

    if (!lead) {
      throw new NotFoundException('Quotation not found. The link may be invalid.');
    }

    if (lead.tokenExpiresAt && lead.tokenExpiresAt < new Date()) {
      throw new GoneException('This quotation link has expired. Please submit a new project brief.');
    }

    // Mark as viewed (non-blocking)
    if (!lead.quotationViewed) {
      this.prisma.lead.update({
        where: { id: lead.id },
        data: { quotationViewed: true },
      }).catch(() => {});
    }

    return {
      id: lead.id,
      fullName: lead.fullName,
      projectType: lead.projectType,
      timeline: lead.timeline,
      features: lead.features,
      estimate: lead.estimate,
      srs: lead.srs,
      marketComparison: lead.marketComparison,
      interestLevel: lead.interestLevel,
      expiresAt: lead.tokenExpiresAt,
      createdAt: lead.createdAt,
    };
  }

  async markInterest(token: string, level: 'interested' | 'meeting_requested') {
    const lead = await this.prisma.lead.findUnique({
      where: { quotationToken: token },
    });

    if (!lead) {
      throw new NotFoundException('Quotation not found.');
    }

    if (lead.tokenExpiresAt && lead.tokenExpiresAt < new Date()) {
      throw new GoneException('This quotation link has expired.');
    }

    const interestLevel = level === 'meeting_requested'
      ? InterestLevel.meeting_requested
      : InterestLevel.interested;

    const updatedStatus = level === 'meeting_requested' ? 'meeting_scheduled' : 'contacted';

    await this.prisma.lead.update({
      where: { id: lead.id },
      data: {
        interestLevel,
        status: updatedStatus as any,
      },
    });

    // Notify admin (non-blocking)
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL;
    if (adminEmail) {
      this.mail.sendInterestNotification({
        adminEmail,
        clientName: lead.fullName,
        clientEmail: lead.email,
        projectType: lead.projectType,
        interestType: level,
        leadId: lead.id,
      }).catch(() => {});
    }

    return {
      success: true,
      message: level === 'meeting_requested'
        ? 'Meeting request received! Our team will contact you within 24 hours to schedule a call.'
        : 'Great! We\'ve noted your interest. Our team will reach out to you shortly.',
    };
  }

  async getPdfByToken(token: string): Promise<Buffer> {
    const lead = await this.prisma.lead.findUnique({
      where: { quotationToken: token },
    });

    if (!lead) {
      throw new NotFoundException('Quotation not found.');
    }

    if (lead.tokenExpiresAt && lead.tokenExpiresAt < new Date()) {
      throw new GoneException('This quotation link has expired.');
    }

    if (!lead.estimate || !lead.srs || !lead.marketComparison) {
      throw new NotFoundException('Quotation data is not ready yet.');
    }

    return buildQuotationPdf({
      fullName: lead.fullName,
      projectType: lead.projectType,
      timeline: lead.timeline,
      estimate: lead.estimate as unknown as EstimateResult,
      srs: lead.srs as unknown as SRSDocument,
      marketComparison: lead.marketComparison as unknown as MarketComparison,
      createdAt: lead.createdAt.toISOString(),
    });
  }
}
