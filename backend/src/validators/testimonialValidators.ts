import { z } from 'zod';

/**
 * Schema para criar depoimento
 */
export const createTestimonialSchema = z.object({
  clientName: z.string().min(1, 'Nome do cliente é obrigatório').max(100, 'Nome muito longo'),
  clientRole: z.string().max(100, 'Cargo/empresa muito longo').optional(),
  content: z.string().min(10, 'Conteúdo muito curto').max(1000, 'Conteúdo muito longo'),
  rating: z.number().int().min(1).max(5).default(5),
  avatar: z.string().url('URL do avatar inválida').optional(),
  order: z.number().int().min(0).optional(),
});

/**
 * Schema para atualizar depoimento
 */
export const updateTestimonialSchema = z.object({
  clientName: z.string().min(1, 'Nome do cliente é obrigatório').max(100, 'Nome muito longo').optional(),
  clientRole: z.string().max(100, 'Cargo/empresa muito longo').nullable().optional(),
  content: z.string().min(10, 'Conteúdo muito curto').max(1000, 'Conteúdo muito longo').optional(),
  rating: z.number().int().min(1).max(5).optional(),
  avatar: z.string().url('URL do avatar inválida').nullable().optional(),
  order: z.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
});

/**
 * Schema para reordenar depoimentos
 */
export const reorderTestimonialsSchema = z.object({
  testimonials: z.array(
    z.object({
      id: z.string().uuid(),
      order: z.number().int().min(0),
    })
  ),
});
