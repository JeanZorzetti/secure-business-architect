import { z } from 'zod';
import { CommentStatus } from '@prisma/client';

/**
 * Validadores Zod para comentários
 */

// Criar comentário (público)
export const createCommentSchema = z.object({
  postId: z.string().uuid('ID do post inválido'),
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  email: z
    .string()
    .email('Email inválido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .trim()
    .toLowerCase(),
  content: z
    .string()
    .min(3, 'Comentário deve ter pelo menos 3 caracteres')
    .max(5000, 'Comentário deve ter no máximo 5000 caracteres')
    .trim(),
});

// Atualizar comentário (admin)
export const updateCommentSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres')
      .trim()
      .optional(),
    email: z
      .string()
      .email('Email inválido')
      .max(255, 'Email deve ter no máximo 255 caracteres')
      .trim()
      .toLowerCase()
      .optional(),
    content: z
      .string()
      .min(3, 'Comentário deve ter pelo menos 3 caracteres')
      .max(5000, 'Comentário deve ter no máximo 5000 caracteres')
      .trim()
      .optional(),
    status: z.nativeEnum(CommentStatus).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser fornecido para atualização',
  });

// Moderar comentário (admin)
export const moderateCommentSchema = z.object({
  status: z.nativeEnum(CommentStatus, {
    errorMap: () => ({
      message: 'Status deve ser PENDING, APPROVED ou REJECTED',
    }),
  }),
});

// Listar comentários (query params)
export const listCommentsSchema = z.object({
  postId: z.string().uuid().optional(),
  status: z.nativeEnum(CommentStatus).optional(),
  email: z.string().email().optional(),
  search: z.string().max(255).optional(),
  startDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val))
    .optional(),
  endDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val))
    .optional(),
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Página deve ser maior que 0')
    .optional()
    .default('1'),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val <= 100, 'Limite deve estar entre 1 e 100')
    .optional()
    .default('10'),
  sortBy: z
    .enum(['createdAt', 'updatedAt', 'name'])
    .optional()
    .default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// UUID param validation
export const commentIdSchema = z.object({
  id: z.string().uuid('ID do comentário inválido'),
});

export const postIdSchema = z.object({
  postId: z.string().uuid('ID do post inválido'),
});
