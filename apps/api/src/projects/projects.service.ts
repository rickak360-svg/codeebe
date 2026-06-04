import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { toPublicProject, toShowcaseProject } from './project.mapper';
import type {
  PublicShowcaseProject,
  ShowcaseProject,
  UpsertShowcaseProjectInput,
} from './types/project.types';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublished(): Promise<PublicShowcaseProject[]> {
    const rows = await this.prisma.showcaseProject.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    return rows.map(toPublicProject);
  }

  async findPublishedBySlug(slug: string): Promise<PublicShowcaseProject> {
    const row = await this.prisma.showcaseProject.findFirst({
      where: { slug, published: true },
    });
    if (!row) {
      throw new NotFoundException(`Project "${slug}" not found`);
    }
    return toPublicProject(row);
  }

  async findAllAdmin(): Promise<ShowcaseProject[]> {
    const rows = await this.prisma.showcaseProject.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    return rows.map(toShowcaseProject);
  }

  async findOneAdmin(id: string): Promise<ShowcaseProject> {
    const row = await this.prisma.showcaseProject.findUnique({ where: { id } });
    if (!row) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return toShowcaseProject(row);
  }

  async create(input: UpsertShowcaseProjectInput): Promise<ShowcaseProject> {
    this.validate(input);
    const slug = this.normalizeSlug(input.slug);

    try {
      const row = await this.prisma.showcaseProject.create({
        data: this.toCreateData(input, slug),
      });
      return toShowcaseProject(row);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(`Slug "${slug}" is already in use`);
      }
      throw error;
    }
  }

  async update(
    id: string,
    input: Partial<UpsertShowcaseProjectInput>,
  ): Promise<ShowcaseProject> {
    if (input.slug !== undefined) {
      input.slug = this.normalizeSlug(input.slug);
    }

    try {
      const row = await this.prisma.showcaseProject.update({
        where: { id },
        data: {
          ...(input.slug !== undefined && { slug: input.slug }),
          ...(input.name !== undefined && { name: input.name.trim() }),
          ...(input.category !== undefined && {
            category: input.category.trim(),
          }),
          ...(input.shortDescription !== undefined && {
            shortDescription: input.shortDescription.trim(),
          }),
          ...(input.techStack !== undefined && { techStack: input.techStack }),
          ...(input.overview !== undefined && {
            overview: input.overview.trim(),
          }),
          ...(input.problemSolved !== undefined && {
            problemSolved: input.problemSolved.trim(),
          }),
          ...(input.keyFeatures !== undefined && {
            keyFeatures: input.keyFeatures,
          }),
          ...(input.businessValue !== undefined && {
            businessValue: input.businessValue.trim(),
          }),
          ...(input.costRange !== undefined && {
            costRange: input.costRange.trim(),
          }),
          ...(input.published !== undefined && { published: input.published }),
          ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
        },
      });
      return toShowcaseProject(row);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Project ${id} not found`);
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('Slug is already in use');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.showcaseProject.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Project ${id} not found`);
      }
      throw error;
    }
  }

  async countStats(): Promise<{ total: number; published: number }> {
    const [total, published] = await Promise.all([
      this.prisma.showcaseProject.count(),
      this.prisma.showcaseProject.count({ where: { published: true } }),
    ]);
    return { total, published };
  }

  private toCreateData(
    input: UpsertShowcaseProjectInput,
    slug: string,
  ): Prisma.ShowcaseProjectCreateInput {
    this.validate(input);
    return {
      slug,
      name: input.name.trim(),
      category: input.category.trim(),
      shortDescription: input.shortDescription.trim(),
      techStack: input.techStack ?? [],
      overview: input.overview.trim(),
      problemSolved: input.problemSolved.trim(),
      keyFeatures: input.keyFeatures ?? [],
      businessValue: input.businessValue.trim(),
      costRange: input.costRange.trim(),
      published: input.published ?? true,
      sortOrder: input.sortOrder ?? 0,
    };
  }

  private validate(input: UpsertShowcaseProjectInput): void {
    if (!input.name?.trim()) {
      throw new BadRequestException('name is required');
    }
    if (!input.slug?.trim()) {
      throw new BadRequestException('slug is required');
    }
    if (!input.category?.trim()) {
      throw new BadRequestException('category is required');
    }
    if (!input.shortDescription?.trim()) {
      throw new BadRequestException('shortDescription is required');
    }
  }

  private normalizeSlug(slug: string): string {
    return slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
