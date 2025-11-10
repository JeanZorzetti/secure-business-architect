import { z } from 'zod';
import { LeadStatus, Priority, InteractionType } from '@prisma/client';

// Lead validators
export const createLeadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
  leadStatus: z.nativeEnum(LeadStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  source: z.string().optional(),
  assignedTo: z.string().uuid('ID de usuário inválido').optional(),
  tags: z.array(z.string()).optional(),
});

export const updateLeadSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  message: z.string().min(10).optional(),
  leadStatus: z.nativeEnum(LeadStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  source: z.string().nullable().optional(),
  assignedTo: z.string().uuid().nullable().optional(),
  tags: z.array(z.string()).optional(),
  lastContact: z.string().datetime().nullable().optional(),
  nextFollowUp: z.string().datetime().nullable().optional(),
});

export const leadFiltersSchema = z.object({
  leadStatus: z.union([
    z.nativeEnum(LeadStatus),
    z.array(z.nativeEnum(LeadStatus))
  ]).optional(),
  priority: z.union([
    z.nativeEnum(Priority),
    z.array(z.nativeEnum(Priority))
  ]).optional(),
  assignedTo: z.string().uuid().optional(),
  source: z.string().optional(),
  search: z.string().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
  hasNextFollowUp: z.boolean().optional(),
});

export const leadListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().min(1).max(10000).optional(), // Aumentado para suportar Kanban
  sortBy: z.enum(['createdAt', 'updatedAt', 'name', 'leadStatus', 'priority', 'nextFollowUp']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  ...leadFiltersSchema.shape,
});

// Interaction validators
export const createInteractionSchema = z.object({
  type: z.nativeEnum(InteractionType),
  notes: z.string().min(1, 'Notas não podem estar vazias'),
});

export const updateInteractionSchema = z.object({
  type: z.nativeEnum(InteractionType).optional(),
  notes: z.string().min(1).optional(),
});

// Note validators
export const createNoteSchema = z.object({
  content: z.string().min(1, 'Conteúdo não pode estar vazio'),
  isPinned: z.boolean().optional(),
});

export const updateNoteSchema = z.object({
  content: z.string().min(1).optional(),
  isPinned: z.boolean().optional(),
});

// Convert action
export const convertLeadSchema = z.object({
  convertedAt: z.string().datetime().optional(),
  notes: z.string().optional(),
});
