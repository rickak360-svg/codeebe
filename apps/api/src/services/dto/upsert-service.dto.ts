export class UpsertServiceItemDto {
  kind!: 'card' | 'badge';
  title!: string;
  description?: string;
  published?: boolean;
  sortOrder?: number;
}
