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
  timeline: string;
  features: string[];
  techStack: { frontend: string; backend: string; database: string; hosting: string };
  codeebeProvides: string[];
  phases: { phase: number; name: string; duration: string; deliverables: string[] }[];
  marketComparison: {
    summary: string;
    competitors: {
      name: string;
      priceRange: string;
      timeline: string;
      highlights: string[];
      gaps: string[];
    }[];
    codeebe: { priceRange: string; timeline: string; highlights: string[] };
    whyCodeebe: string[];
  };
  notes: string[];
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

  async sendChatLeadSummary(input: {
    adminEmail: string;
    clientName: string;
    clientEmail: string;
    clientPhone?: string;
    companyName?: string;
    projectType: string;
    description?: string;
    features?: string[];
    timeline?: string;
    budgetRange?: string;
    conversationSummary?: string;
    leadId?: string;
  }): Promise<void> {
    if (!this.enabled) {
      this.logger.log(
        `[MAIL DISABLED] Chat lead summary for ${input.clientEmail}: ${input.projectType}`,
      );
      return;
    }

    const featuresHtml =
      input.features && input.features.length > 0
        ? input.features
            .map(
              (f) =>
                `<li style="margin:4px 0;color:#333">${f}</li>`,
            )
            .join('')
        : '<li style="color:#888">Not specified</li>';

    const adminLink = input.leadId
      ? `${this.webUrl}/admin/leads/${input.leadId}`
      : `${this.webUrl}/admin`;

    const html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#fafafa">
        <div style="background:#0a0a0a;border-radius:12px;padding:20px 24px;margin-bottom:16px">
          <p style="margin:0 0 4px;color:#ff6b00;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase">New Chat Lead</p>
          <h2 style="margin:0;color:#fff;font-size:20px">${input.clientName}</h2>
          <p style="margin:6px 0 0;color:#aaa;font-size:13px">${input.projectType}</p>
        </div>

        <div style="background:#fff;border:1px solid #eee;border-radius:12px;padding:20px 24px;margin-bottom:12px">
          <h3 style="margin:0 0 12px;color:#111;font-size:14px">Contact</h3>
          <table style="width:100%;border-collapse:collapse;font-size:13px;color:#444">
            <tr><td style="padding:4px 0;width:120px;color:#888">Name</td><td>${input.clientName}</td></tr>
            <tr><td style="padding:4px 0;color:#888">Email</td><td><a href="mailto:${input.clientEmail}" style="color:#ff6b00">${input.clientEmail}</a></td></tr>
            <tr><td style="padding:4px 0;color:#888">Phone</td><td>${input.clientPhone || 'Not provided'}</td></tr>
            <tr><td style="padding:4px 0;color:#888">Company</td><td>${input.companyName || 'Not provided'}</td></tr>
          </table>
        </div>

        <div style="background:#fff;border:1px solid #eee;border-radius:12px;padding:20px 24px;margin-bottom:12px">
          <h3 style="margin:0 0 12px;color:#111;font-size:14px">Requirements</h3>
          <table style="width:100%;border-collapse:collapse;font-size:13px;color:#444">
            <tr><td style="padding:4px 0;width:120px;color:#888">Project</td><td>${input.projectType}</td></tr>
            <tr><td style="padding:4px 0;color:#888">Timeline</td><td>${input.timeline || 'Not specified'}</td></tr>
            <tr><td style="padding:4px 0;color:#888">Budget</td><td>${input.budgetRange || 'Not specified'}</td></tr>
          </table>
          <p style="margin:12px 0 6px;color:#888;font-size:12px">Description</p>
          <p style="margin:0;color:#333;font-size:13px;line-height:1.5">${input.description || 'No description captured'}</p>
          <p style="margin:14px 0 6px;color:#888;font-size:12px">Features requested</p>
          <ul style="margin:0;padding-left:18px">${featuresHtml}</ul>
        </div>

        ${
          input.conversationSummary
            ? `<div style="background:#fff;border:1px solid #eee;border-radius:12px;padding:20px 24px;margin-bottom:12px">
          <h3 style="margin:0 0 12px;color:#111;font-size:14px">Conversation summary</h3>
          <pre style="margin:0;white-space:pre-wrap;font-family:inherit;font-size:12px;line-height:1.55;color:#555">${input.conversationSummary}</pre>
        </div>`
            : ''
        }

        <p style="margin:16px 0 0">
          <a href="${adminLink}"
             style="background:#ff6b00;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block;font-size:13px;font-weight:600">
            View in Admin Panel
          </a>
        </p>
      </div>`;

    await this.transporter!.sendMail({
      from: this.from,
      to: input.adminEmail,
      replyTo: input.clientEmail,
      subject: `💬 Chat Lead — ${input.clientName} wants ${input.projectType}`,
      html,
    });

    this.logger.log(`Chat lead summary sent to ${input.adminEmail} for ${input.clientEmail}`);
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

    const featureItems = input.features.length > 0
      ? input.features.map(f =>
          `<span style="display:inline-block;margin:3px 4px 3px 0;padding:3px 10px;border-radius:20px;border:1px solid rgba(255,107,0,0.3);background:rgba(255,107,0,0.08);color:#ff8533;font-size:11px">${f}</span>`
        ).join('')
      : '<span style="color:#666;font-size:12px">Core scope (no extra features selected)</span>';

    const techRows = Object.entries(input.techStack).map(([key, val]) =>
      `<tr>
        <td style="padding:7px 12px;color:#888;font-size:11px;text-transform:capitalize;border-bottom:1px solid #222;white-space:nowrap;width:90px">${key}</td>
        <td style="padding:7px 12px;color:#ccc;font-size:12px;border-bottom:1px solid #222">${val}</td>
      </tr>`
    ).join('');

    const phaseRows = input.phases.map(p =>
      `<tr>
        <td style="padding:8px 12px;vertical-align:top;border-bottom:1px solid #1e1e1e">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:rgba(255,107,0,0.15);color:#ff6b00;font-size:11px;font-weight:700">${p.phase}</span>
        </td>
        <td style="padding:8px 12px;border-bottom:1px solid #1e1e1e">
          <p style="margin:0 0 3px;color:#ddd;font-size:12px;font-weight:600">${p.name}</p>
          <p style="margin:0 0 4px;color:#666;font-size:10px">${p.duration}</p>
          <p style="margin:0;color:#888;font-size:10px">${p.deliverables.join(' · ')}</p>
        </td>
      </tr>`
    ).join('');

    const competitorCols = input.marketComparison.competitors.map(c =>
      `<td style="padding:14px 16px;vertical-align:top;border-right:1px solid #222;width:33%">
        <p style="margin:0 0 6px;color:#bbb;font-size:12px;font-weight:600">${c.name}</p>
        <p style="margin:0 0 2px;color:#999;font-size:16px;font-weight:700">${c.priceRange}</p>
        <p style="margin:0 0 10px;color:#555;font-size:10px">${c.timeline}</p>
        ${c.gaps.slice(0, 3).map(g => `<p style="margin:0 0 5px;color:#e05050;font-size:10px">✗ &nbsp;${g}</p>`).join('')}
      </td>`
    ).join('');

    const whyItems = input.marketComparison.whyCodeebe.map(w =>
      `<p style="margin:0 0 7px;color:#bbb;font-size:12px">→ &nbsp;${w}</p>`
    ).join('');

    const codeebeHighlights = input.marketComparison.codeebe.highlights.map(h =>
      `<p style="margin:0 0 5px;color:#4ade80;font-size:11px">✓ &nbsp;${h}</p>`
    ).join('');

    const provideItems = input.codeebeProvides.map(p =>
      `<p style="margin:0 0 6px;color:#bbb;font-size:12px">✓ &nbsp;${p}</p>`
    ).join('');

    const noteItems = input.notes.map(n =>
      `<p style="margin:0 0 6px;color:#777;font-size:11px">· &nbsp;${n}</p>`
    ).join('');

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your ${input.projectType} Quotation — Codeebe</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 12px 48px">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px">

  <!-- ── Header ── -->
  <tr><td style="background:linear-gradient(135deg,#1a0d03,#1f1209,#0d0d0d);padding:32px 32px 28px;border-radius:16px 16px 0 0;border:1px solid #2a1a0a;border-bottom:none">
    <p style="margin:0 0 6px;color:#ff6b00;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase">Codeebe · Project Quotation</p>
    <h1 style="margin:0 0 6px;color:#fff;font-size:24px;font-weight:800;line-height:1.25">Your ${input.projectType} Brief is Ready</h1>
    <p style="margin:0;color:#888;font-size:13px">Hi ${input.name}, here's your full project summary and market comparison.</p>
  </td></tr>

  <!-- ── Part 1: Project Summary ── -->
  <tr><td style="background:#111;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;padding:0">

    <!-- Price hero -->
    <div style="padding:28px 32px 24px;border-bottom:1px solid #1e1e1e">
      <p style="margin:0 0 4px;color:#666;font-size:10px;text-transform:uppercase;letter-spacing:0.14em">Estimated Investment</p>
      <p style="margin:0 0 4px;color:#ff6b00;font-size:38px;font-weight:900;line-height:1;letter-spacing:-0.02em">${minFmt} <span style="color:#555;font-size:26px">– ${maxFmt}</span></p>
      <p style="margin:0;color:#555;font-size:11px">Final cost confirmed after a discovery call. No hidden charges.</p>
      <table style="margin-top:14px" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:20px">
            <p style="margin:0;color:#888;font-size:10px;text-transform:uppercase;letter-spacing:0.1em">Timeline</p>
            <p style="margin:2px 0 0;color:#ccc;font-size:12px;font-weight:600">${input.timeline}</p>
          </td>
          <td>
            <p style="margin:0;color:#888;font-size:10px;text-transform:uppercase;letter-spacing:0.1em">Features</p>
            <p style="margin:2px 0 0;color:#ccc;font-size:12px;font-weight:600">${input.features.length} selected</p>
          </td>
        </tr>
      </table>
    </div>

    <!-- Features -->
    <div style="padding:20px 32px;border-bottom:1px solid #1e1e1e">
      <p style="margin:0 0 10px;color:#999;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em">Selected Features</p>
      <div>${featureItems}</div>
    </div>

    <!-- Tech Stack -->
    <div style="padding:20px 32px;border-bottom:1px solid #1e1e1e">
      <p style="margin:0 0 10px;color:#999;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em">Recommended Tech Stack</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #222;border-radius:8px;overflow:hidden">
        ${techRows}
      </table>
    </div>

    <!-- What Codeebe Provides -->
    <div style="padding:20px 32px;border-bottom:1px solid #1e1e1e">
      <p style="margin:0 0 10px;color:#999;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em">What Codeebe Provides</p>
      ${provideItems}
    </div>

    <!-- Delivery Roadmap -->
    <div style="padding:20px 32px;border-bottom:1px solid #1e1e1e">
      <p style="margin:0 0 10px;color:#999;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em">Delivery Roadmap</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #1e1e1e;border-radius:8px;overflow:hidden">
        ${phaseRows}
      </table>
    </div>

    <!-- Pricing Notes -->
    <div style="padding:18px 32px 0;border-bottom:1px solid #1e1e1e">
      <p style="margin:0 0 8px;color:#999;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em">Pricing Notes</p>
      ${noteItems}
      <p style="margin:14px 0 0;padding:0"></p>
    </div>
  </td></tr>

  <!-- ── Part 2: Market Comparison ── -->
  <tr><td style="background:#0e0e0e;border-left:1px solid #2a2a2a;border-right:1px solid #2a2a2a;padding:0">

    <div style="padding:28px 32px 20px;border-bottom:1px solid #1e1e1e">
      <p style="margin:0 0 4px;color:#ff6b00;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase">Part 2 of 2</p>
      <h2 style="margin:0 0 6px;color:#fff;font-size:18px;font-weight:700">Market Comparison</h2>
      <p style="margin:0;color:#666;font-size:12px">${input.marketComparison.summary}</p>
    </div>

    <!-- Comparison table -->
    <div style="padding:20px 32px;border-bottom:1px solid #1e1e1e;overflow-x:auto">
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #222;border-radius:8px;overflow:hidden;min-width:400px">
        <tr style="background:#161616">
          ${competitorCols}
          <td style="padding:14px 16px;vertical-align:top;width:33%">
            <div style="display:inline-block;background:#ff6b00;color:#1a0a00;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;margin-bottom:6px">Codeebe ✓ Recommended</div>
            <p style="margin:0 0 2px;color:#ff8533;font-size:16px;font-weight:700">${input.marketComparison.codeebe.priceRange}</p>
            <p style="margin:0 0 10px;color:#555;font-size:10px">${input.marketComparison.codeebe.timeline}</p>
            ${codeebeHighlights}
          </td>
        </tr>
      </table>
    </div>

    <!-- Why Codeebe -->
    <div style="padding:20px 32px 28px">
      <p style="margin:0 0 12px;color:#999;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em">Why Codeebe?</p>
      ${whyItems}
    </div>
  </td></tr>

  <!-- ── CTA ── -->
  <tr><td style="background:#111;border:1px solid #2a2a2a;border-top:1px solid #ff6b00/20;padding:28px 32px;text-align:center;border-radius:0 0 16px 16px">
    <p style="margin:0 0 16px;color:#666;font-size:12px">View the full interactive quotation with SRS, requirements, and downloadable PDF:</p>
    <a href="${input.link}"
       style="display:inline-block;background:#ff6b00;color:#1a0a00;font-size:15px;font-weight:800;padding:15px 40px;border-radius:12px;text-decoration:none;letter-spacing:0.01em">
      Open Full Quotation →
    </a>
    <p style="margin:16px 0 0;color:#444;font-size:11px">This interactive link expires in 24 hours. This email is yours to keep.</p>
  </td></tr>

  <!-- ── Footer ── -->
  <tr><td style="padding:24px 32px;text-align:center">
    <p style="margin:0;color:#333;font-size:11px;line-height:1.6">
      <strong style="color:#555">Codeebe</strong> · Premium Product Engineering Studio<br>
      You received this because you submitted a project brief on codeebe.com
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
  }
}
