import type { TeamMember as DbTeamMember } from '@prisma/client';
import type { PublicTeamMember, TeamMember } from './types/team.types';

export function toTeamMember(row: DbTeamMember): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    imageUrl: row.imageUrl ?? undefined,
    linkedInUrl: row.linkedInUrl ?? undefined,
    published: row.published,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function toPublicTeamMember(row: DbTeamMember): PublicTeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    imageUrl: row.imageUrl ?? undefined,
    linkedInUrl: row.linkedInUrl ?? undefined,
  };
}
