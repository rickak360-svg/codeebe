export type ServiceKind = 'card' | 'badge';

export type PublicServiceCard = {
  title: string;
  description: string;
};

export type PublicServicesResponse = {
  cards: PublicServiceCard[];
  badges: string[];
};

export type ServiceItem = {
  id: string;
  kind: ServiceKind;
  title: string;
  description: string;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type UpsertServiceItemInput = {
  kind: ServiceKind;
  title: string;
  description?: string;
  published?: boolean;
  sortOrder?: number;
};
