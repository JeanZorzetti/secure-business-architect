export const SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  UNSUBSCRIBED: 'UNSUBSCRIBED',
} as const;

export type SubscriptionStatus = typeof SubscriptionStatus[keyof typeof SubscriptionStatus];

export interface Newsletter {
  id: string;
  email: string;
  status: SubscriptionStatus;
  subscribedAt: string;
  unsubscribedAt?: string | null;
  unsubscribeToken: string;
  confirmToken?: string | null;
  confirmedAt?: string | null;
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
