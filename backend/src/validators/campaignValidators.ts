import { z } from 'zod';
import { CampaignStatus } from '@prisma/client';

// Schema para criar campanha
export const createCampaignSchema = z.object({
  subject: z.string().min(1, 'Assunto é obrigatório').max(255, 'Assunto muito longo'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  scheduledFor: z.coerce.date().optional(),
});

// Schema para atualizar campanha
export const updateCampaignSchema = z.object({
  subject: z.string().min(1).max(255).optional(),
  content: z.string().min(1).optional(),
  scheduledFor: z.coerce.date().optional(),
});

// Schema para filtros de listagem
export const campaignFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  status: z.nativeEnum(CampaignStatus).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'scheduledFor', 'sentAt']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});
