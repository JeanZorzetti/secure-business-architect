import * as cron from 'node-cron';
import prisma from '../config/database';
import { logger } from '../config/logger';

/**
 * Serviço de agendamento para publicação automática de posts
 */
class SchedulerService {
  private scheduledTask: cron.ScheduledTask | null = null;

  /**
   * Iniciar o scheduler para verificar posts agendados
   * Roda a cada minuto
   */
  start(): void {
    if (this.scheduledTask) {
      logger.warn('Scheduler já está rodando');
      return;
    }

    // Executa a cada minuto
    this.scheduledTask = cron.schedule('* * * * *', async () => {
      await this.publishScheduledPosts();
    });

    logger.info('Scheduler iniciado - verificando posts agendados a cada minuto');
  }

  /**
   * Parar o scheduler
   */
  stop(): void {
    if (this.scheduledTask) {
      this.scheduledTask.stop();
      this.scheduledTask = null;
      logger.info('Scheduler parado');
    }
  }

  /**
   * Verificar e publicar posts agendados
   */
  private async publishScheduledPosts(): Promise<void> {
    try {
      const now = new Date();

      // Buscar posts em DRAFT com scheduledFor <= now
      const postsToPublish = await prisma.blogPost.findMany({
        where: {
          status: 'DRAFT',
          scheduledFor: {
            lte: now,
          },
        },
      });

      if (postsToPublish.length === 0) {
        return;
      }

      logger.info(
        { count: postsToPublish.length },
        'Publicando posts agendados'
      );

      // Publicar cada post
      for (const post of postsToPublish) {
        try {
          await prisma.blogPost.update({
            where: { id: post.id },
            data: {
              status: 'PUBLISHED',
              publishedAt: now,
              scheduledFor: null, // Limpar agendamento
            },
          });

          logger.info(
            { postId: post.id, title: post.title },
            'Post publicado automaticamente'
          );
        } catch (error) {
          logger.error(
            { error, postId: post.id },
            'Erro ao publicar post agendado'
          );
        }
      }
    } catch (error) {
      logger.error({ error }, 'Erro ao verificar posts agendados');
    }
  }

  /**
   * Verificar se há posts agendados para publicação
   */
  async getScheduledPosts(): Promise<any[]> {
    return await prisma.blogPost.findMany({
      where: {
        status: 'DRAFT',
        scheduledFor: {
          not: null,
        },
      },
      orderBy: {
        scheduledFor: 'asc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        scheduledFor: true,
        author: true,
      },
    });
  }

  /**
   * Cancelar agendamento de um post
   */
  async cancelSchedule(postId: string): Promise<void> {
    await prisma.blogPost.update({
      where: { id: postId },
      data: {
        scheduledFor: null,
      },
    });

    logger.info({ postId }, 'Agendamento cancelado');
  }
}

export const schedulerService = new SchedulerService();
