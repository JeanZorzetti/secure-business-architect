import { z } from 'zod';

/**
 * Schema para criar serviço
 */
export const createServiceSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título muito longo'),
  icon: z.string().min(1, 'Ícone é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  benefits: z.array(z.string().min(1)).min(1, 'Pelo menos um benefício é obrigatório'),
  order: z.number().int().min(0).optional(),
});

/**
 * Schema para atualizar serviço
 */
export const updateServiceSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título muito longo').optional(),
  icon: z.string().min(1, 'Ícone é obrigatório').optional(),
  description: z.string().min(1, 'Descrição é obrigatória').optional(),
  benefits: z.array(z.string().min(1)).min(1, 'Pelo menos um benefício é obrigatório').optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

/**
 * Schema para reordenar serviços
 */
export const reorderServicesSchema = z.object({
  services: z.array(
    z.object({
      id: z.string().uuid(),
      order: z.number().int().min(0),
    })
  ),
});
