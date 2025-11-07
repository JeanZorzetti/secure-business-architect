import { z } from 'zod';
import { SubscriptionStatus } from '@prisma/client';

export const subscribeNewsletterSchema = z.object({
  email: z.string().email('Email inválido'),
});

export const unsubscribeNewsletterSchema = z.object({
  token: z.string().uuid('Token inválido'),
});

export const newsletterFiltersSchema = z.object({
  status: z.nativeEnum(SubscriptionStatus).optional(),
  search: z.string().optional(),
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
});
