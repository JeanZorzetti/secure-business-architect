import { z } from 'zod';

export const createAnalyticsSchema = z.object({
  event: z.string().min(1, 'Evento é obrigatório'),
  entityId: z.string().optional(),
  entityType: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
});

export const analyticsFiltersSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  event: z.string().optional(),
  entityType: z.string().optional(),
});
