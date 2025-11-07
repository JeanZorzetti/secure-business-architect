import { z } from 'zod';
import { PostStatus } from '@prisma/client';

/**
 * Schema para criar blog post
 */
export const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo'),
  excerpt: z.string().min(1, 'Resumo é obrigatório').max(500, 'Resumo muito longo'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  coverImage: z.string().url('URL da imagem inválida').optional(),
  author: z.string().min(1, 'Autor é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  tags: z.array(z.string()).optional(),
});

/**
 * Schema para atualizar blog post
 */
export const updateBlogPostSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200, 'Título muito longo').optional(),
  excerpt: z.string().min(1, 'Resumo é obrigatório').max(500, 'Resumo muito longo').optional(),
  content: z.string().min(1, 'Conteúdo é obrigatório').optional(),
  coverImage: z.string().url('URL da imagem inválida').nullable().optional(),
  author: z.string().min(1, 'Autor é obrigatório').optional(),
  category: z.string().min(1, 'Categoria é obrigatória').optional(),
  tags: z.array(z.string()).optional(),
});

/**
 * Schema para filtros de listagem
 */
export const blogPostFiltersSchema = z.object({
  status: z.nativeEnum(PostStatus).optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

/**
 * Schema para busca
 */
export const searchBlogPostsSchema = z.object({
  q: z.string().min(1, 'Termo de busca é obrigatório'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});
