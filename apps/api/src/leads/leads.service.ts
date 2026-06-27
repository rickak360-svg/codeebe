import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LeadSource, LeadStatus as DbLeadStatus, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { AiService } from '../ai/ai.service';
import { WhatsAppService } from '../notifications/whatsapp.service';
import { toLead } from './lead.mapper';
import { computeLeadScore } from './lead-score.utils';
import { generateMarketComparison, generateSRS } from './srs.generator';
import type {
  CreateLeadInput,
  EstimateResult,
  Lead,
  LeadStatus,
} from './types/lead.types';

const BASE_PRICING: Record<string, [number, number]> = {
  'Landing Page': [12_000, 30_000],
  'Business Website': [25_000, 70_000],
  'WordPress Website': [20_000, 65_000],
  eCommerce: [50_000, 150_000],
  'SaaS MVP': [150_000, 500_000],
  Marketplace: [250_000, 800_000],
  'CRM/Admin Dashboard': [75_000, 300_000],
  'Booking Platform': [60_000, 200_000],
  'Automation Workflow': [30_000, 150_000],
  'Custom Software': [100_000, 600_000],
};

const CODEEBE_PROVIDES = [
  'Requirement clarity workshop',
  'Scalable architecture planning',
  'Clean, modern UI implementation',
  'Admin panel when needed',
  'Deployment & hosting guidance',
  'Maintainable codebase',
  'Post-launch support options',
];

const VALID_STATUSES: LeadStatus[] = [
  'new',
  'contacted',
  'meeting_scheduled',
  'proposal_sent',
  'converted',
  'lost',
];

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly ai: AiService,
    private readonly whatsapp: WhatsAppService,
  ) {}

  async create(
    input: CreateLeadInput,
  ): Promise<{ lead: Lead; estimate: EstimateResult }> {
    this.validateCreate(input);

    const estimate = this.calculateEstimate(input);
    const { score, label: scoreLabel } = computeLeadScore(input, estimate);
    const srs = generateSRS(input, estimate.minPrice, estimate.maxPrice);
    const marketComparison = generateMarketComparison(input, estimate.minPrice, estimate.maxPrice);
    const quotationToken = randomUUID();
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const row = await this.prisma.lead.create({
      data: {
        fullName: input.fullName.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone.trim(),
        companyName: input.companyName?.trim() || null,
        projectType: input.projectType,
        description: input.description.trim(),
        features: input.features ?? [],
        timeline: input.timeline,
        budgetRange: input.budgetRange?.trim() || null,
        source: input.source ? (input.source as LeadSource) : null,
        status: DbLeadStatus.new,
        estimate: estimate as unknown as Prisma.InputJsonValue,
        srs: srs as unknown as Prisma.InputJsonValue,
        marketComparison: marketComparison as unknown as Prisma.InputJsonValue,
        quotationToken,
        tokenExpiresAt,
        score,
        scoreLabel,
      },
    });

    // Enrich the quotation with AI in the background, then email once ready so
    // the recipient's link shows the AI version. Falls back to the templates
    // already stored above if AI is disabled or fails.
    void this.enrichAndNotify(row.id, input, estimate, srs, marketComparison, {
      to: row.email,
      name: row.fullName,
      phone: row.phone,
      projectType: row.projectType,
      quotationToken,
      score,
      scoreLabel,
    });

    return { lead: toLead(row), estimate };
  }

  private async enrichAndNotify(
    leadId: string,
    input: CreateLeadInput,
    estimate: EstimateResult,
    srs: import('./srs.generator').SRSDocument,
    marketComparison: import('./srs.generator').MarketComparison,
    mail: {
      to: string;
      name: string;
      phone: string;
      projectType: string;
      quotationToken: string;
      score: number;
      scoreLabel: string;
    },
  ): Promise<void> {
    let finalEstimate = estimate;
    try {
      const ai = await this.ai.generateQuotation(input, estimate);
      if (ai) {
        finalEstimate = ai.estimate;
        await this.prisma.lead.update({
          where: { id: leadId },
          data: {
            estimate: ai.estimate as unknown as Prisma.InputJsonValue,
            srs: ai.srs as unknown as Prisma.InputJsonValue,
            marketComparison:
              ai.marketComparison as unknown as Prisma.InputJsonValue,
          },
        });
      }
    } catch (err) {
      console.error('[AI] Quotation enrichment failed:', err);
    }

    const webUrl = process.env.WEB_URL ?? 'http://localhost:3008';
    const quotationUrl = `${webUrl}/quotation/${mail.quotationToken}`;

    // Re-fetch latest SRS/market from DB in case AI updated them
    const latestRow = await this.prisma.lead.findUnique({ where: { id: leadId } });
    const latestSrs = (latestRow?.srs ?? srs) as unknown as import('./srs.generator').SRSDocument;
    const latestMarket = (latestRow?.marketComparison ?? marketComparison) as unknown as import('./srs.generator').MarketComparison;

    this.mail
      .sendQuotationEmail({
        to: mail.to,
        name: mail.name,
        projectType: mail.projectType,
        quotationToken: mail.quotationToken,
        minPrice: finalEstimate.minPrice,
        maxPrice: finalEstimate.maxPrice,
        timeline: input.timeline,
        features: input.features ?? [],
        techStack: latestSrs.techStack,
        codeebeProvides: finalEstimate.codeebeProvides,
        phases: latestSrs.phases,
        marketComparison: latestMarket,
        notes: finalEstimate.notes,
      })
      .catch((err) =>
        console.error('[Mail] Failed to send quotation email:', err),
      );

    this.whatsapp
      .notifyAdminNewLead({
        clientName: mail.name,
        clientPhone: mail.phone,
        projectType: mail.projectType,
        score: mail.score,
        scoreLabel: mail.scoreLabel,
        quotationUrl,
      })
      .catch((err) => console.error('[WhatsApp] Admin notify failed:', err));

    if (process.env.WHATSAPP_NOTIFY_CLIENT === 'true') {
      this.whatsapp
        .notifyClientQuotation({
          toPhone: mail.phone,
          name: mail.name,
          projectType: mail.projectType,
          quotationUrl,
        })
        .catch((err) => console.error('[WhatsApp] Client notify failed:', err));
    }
  }

  async findAll(): Promise<Lead[]> {
    const rows = await this.prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(toLead);
  }

  async findOne(id: string): Promise<Lead> {
    const row = await this.prisma.lead.findUnique({ where: { id } });
    if (!row) {
      throw new NotFoundException(`Lead ${id} not found`);
    }
    return toLead(row);
  }

  async updateStatus(id: string, status: LeadStatus): Promise<Lead> {
    if (!VALID_STATUSES.includes(status)) {
      throw new BadRequestException(`Invalid status: ${status}`);
    }

    try {
      const row = await this.prisma.lead.update({
        where: { id },
        data: { status: status as DbLeadStatus },
      });
      return toLead(row);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Lead ${id} not found`);
      }
      throw error;
    }
  }

  private validateCreate(input: CreateLeadInput): void {
    if (!input.fullName?.trim()) {
      throw new BadRequestException('fullName is required');
    }
    if (!input.email?.trim() || !input.email.includes('@')) {
      throw new BadRequestException('Valid email is required');
    }
    if (!input.phone?.trim()) {
      throw new BadRequestException('phone is required');
    }
    if (!input.projectType?.trim()) {
      throw new BadRequestException('projectType is required');
    }
    if (!input.description?.trim()) {
      throw new BadRequestException('description is required');
    }
    if (!input.timeline?.trim()) {
      throw new BadRequestException('timeline is required');
    }
  }

  calculateEstimate(input: CreateLeadInput): EstimateResult {
    const [baseMin, baseMax] =
      BASE_PRICING[input.projectType] ?? BASE_PRICING['Custom Software'];

    const featureCount = input.features?.length ?? 0;
    let multiplier = 1;
    if (featureCount >= 8) {
      multiplier = 1.4;
    } else if (featureCount >= 4) {
      multiplier = 1.2;
    }

    if (input.timeline.startsWith('Urgent')) {
      multiplier *= 1.2;
    }

    const minPrice = Math.round(baseMin * multiplier);
    const maxPrice = Math.round(baseMax * multiplier);

    const timelineLabel = input.timeline;
    const suggestedPackage = this.suggestPackage(
      input.projectType,
      featureCount,
    );
    const featureSummary =
      featureCount > 0
        ? `${featureCount} selected feature(s): ${input.features.slice(0, 5).join(', ')}${featureCount > 5 ? '…' : ''}`
        : 'Core scope without extra feature modules';

    const notes = [
      'This is a basic estimate; final cost depends on detailed scope and integrations.',
      featureCount >= 8
        ? 'Higher feature count increases complexity — discovery call recommended.'
        : featureCount >= 4
          ? 'Moderate feature set — estimate includes complexity buffer.'
          : 'Base scope estimate for selected project type.',
    ];

    if (input.timeline.startsWith('Urgent')) {
      notes.push('Urgent timeline may require prioritized delivery scheduling.');
    }

    return {
      minPrice,
      maxPrice,
      currency: 'INR',
      timelineLabel,
      suggestedPackage,
      summary: `${input.projectType} — ${featureSummary}`,
      notes,
      codeebeProvides: CODEEBE_PROVIDES,
      marketComparisonNote:
        'Typical agencies often under-scope discovery and post-launch support. Codeebe includes requirement clarity, scalable architecture, and maintainable delivery from day one.',
    };
  }

  private suggestPackage(projectType: string, featureCount: number): string {
    if (
      projectType === 'SaaS MVP' ||
      projectType === 'Marketplace' ||
      projectType === 'Custom Software'
    ) {
      return 'Product Engineering Package';
    }
    if (
      projectType === 'CRM/Admin Dashboard' ||
      projectType === 'Booking Platform' ||
      featureCount >= 6
    ) {
      return 'Platform Build Package';
    }
    if (projectType === 'eCommerce' || projectType === 'WordPress Website') {
      return 'Growth Website Package';
    }
    return 'Starter Delivery Package';
  }
}
