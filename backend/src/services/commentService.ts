import prisma from '../config/database';
import { CommentStatus } from '@prisma/client';
import { logger } from '../config/logger';
import {
  CreateCommentDTO,
  UpdateCommentDTO,
  ModerateCommentDTO,
  CommentResponse,
  CommentListResponse,
  CommentStatsResponse,
  CommentListParams,
  PublicCommentListResponse,
  PublicCommentResponse,
} from '../types/comment.types';

/**
 * Service para gerenciamento de comentários
 */
class CommentService {
  /**
   * Criar novo comentário (público)
   */
  async create(data: CreateCommentDTO): Promise<CommentResponse> {
    try {
      // Verificar se o post existe e está publicado
      const post = await prisma.blogPost.findUnique({
        where: { id: data.postId },
        select: { id: true, status: true },
      });

      if (!post) {
        throw new Error('Post não encontrado');
      }

      if (post.status !== 'PUBLISHED') {
        throw new Error('Comentários só podem ser feitos em posts publicados');
      }

      const comment = await prisma.comment.create({
        data: {
          postId: data.postId,
          name: data.name,
          email: data.email,
          content: data.content,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          status: CommentStatus.PENDING,
        },
      });

      logger.info({ commentId: comment.id, postId: data.postId }, 'Comentário criado');

      return comment;
    } catch (error) {
      logger.error({ error, data }, 'Erro ao criar comentário');
      throw error;
    }
  }

  /**
   * Buscar comentário por ID (admin)
   */
  async findById(id: string): Promise<CommentResponse> {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    if (!comment) {
      throw new Error('Comentário não encontrado');
    }

    return comment as CommentResponse;
  }

  /**
   * Listar comentários com filtros (admin)
   */
  async findAll(params: CommentListParams): Promise<CommentListResponse> {
    const {
      postId,
      status,
      email,
      search,
      startDate,
      endDate,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (postId) where.postId = postId;
    if (status) where.status = status;
    if (email) where.email = email;

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          post: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
      }),
      prisma.comment.count({ where }),
    ]);

    return {
      comments: comments as CommentResponse[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Listar comentários aprovados de um post (público)
   */
  async findPublicByPost(postId: string): Promise<PublicCommentListResponse> {
    // Verificar se o post existe e está publicado
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
      select: { id: true, status: true },
    });

    if (!post || post.status !== 'PUBLISHED') {
      return { comments: [], total: 0 };
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId,
        status: CommentStatus.APPROVED,
      },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        name: true,
        content: true,
        createdAt: true,
      },
    });

    return {
      comments: comments as PublicCommentResponse[],
      total: comments.length,
    };
  }

  /**
   * Atualizar comentário (admin)
   */
  async update(id: string, data: UpdateCommentDTO): Promise<CommentResponse> {
    try {
      await this.findById(id); // Verificar se existe

      const updated = await prisma.comment.update({
        where: { id },
        data,
      });

      logger.info({ commentId: id }, 'Comentário atualizado');

      return updated;
    } catch (error) {
      logger.error({ error, commentId: id }, 'Erro ao atualizar comentário');
      throw error;
    }
  }

  /**
   * Moderar comentário - aprovar ou rejeitar (admin)
   */
  async moderate(id: string, data: ModerateCommentDTO): Promise<CommentResponse> {
    try {
      await this.findById(id); // Verificar se existe

      const updated = await prisma.comment.update({
        where: { id },
        data: {
          status: data.status,
        },
      });

      const action =
        data.status === CommentStatus.APPROVED
          ? 'aprovado'
          : data.status === CommentStatus.REJECTED
            ? 'rejeitado'
            : 'pendente';

      logger.info(
        { commentId: id, status: data.status },
        `Comentário ${action}`
      );

      return updated;
    } catch (error) {
      logger.error({ error, commentId: id }, 'Erro ao moderar comentário');
      throw error;
    }
  }

  /**
   * Aprovar comentário (admin)
   */
  async approve(id: string): Promise<CommentResponse> {
    return this.moderate(id, { status: CommentStatus.APPROVED });
  }

  /**
   * Rejeitar comentário (admin)
   */
  async reject(id: string): Promise<CommentResponse> {
    return this.moderate(id, { status: CommentStatus.REJECTED });
  }

  /**
   * Deletar comentário (admin)
   */
  async delete(id: string): Promise<void> {
    try {
      await this.findById(id); // Verificar se existe

      await prisma.comment.delete({
        where: { id },
      });

      logger.info({ commentId: id }, 'Comentário deletado');
    } catch (error) {
      logger.error({ error, commentId: id }, 'Erro ao deletar comentário');
      throw error;
    }
  }

  /**
   * Deletar múltiplos comentários (admin)
   */
  async deleteMany(ids: string[]): Promise<number> {
    try {
      const result = await prisma.comment.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      logger.info({ count: result.count, ids }, 'Comentários deletados em lote');

      return result.count;
    } catch (error) {
      logger.error({ error, ids }, 'Erro ao deletar comentários em lote');
      throw error;
    }
  }

  /**
   * Obter estatísticas de comentários (admin)
   */
  async getStats(): Promise<CommentStatsResponse> {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(now.setDate(now.getDate() - 7));

    const [total, pending, approved, rejected, todayCount, weekCount] =
      await Promise.all([
        prisma.comment.count(),
        prisma.comment.count({ where: { status: CommentStatus.PENDING } }),
        prisma.comment.count({ where: { status: CommentStatus.APPROVED } }),
        prisma.comment.count({ where: { status: CommentStatus.REJECTED } }),
        prisma.comment.count({
          where: { createdAt: { gte: startOfDay } },
        }),
        prisma.comment.count({
          where: { createdAt: { gte: startOfWeek } },
        }),
      ]);

    return {
      total,
      pending,
      approved,
      rejected,
      todayCount,
      weekCount,
    };
  }

  /**
   * Contar comentários por post (admin ou público)
   */
  async countByPost(postId: string, includeAll = false): Promise<number> {
    const where: any = { postId };

    if (!includeAll) {
      where.status = CommentStatus.APPROVED;
    }

    return prisma.comment.count({ where });
  }
}

export const commentService = new CommentService();
