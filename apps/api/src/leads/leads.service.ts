import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LeadSource, LeadStatus as DbLeadStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { toLead } from './lead.mapper';
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
  constructor(private readonly prisma: PrismaService) {}

  async create(
    input: CreateLeadInput,
  ): Promise<{ lead: Lead; estimate: EstimateResult }> {
    this.validateCreate(input);

    const estimate = this.calculateEstimate(input);
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
      },
    });

    return { lead: toLead(row), estimate };
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
