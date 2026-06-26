import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { formatInr } from '../leads/estimate.utils';

export interface QuotationEmailInput {
  to: string;
  name: string;
  projectType: string;
  quotationToken: string;
  minPrice: number;
  maxPrice: number;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter | null = null;
  private readonly enabled: boolean;
  private readonly webUrl: string;
  private readonly from: string;
  private readonly replyTo?: string;

  constructor() {
    this.enabled = process.env.MAIL_ENABLED !== 'false';
    this.webUrl = process.env.WEB_URL ?? 'http://localhost:3000';
    this.from = process.env.SMTP_FROM ?? 'Codeebe <noreply@codeebe.com>';
    this.replyTo = process.env.SMTP_REPLY_TO || undefined;

    if (this.enabled) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    }
  }

  async sendQuotationEmail(input: QuotationEmailInput): Promise<void> {
    const link = `${this.webUrl}/quotation/${input.quotationToken}`;

    if (!this.enabled) {
      this.logger.log(`[MAIL DISABLED] Quotation link for ${input.to}: ${link}`);
      return;
    }

    const html = this.buildQuotationHtml({ ...input, link });

    await this.transporter!.sendMail({
      from: this.from,
      to: input.to,
      ...(this.replyTo ? { replyTo: this.replyTo } : {}),
      subject: `Your ${input.projectType} Quotation from Codeebe`,
      html,
    });

    this.logger.log(`Quotation email sent to ${input.to}`);
  }

  async sendInterestNotification(input: {
    adminEmail: string;
    clientName: string;
    clientEmail: string;
    projectType: string;
    interestType: 'interested' | 'meeting_requested';
    leadId: string;
  }): Promise<void> {
    if (!this.enabled) {
      this.logger.log(`[MAIL DISABLED] Interest notification for lead ${input.leadId}: ${input.interestType}`);
      return;
    }

    const subject = input.interestType === 'meeting_requested'
      ? `🔥 Meeting Request — ${input.clientName} (${input.projectType})`
      : `✅ Client Interested — ${input.clientName} (${input.projectType})`;

    const html = `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
        <h2 style="color:#ff6b00;margin:0 0 12px">${subject}</h2>
        <p style="color:#555">
          <strong>${input.clientName}</strong> (${input.clientEmail}) has expressed interest in their 
          <strong>${input.projectType}</strong> project.
        </p>
        <p style="color:#555">
          Action: <strong>${input.interestType === 'meeting_requested' ? 'Requested a discovery call' : 'Marked as interested'}</strong>
        </p>
        <p><a href="${this.webUrl}/admin/leads/${input.leadId}" 
              style="background:#ff6b00;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block">
          View in Admin Panel
        </a></p>
      </div>`;

    await this.transporter!.sendMail({
      from: this.from,
      to: input.adminEmail,
      replyTo: input.clientEmail,
      subject,
      html,
    });
  }

  private buildQuotationHtml(input: QuotationEmailInput & { link: string }): string {
    const minFmt = formatInr(input.minPrice);
    const maxFmt = formatInr(input.maxPrice);

    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a">
        
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1f1209,#2a1a0a);padding:32px 32px 24px;border-bottom:1px solid #2a2a2a">
          <p style="margin:0 0 8px;color:#ff6b00;font-size:12px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase">Codeebe · Project Brief</p>
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.3">
            Your ${input.projectType} Quotation is Ready
          </h1>
          <p style="margin:12px 0 0;color:#999;font-size:14px">Hi ${input.name}, here's your personalised estimate and project plan.</p>
        </td></tr>

        <!-- Estimate -->
        <tr><td style="padding:28px 32px">
          <p style="margin:0 0 6px;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.12em">Estimated Investment</p>
          <p style="margin:0;color:#ff6b00;font-size:32px;font-weight:800;line-height:1">${minFmt} – ${maxFmt}</p>
          <p style="margin:6px 0 0;color:#666;font-size:12px">Based on your selected scope. Final cost confirmed after discovery call.</p>
        </td></tr>

        <!-- What's inside -->
        <tr><td style="padding:0 32px 24px">
          <div style="background:#111;border:1px solid #2a2a2a;border-radius:12px;padding:20px">
            <p style="margin:0 0 12px;color:#ccc;font-size:13px;font-weight:600">Your quotation includes:</p>
            ${['Detailed SRS (Software Requirements Specification)', 'Full cost & timeline breakdown', 'Tech stack recommendation', 'Market comparison (Codeebe vs agencies)', 'Phase-wise delivery roadmap'].map(
              item => `<p style="margin:0 0 8px;color:#888;font-size:13px">✓ &nbsp;${item}</p>`
            ).join('')}
          </div>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:0 32px 32px;text-align:center">
          <a href="${input.link}" 
             style="display:inline-block;background:#ff6b00;color:#1a0a00;font-size:15px;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;letter-spacing:0.01em">
            View My Quotation →
          </a>
          <p style="margin:16px 0 0;color:#555;font-size:11px">This link expires in 24 hours.</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#111;padding:20px 32px;border-top:1px solid #2a2a2a;text-align:center">
          <p style="margin:0;color:#555;font-size:11px">
            Codeebe · Premium Product Engineering Studio<br>
            You received this because you submitted a project brief.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
  }
}
