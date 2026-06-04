import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { toPublicServices, toServiceItem } from './service.mapper';
import type {
  PublicServicesResponse,
  ServiceItem,
  UpsertServiceItemInput,
} from './types/service.types';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublished(): Promise<PublicServicesResponse> {
    const rows = await this.prisma.serviceItem.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }],
    });
    return toPublicServices(rows);
  }

  async findAllAdmin(): Promise<ServiceItem[]> {
    const rows = await this.prisma.serviceItem.findMany({
      orderBy: [{ kind: 'asc' }, { sortOrder: 'asc' }, { title: 'asc' }],
    });
    return rows.map(toServiceItem);
  }

  async findOneAdmin(id: string): Promise<ServiceItem> {
    const row = await this.prisma.serviceItem.findUnique({ where: { id } });
    if (!row) {
      throw new NotFoundException(`Service item ${id} not found`);
    }
    return toServiceItem(row);
  }

  async create(input: UpsertServiceItemInput): Promise<ServiceItem> {
    this.validate(input);
    const row = await this.prisma.serviceItem.create({
      data: this.toCreateData(input),
    });
    return toServiceItem(row);
  }

  async update(
    id: string,
    input: Partial<UpsertServiceItemInput>,
  ): Promise<ServiceItem> {
    try {
      const row = await this.prisma.serviceItem.update({
        where: { id },
        data: {
          ...(input.kind !== undefined && { kind: input.kind }),
          ...(input.title !== undefined && { title: input.title.trim() }),
          ...(input.description !== undefined && {
            description: input.description.trim(),
          }),
          ...(input.published !== undefined && { published: input.published }),
          ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
        },
      });
      return toServiceItem(row);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Service item ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.serviceItem.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Service item ${id} not found`);
      }
      throw error;
    }
  }

  async countStats(): Promise<{ total: number; published: number }> {
    const [total, published] = await Promise.all([
      this.prisma.serviceItem.count(),
      this.prisma.serviceItem.count({ where: { published: true } }),
    ]);
    return { total, published };
  }

  private toCreateData(
    input: UpsertServiceItemInput,
  ): Prisma.ServiceItemCreateInput {
    return {
      kind: input.kind,
      title: input.title.trim(),
      description: input.description?.trim() ?? '',
      published: input.published ?? true,
      sortOrder: input.sortOrder ?? 0,
    };
  }

  private validate(input: UpsertServiceItemInput): void {
    if (!input.title?.trim()) {
      throw new BadRequestException('title is required');
    }
    if (input.kind === 'card' && !input.description?.trim()) {
      throw new BadRequestException('description is required for service cards');
    }
  }
}
