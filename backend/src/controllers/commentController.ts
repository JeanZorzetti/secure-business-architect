import { Request, Response } from 'express';
import { commentService } from '../services/commentService';
import { logger } from '../config/logger';
import {
  createCommentSchema,
  updateCommentSchema,
  moderateCommentSchema,
  listCommentsSchema,
  commentIdSchema,
  postIdSchema,
} from '../validators/commentValidators';
import { CommentListParams } from '../types/comment.types';

/**
 * Controller para comentários
 */
class CommentController {
  /**
   * POST /api/comments - Criar comentário (público)
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const validated = createCommentSchema.parse(req.body);

      // Capturar IP e User-Agent
      const ipAddress =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
        req.ip ||
        req.socket.remoteAddress;

      const userAgent = req.get('user-agent');

      const comment = await commentService.create({
        ...validated,
        ipAddress,
        userAgent,
      });

      logger.info({ commentId: comment.id }, 'Comentário criado via API');

      res.status(201).json({
        message: 'Comentário enviado! Aguardando aprovação.',
        comment,
      });
    } catch (error) {
      logger.error({ error }, 'Erro ao criar comentário');

      if (error instanceof Error) {
        if (error.message.includes('Post não encontrado')) {
          res.status(404).json({ error: error.message });
          return;
        }
        if (error.message.includes('Comentários só podem ser feitos')) {
          res.status(400).json({ error: error.message });
          return;
        }
      }

      res.status(500).json({ error: 'Erro ao criar comentário' });
    }
  }

  /**
   * GET /api/comments/post/:postId - Listar comentários aprovados (público)
   */
  async findPublicByPost(req: Request, res: Response): Promise<void> {
    try {
      const { postId } = postIdSchema.parse(req.params);

      const result = await commentService.findPublicByPost(postId);

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao listar comentários públicos');
      res.status(500).json({ error: 'Erro ao listar comentários' });
    }
  }

  /**
   * GET /api/admin/comments/:id - Buscar comentário por ID (admin)
   */
  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = commentIdSchema.parse(req.params);

      const comment = await commentService.findById(id);

      res.json(comment);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar comentário');

      if (error instanceof Error && error.message === 'Comentário não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar comentário' });
    }
  }

  /**
   * GET /api/admin/comments - Listar comentários com filtros (admin)
   */
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const validated = listCommentsSchema.parse(req.query);

      const params: CommentListParams = {
        ...validated,
        page: parseInt(validated.page as any),
        limit: parseInt(validated.limit as any),
      };

      const result = await commentService.findAll(params);

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao listar comentários');
      res.status(500).json({ error: 'Erro ao listar comentários' });
    }
  }

  /**
   * PUT /api/admin/comments/:id - Atualizar comentário (admin)
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = commentIdSchema.parse(req.params);
      const data = updateCommentSchema.parse(req.body);

      const comment = await commentService.update(id, data);

      logger.info({ commentId: id }, 'Comentário atualizado via API');

      res.json({
        message: 'Comentário atualizado com sucesso',
        comment,
      });
    } catch (error) {
      logger.error({ error }, 'Erro ao atualizar comentário');

      if (error instanceof Error && error.message === 'Comentário não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao atualizar comentário' });
    }
  }

  /**
   * PATCH /api/admin/comments/:id/moderate - Moderar comentário (admin)
   */
  async moderate(req: Request, res: Response): Promise<void> {
    try {
      const { id } = commentIdSchema.parse(req.params);
      const data = moderateCommentSchema.parse(req.body);

      const comment = await commentService.moderate(id, data);

      logger.info({ commentId: id, status: data.status }, 'Comentário moderado via API');

      res.json({
        message: 'Comentário moderado com sucesso',
        comment,
      });
    } catch (error) {
      logger.error({ error }, 'Erro ao moderar comentário');

      if (error instanceof Error && error.message === 'Comentário não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao moderar comentário' });
    }
  }

  /**
   * PATCH /api/admin/comments/:id/approve - Aprovar comentário (admin)
   */
  async approve(req: Request, res: Response): Promise<void> {
    try {
      const { id } = commentIdSchema.parse(req.params);

      const comment = await commentService.approve(id);

      logger.info({ commentId: id }, 'Comentário aprovado via API');

      res.json({
        message: 'Comentário aprovado com sucesso',
        comment,
      });
    } catch (error) {
      logger.error({ error }, 'Erro ao aprovar comentário');

      if (error instanceof Error && error.message === 'Comentário não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao aprovar comentário' });
    }
  }

  /**
   * PATCH /api/admin/comments/:id/reject - Rejeitar comentário (admin)
   */
  async reject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = commentIdSchema.parse(req.params);

      const comment = await commentService.reject(id);

      logger.info({ commentId: id }, 'Comentário rejeitado via API');

      res.json({
        message: 'Comentário rejeitado com sucesso',
        comment,
      });
    } catch (error) {
      logger.error({ error }, 'Erro ao rejeitar comentário');

      if (error instanceof Error && error.message === 'Comentário não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao rejeitar comentário' });
    }
  }

  /**
   * DELETE /api/admin/comments/:id - Deletar comentário (admin)
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = commentIdSchema.parse(req.params);

      await commentService.delete(id);

      logger.info({ commentId: id }, 'Comentário deletado via API');

      res.json({ message: 'Comentário deletado com sucesso' });
    } catch (error) {
      logger.error({ error }, 'Erro ao deletar comentário');

      if (error instanceof Error && error.message === 'Comentário não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao deletar comentário' });
    }
  }

  /**
   * POST /api/admin/comments/delete-many - Deletar múltiplos comentários (admin)
   */
  async deleteMany(req: Request, res: Response): Promise<void> {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        res.status(400).json({ error: 'IDs inválidos' });
        return;
      }

      const count = await commentService.deleteMany(ids);

      logger.info({ count, ids }, 'Comentários deletados em lote via API');

      res.json({
        message: `${count} comentário(s) deletado(s) com sucesso`,
        count,
      });
    } catch (error) {
      logger.error({ error }, 'Erro ao deletar comentários em lote');
      res.status(500).json({ error: 'Erro ao deletar comentários' });
    }
  }

  /**
   * GET /api/admin/comments/stats - Estatísticas (admin)
   */
  async getStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await commentService.getStats();

      res.json(stats);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar estatísticas de comentários');
      res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
  }
}

export const commentController = new CommentController();
