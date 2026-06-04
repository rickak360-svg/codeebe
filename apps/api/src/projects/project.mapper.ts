import type { ShowcaseProject as DbProject } from '@prisma/client';
import type { ShowcaseProject } from './types/project.types';

export function toShowcaseProject(row: DbProject): ShowcaseProject {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    shortDescription: row.shortDescription,
    techStack: row.techStack,
    overview: row.overview,
    problemSolved: row.problemSolved,
    keyFeatures: row.keyFeatures,
    businessValue: row.businessValue,
    costRange: row.costRange,
    published: row.published,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** Public shape (no admin-only fields). */
export function toPublicProject(row: DbProject): Omit<
  ShowcaseProject,
  'id' | 'published' | 'sortOrder' | 'createdAt' | 'updatedAt'
> {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category,
    shortDescription: row.shortDescription,
    techStack: row.techStack,
    overview: row.overview,
    problemSolved: row.problemSolved,
    keyFeatures: row.keyFeatures,
    businessValue: row.businessValue,
    costRange: row.costRange,
  };
}
