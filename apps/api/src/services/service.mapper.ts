import type { ServiceItem as DbServiceItem } from '@prisma/client';
import type {
  PublicServiceCard,
  PublicServicesResponse,
  ServiceItem,
} from './types/service.types';

export function toServiceItem(row: DbServiceItem): ServiceItem {
  return {
    id: row.id,
    kind: row.kind as ServiceItem['kind'],
    title: row.title,
    description: row.description,
    published: row.published,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export function toPublicServices(
  rows: DbServiceItem[],
): PublicServicesResponse {
  const cards: PublicServiceCard[] = [];
  const badges: string[] = [];

  for (const row of rows) {
    if (row.kind === 'badge') {
      badges.push(row.title);
    } else {
      cards.push({ title: row.title, description: row.description });
    }
  }

  return { cards, badges };
}
