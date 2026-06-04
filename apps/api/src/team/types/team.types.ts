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

export type UpsertTeamMemberInput = {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  linkedInUrl?: string;
  published?: boolean;
  sortOrder?: number;
};
