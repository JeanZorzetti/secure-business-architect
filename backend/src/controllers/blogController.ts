import { Request, Response } from 'express';
import { blogService } from '../services/blogService';
import { logger } from '../config/logger';
import {
  createBlogPostSchema,
  updateBlogPostSchema,
  blogPostFiltersSchema,
  searchBlogPostsSchema,
} from '../validators/blogValidators';
import type { CreateBlogPostDTO, UpdateBlogPostDTO, BlogPostFilters } from '../types/blog.types';

export class BlogController {
  /**
   * POST /api/admin/blog/posts
   * Criar post (admin)
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      // Validar dados
      const validatedData = createBlogPostSchema.parse(req.body);
      const createDTO: CreateBlogPostDTO = validatedData;

      // Criar post
      const post = await blogService.create(createDTO);

      logger.info({ postId: post.id, title: post.title }, 'Post criado');

      res.status(201).json(post);
    } catch (error) {
      logger.error({ error }, 'Erro ao criar post');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao criar post' });
    }
  }

  /**
   * GET /api/admin/blog/posts
   * Listar todos os posts (incluindo drafts) (admin)
   */
  async findAllAdmin(req: Request, res: Response): Promise<void> {
    try {
      // Validar query params
      const validatedQuery = blogPostFiltersSchema.parse(req.query);
      const filters: BlogPostFilters = validatedQuery;

      const result = await blogService.findAll(filters, false);

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao listar posts');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Parâmetros inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao listar posts' });
    }
  }

  /**
   * GET /api/blog/posts
   * Listar posts publicados (público)
   */
  async findAllPublic(req: Request, res: Response): Promise<void> {
    try {
      // Validar query params
      const validatedQuery = blogPostFiltersSchema.parse(req.query);
      const filters: BlogPostFilters = validatedQuery;

      const result = await blogService.findAll(filters, true);

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao listar posts públicos');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Parâmetros inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao listar posts' });
    }
  }

  /**
   * GET /api/blog/posts/:slug
   * Buscar post por slug (público)
   */
  async findBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;

      const post = await blogService.findBySlug(slug, true);

      // Verificar se está publicado (público)
      if (post.status !== 'PUBLISHED') {
        res.status(404).json({ error: 'Post não encontrado' });
        return;
      }

      res.json(post);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar post por slug');

      if (error instanceof Error && error.message === 'Post não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar post' });
    }
  }

  /**
   * GET /api/admin/blog/posts/:id
   * Buscar post por ID (admin)
   */
  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const post = await blogService.findById(id);

      res.json(post);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar post');

      if (error instanceof Error && error.message === 'Post não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar post' });
    }
  }

  /**
   * PUT /api/admin/blog/posts/:id
   * Atualizar post (admin)
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Validar dados
      const validatedData = updateBlogPostSchema.parse(req.body);
      const updateDTO: UpdateBlogPostDTO = {
        ...validatedData,
        coverImage: validatedData.coverImage === null ? undefined : validatedData.coverImage,
      };

      // Atualizar post
      const post = await blogService.update(id, updateDTO);

      logger.info({ postId: id }, 'Post atualizado');

      res.json(post);
    } catch (error) {
      logger.error({ error }, 'Erro ao atualizar post');

      if (error instanceof Error) {
        if (error.name === 'ZodError') {
          res.status(400).json({ error: 'Dados inválidos', details: error });
          return;
        }

        if (error.message === 'Post não encontrado') {
          res.status(404).json({ error: error.message });
          return;
        }
      }

      res.status(500).json({ error: 'Erro ao atualizar post' });
    }
  }

  /**
   * PATCH /api/admin/blog/posts/:id/publish
   * Publicar post (admin)
   */
  async publish(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await blogService.publish(id);

      logger.info({ postId: id }, 'Post publicado');

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao publicar post');

      if (error instanceof Error && error.message === 'Post não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao publicar post' });
    }
  }

  /**
   * PATCH /api/admin/blog/posts/:id/unpublish
   * Despublicar post (admin)
   */
  async unpublish(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await blogService.unpublish(id);

      logger.info({ postId: id }, 'Post despublicado');

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao despublicar post');

      if (error instanceof Error && error.message === 'Post não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao despublicar post' });
    }
  }

  /**
   * DELETE /api/admin/blog/posts/:id
   * Deletar post (admin)
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await blogService.delete(id);

      logger.info({ postId: id }, 'Post deletado');

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao deletar post');

      if (error instanceof Error && error.message === 'Post não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao deletar post' });
    }
  }

  /**
   * GET /api/blog/categories
   * Listar categorias (público)
   */
  async getCategories(_req: Request, res: Response): Promise<void> {
    try {
      const categories = await blogService.getCategories();

      res.json({ categories });
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar categorias');
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  }

  /**
   * GET /api/blog/posts/search
   * Buscar posts (público)
   */
  async search(req: Request, res: Response): Promise<void> {
    try {
      // Validar query params
      const validatedQuery = searchBlogPostsSchema.parse(req.query);
      const { q, page, limit } = validatedQuery;

      const result = await blogService.search(q, page, limit);

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar posts');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Parâmetros inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar posts' });
    }
  }

  /**
   * GET /api/admin/blog/stats
   * Estatísticas do blog (admin)
   */
  async getStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await blogService.getStats();

      res.json(stats);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar estatísticas');
      res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
  }
}

export const blogController = new BlogController();
