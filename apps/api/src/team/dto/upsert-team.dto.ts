export class UpsertTeamMemberDto {
  name!: string;
  role!: string;
  bio!: string;
  imageUrl?: string;
  linkedInUrl?: string;
  published?: boolean;
  sortOrder?: number;
}
