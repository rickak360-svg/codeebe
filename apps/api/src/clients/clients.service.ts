import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { EstimateResult } from '../leads/types/lead.types';

export type ClientPortalItem = {
  id: string;
  projectType: string;
  status: string;
  score: number;
  scoreLabel: string;
  createdAt: string;
  quotationToken: string | null;
  quotationExpiresAt: string | null;
  quotationActive: boolean;
  minPrice: number | null;
  maxPrice: number | null;
};

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPortalByEmail(email: string): Promise<ClientPortalItem[]> {
    const normalized = email.trim().toLowerCase();
    const rows = await this.prisma.lead.findMany({
      where: { email: normalized },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const now = new Date();

    return rows.map((row) => {
      const estimate = row.estimate as EstimateResult | null;
      const active =
        !!row.quotationToken &&
        (!row.tokenExpiresAt || row.tokenExpiresAt > now);

      return {
        id: row.id,
        projectType: row.projectType,
        status: row.status,
        score: row.score,
        scoreLabel: row.scoreLabel,
        createdAt: row.createdAt.toISOString(),
        quotationToken: row.quotationToken,
        quotationExpiresAt: row.tokenExpiresAt?.toISOString() ?? null,
        quotationActive: active,
        minPrice: estimate?.minPrice ?? null,
        maxPrice: estimate?.maxPrice ?? null,
      };
    });
  }
}
