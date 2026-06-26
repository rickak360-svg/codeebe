import type { CreateLeadInput, EstimateResult } from './types/lead.types';

export type LeadScoreLabel = 'hot' | 'warm' | 'cold';

export type LeadScoreResult = {
  score: number;
  label: LeadScoreLabel;
};

const HIGH_VALUE_TYPES = new Set([
  'SaaS MVP',
  'Marketplace',
  'Custom Software',
  'CRM/Admin Dashboard',
]);

const MID_VALUE_TYPES = new Set(['eCommerce', 'Booking Platform', 'Automation Workflow']);

export function computeLeadScore(
  input: CreateLeadInput,
  estimate?: Pick<EstimateResult, 'minPrice' | 'maxPrice'>,
): LeadScoreResult {
  let score = 0;

  if (HIGH_VALUE_TYPES.has(input.projectType)) score += 25;
  else if (MID_VALUE_TYPES.has(input.projectType)) score += 15;
  else score += 8;

  const featureCount = input.features?.length ?? 0;
  if (featureCount >= 8) score += 20;
  else if (featureCount >= 4) score += 12;
  else if (featureCount >= 1) score += 6;

  if (input.timeline.startsWith('Urgent')) score += 15;
  if (input.companyName?.trim()) score += 10;
  if (input.budgetRange?.trim()) score += 10;
  if (input.description.trim().length > 200) score += 10;
  if (input.source === 'estimate') score += 5;

  if (estimate && estimate.maxPrice >= 150_000) score += 10;

  const capped = Math.min(100, score);
  const label: LeadScoreLabel =
    capped >= 70 ? 'hot' : capped >= 40 ? 'warm' : 'cold';

  return { score: capped, label };
}
