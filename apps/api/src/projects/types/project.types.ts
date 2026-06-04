export type ShowcaseProject = {
  id: string;
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
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type PublicShowcaseProject = Omit<
  ShowcaseProject,
  'id' | 'published' | 'sortOrder' | 'createdAt' | 'updatedAt'
>;

export type UpsertShowcaseProjectInput = {
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
  published?: boolean;
  sortOrder?: number;
};
