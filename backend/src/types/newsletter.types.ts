import { Newsletter, SubscriptionStatus } from '@prisma/client';

export interface SubscribeNewsletterDTO {
  email: string;
}

export interface UnsubscribeNewsletterDTO {
  token: string;
}

export interface NewsletterFilters {
  status?: SubscriptionStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedNewsletters {
  subscribers: Newsletter[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NewsletterStats {
  total: number;
  active: number;
  unsubscribed: number;
  thisMonth: number;
}

export { Newsletter, SubscriptionStatus };
