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

  /**
   * POST /api/admin/blog/posts/:id/autosave
   * Auto-save de rascunho (admin)
   */
  async autoSave(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      const result = await blogService.autoSave(id, data);

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao auto-salvar rascunho');

      if (error instanceof Error && error.message === 'Post não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao auto-salvar rascunho' });
    }
  }

  /**
   * POST /api/admin/blog/posts/autosave
   * Criar ou atualizar rascunho automático (admin)
   */
  async createOrUpdateAutoDraft(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { id } = req.query;

      const result = await blogService.createOrUpdateAutoDraft(data, id as string);

      res.status(id ? 200 : 201).json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao criar/atualizar rascunho automático');
      res.status(500).json({ error: 'Erro ao processar rascunho automático' });
    }
  }

  /**
   * DELETE /api/admin/blog/posts/autosave/cleanup
   * Limpar rascunhos automáticos antigos (admin)
   */
  async cleanOldAutoDrafts(req: Request, res: Response): Promise<void> {
    try {
      const { daysOld = 30 } = req.query;

      const result = await blogService.cleanOldAutoDrafts(Number(daysOld));

      logger.info({ count: result.count }, 'Rascunhos antigos limpos');
      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao limpar rascunhos antigos');
      res.status(500).json({ error: 'Erro ao limpar rascunhos antigos' });
    }
  }

  /**
   * POST /api/admin/blog/posts/preview
   * Gerar preview de post (admin)
   */
  async generatePreview(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const { id } = req.query;

      const preview = await blogService.generatePreview(data, id as string);

      res.json(preview);
    } catch (error) {
      logger.error({ error }, 'Erro ao gerar preview');
      res.status(500).json({ error: 'Erro ao gerar preview' });
    }
  }

  /**
   * POST /api/admin/blog/posts/:id/schedule
   * Agendar publicação de post (admin)
   */
  async schedulePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { scheduledFor } = req.body;

      if (!scheduledFor) {
        res.status(400).json({ error: 'scheduledFor é obrigatório' });
        return;
      }

      const result = await blogService.schedulePost(id, new Date(scheduledFor));

      logger.info({ postId: id, scheduledFor }, 'Post agendado');
      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao agendar post');

      if (error instanceof Error) {
        if (
          error.message === 'Post não encontrado' ||
          error.message === 'Data de agendamento deve ser no futuro' ||
          error.message === 'Apenas rascunhos podem ser agendados'
        ) {
          res.status(400).json({ error: error.message });
          return;
        }
      }

      res.status(500).json({ error: 'Erro ao agendar post' });
    }
  }

  /**
   * DELETE /api/admin/blog/posts/:id/schedule
   * Cancelar agendamento de post (admin)
   */
  async cancelSchedule(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await blogService.cancelSchedule(id);

      logger.info({ postId: id }, 'Agendamento cancelado');
      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao cancelar agendamento');

      if (error instanceof Error && error.message === 'Post não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao cancelar agendamento' });
    }
  }

  /**
   * GET /api/admin/blog/posts/scheduled
   * Listar posts agendados (admin)
   */
  async getScheduledPosts(_req: Request, res: Response): Promise<void> {
    try {
      const posts = await blogService.getScheduledPosts();

      res.json({ posts, total: posts.length });
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar posts agendados');
      res.status(500).json({ error: 'Erro ao buscar posts agendados' });
    }
  }
}

export const blogController = new BlogController();
