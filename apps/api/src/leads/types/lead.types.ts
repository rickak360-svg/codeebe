export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'meeting_scheduled'
  | 'proposal_sent'
  | 'converted'
  | 'lost';

export type EstimateResult = {
  minPrice: number;
  maxPrice: number;
  currency: 'INR';
  timelineLabel: string;
  suggestedPackage: string;
  summary: string;
  notes: string[];
  codeebeProvides: string[];
  marketComparisonNote: string;
};

export type Lead = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  projectType: string;
  description: string;
  features: string[];
  timeline: string;
  budgetRange?: string;
  source?: 'estimate' | 'contact';
  status: LeadStatus;
  createdAt: string;
  estimate?: EstimateResult;
};

export type CreateLeadInput = {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  projectType: string;
  description: string;
  features: string[];
  timeline: string;
  budgetRange?: string;
  source?: 'estimate' | 'contact';
};
