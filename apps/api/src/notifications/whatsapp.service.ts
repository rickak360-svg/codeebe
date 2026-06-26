import { Injectable, Logger } from '@nestjs/common';
import twilio from 'twilio';

export interface WhatsAppLeadNotification {
  clientName: string;
  clientPhone: string;
  projectType: string;
  score: number;
  scoreLabel: string;
  quotationUrl?: string;
}

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);
  private readonly enabled: boolean;
  private readonly client: ReturnType<typeof twilio> | null;
  private readonly from: string;
  private readonly adminTo: string;

  constructor() {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    this.from = process.env.TWILIO_WHATSAPP_FROM ?? '';
    this.adminTo = process.env.WHATSAPP_ADMIN_TO ?? '';
    this.enabled =
      process.env.WHATSAPP_ENABLED === 'true' &&
      !!sid &&
      !!token &&
      !!this.from &&
      !!this.adminTo;
    this.client = this.enabled ? twilio(sid, token) : null;

    if (process.env.WHATSAPP_ENABLED === 'true' && !this.enabled) {
      this.logger.warn(
        'WhatsApp enabled but TWILIO_* / WHATSAPP_ADMIN_TO not fully configured.',
      );
    }
  }

  async notifyAdminNewLead(input: WhatsAppLeadNotification): Promise<void> {
    if (!this.enabled || !this.client) {
      this.logger.log(
        `[WHATSAPP DISABLED] New lead: ${input.clientName} (${input.projectType}) score=${input.score}`,
      );
      return;
    }

    const lines = [
      `🔥 New Codeebe lead`,
      `${input.clientName} · ${input.projectType}`,
      `Score: ${input.score}/100 (${input.scoreLabel})`,
      `Phone: ${input.clientPhone}`,
    ];
    if (input.quotationUrl) {
      lines.push(`Quotation: ${input.quotationUrl}`);
    }

    await this.client.messages.create({
      from: this.from,
      to: this.adminTo,
      body: lines.join('\n'),
    });

    this.logger.log(`WhatsApp admin alert sent for ${input.clientName}`);
  }

  async notifyClientQuotation(input: {
    toPhone: string;
    name: string;
    projectType: string;
    quotationUrl: string;
  }): Promise<void> {
    if (!this.enabled || !this.client) return;

    const to = input.toPhone.startsWith('whatsapp:')
      ? input.toPhone
      : `whatsapp:${input.toPhone.replace(/\s/g, '')}`;

    await this.client.messages.create({
      from: this.from,
      to,
      body: `Hi ${input.name}, your ${input.projectType} quotation from Codeebe is ready:\n${input.quotationUrl}`,
    });

    this.logger.log(`WhatsApp quotation sent to ${input.toPhone}`);
  }
}
