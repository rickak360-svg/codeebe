export type HealthResponse = {
  status: string;
  service: string;
  database?: "ok" | "error";
};

export type HelloResponse = {
  message: string;
};

export type ProjectType =
  | "Landing Page"
  | "Business Website"
  | "WordPress Website"
  | "eCommerce"
  | "SaaS MVP"
  | "Marketplace"
  | "CRM/Admin Dashboard"
  | "Booking Platform"
  | "Automation Workflow"
  | "Custom Software";

export type LeadStatus =
  | "new"
  | "contacted"
  | "meeting_scheduled"
  | "proposal_sent"
  | "converted"
  | "lost";

export type CreateLeadPayload = {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  projectType: string;
  description: string;
  features: string[];
  timeline: string;
  budgetRange?: string;
  source?: "estimate" | "contact";
};

export type EstimateResult = {
  minPrice: number;
  maxPrice: number;
  currency: "INR";
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
  source?: "estimate" | "contact";
  status: LeadStatus;
  createdAt: string;
  estimate?: EstimateResult;
};

export type CreateLeadResponse = {
  lead: Lead;
  estimate: EstimateResult;
};

export type UpdateLeadStatusPayload = {
  status: LeadStatus;
};

/** Portfolio case study on the public site / admin. */
export type PublicShowcaseProject = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  techStack: string[];
  overview: string;
  problemSolved: string;
  keyFeatures: string[];
  businessValue: string;
  costRange: string;
  /** Public URLs for project UI screenshots shown in the portfolio gallery. */
  screenshots?: string[];
};

export type ShowcaseProject = PublicShowcaseProject & {
  id: string;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type UpsertShowcaseProjectPayload = PublicShowcaseProject & {
  published?: boolean;
  sortOrder?: number;
};

/** Team member on the public site / admin. */
export type PublicTeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  linkedInUrl?: string;
};

export type TeamMember = PublicTeamMember & {
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type UpsertTeamMemberPayload = {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  linkedInUrl?: string;
  published?: boolean;
  sortOrder?: number;
};

export type ServiceKind = "card" | "badge";

export type PublicServiceCard = {
  title: string;
  description: string;
};

export type PublicServicesResponse = {
  cards: PublicServiceCard[];
  badges: string[];
};

export type ServiceItem = {
  id: string;
  kind: ServiceKind;
  title: string;
  description: string;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type UpsertServiceItemPayload = {
  kind: ServiceKind;
  title: string;
  description?: string;
  published?: boolean;
  sortOrder?: number;
};

export type AdminOverview = {
  leads: {
    total: number;
    new: number;
    meetingScheduled: number;
    converted: number;
  };
  projects: {
    total: number;
    published: number;
  };
  team: {
    total: number;
    published: number;
  };
  services: {
    total: number;
    published: number;
  };
  recentLeads: Array<{
    id: string;
    fullName: string;
    email: string;
    projectType: string;
    status: LeadStatus;
    createdAt: string;
  }>;
};
