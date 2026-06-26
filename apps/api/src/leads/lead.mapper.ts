import type { Lead as DbLead } from '@prisma/client';
import type { EstimateResult, Lead } from './types/lead.types';

export function toLead(row: DbLead): Lead {
  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    companyName: row.companyName ?? undefined,
    projectType: row.projectType,
    description: row.description,
    features: row.features,
    timeline: row.timeline,
    budgetRange: row.budgetRange ?? undefined,
    source: row.source ?? undefined,
    status: row.status,
    score: row.score,
    scoreLabel: row.scoreLabel as 'hot' | 'warm' | 'cold',
    createdAt: row.createdAt.toISOString(),
    estimate: row.estimate
      ? (row.estimate as unknown as EstimateResult)
      : undefined,
  };
}
