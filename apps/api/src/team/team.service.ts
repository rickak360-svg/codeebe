import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { toPublicTeamMember, toTeamMember } from './team.mapper';
import type {
  PublicTeamMember,
  TeamMember,
  UpsertTeamMemberInput,
} from './types/team.types';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublished(): Promise<PublicTeamMember[]> {
    const rows = await this.prisma.teamMember.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    return rows.map(toPublicTeamMember);
  }

  async findAllAdmin(): Promise<TeamMember[]> {
    const rows = await this.prisma.teamMember.findMany({
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    });
    return rows.map(toTeamMember);
  }

  async findOneAdmin(id: string): Promise<TeamMember> {
    const row = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!row) {
      throw new NotFoundException(`Team member ${id} not found`);
    }
    return toTeamMember(row);
  }

  async create(input: UpsertTeamMemberInput): Promise<TeamMember> {
    this.validate(input);
    const row = await this.prisma.teamMember.create({
      data: this.toCreateData(input),
    });
    return toTeamMember(row);
  }

  async update(
    id: string,
    input: Partial<UpsertTeamMemberInput>,
  ): Promise<TeamMember> {
    try {
      const row = await this.prisma.teamMember.update({
        where: { id },
        data: {
          ...(input.name !== undefined && { name: input.name.trim() }),
          ...(input.role !== undefined && { role: input.role.trim() }),
          ...(input.bio !== undefined && { bio: input.bio.trim() }),
          ...(input.imageUrl !== undefined && {
            imageUrl: input.imageUrl?.trim() || null,
          }),
          ...(input.linkedInUrl !== undefined && {
            linkedInUrl: input.linkedInUrl?.trim() || null,
          }),
          ...(input.published !== undefined && { published: input.published }),
          ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
        },
      });
      return toTeamMember(row);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Team member ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.teamMember.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Team member ${id} not found`);
      }
      throw error;
    }
  }

  async countStats(): Promise<{ total: number; published: number }> {
    const [total, published] = await Promise.all([
      this.prisma.teamMember.count(),
      this.prisma.teamMember.count({ where: { published: true } }),
    ]);
    return { total, published };
  }

  private toCreateData(
    input: UpsertTeamMemberInput,
  ): Prisma.TeamMemberCreateInput {
    return {
      name: input.name.trim(),
      role: input.role.trim(),
      bio: input.bio.trim(),
      imageUrl: input.imageUrl?.trim() || null,
      linkedInUrl: input.linkedInUrl?.trim() || null,
      published: input.published ?? true,
      sortOrder: input.sortOrder ?? 0,
    };
  }

  private validate(input: UpsertTeamMemberInput): void {
    if (!input.name?.trim()) {
      throw new BadRequestException('name is required');
    }
    if (!input.role?.trim()) {
      throw new BadRequestException('role is required');
    }
    if (!input.bio?.trim()) {
      throw new BadRequestException('bio is required');
    }
  }
}
