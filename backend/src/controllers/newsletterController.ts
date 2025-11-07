import { Request, Response } from 'express';
import { newsletterService } from '../services/newsletterService';
import { logger } from '../config/logger';
import {
  subscribeNewsletterSchema,
  unsubscribeNewsletterSchema,
  newsletterFiltersSchema,
} from '../validators/newsletterValidators';
import type { SubscribeNewsletterDTO, NewsletterFilters } from '../types/newsletter.types';

export class NewsletterController {
  /**
   * POST /api/newsletter/subscribe
   * Inscrever na newsletter (público)
   */
  async subscribe(req: Request, res: Response): Promise<void> {
    try {
      // Validar dados
      const validatedData = subscribeNewsletterSchema.parse(req.body);
      const subscribeDTO: SubscribeNewsletterDTO = validatedData;

      // Inscrever
      const result = await newsletterService.subscribe(subscribeDTO);

      logger.info({ email: result.subscriber.email }, 'Nova inscrição na newsletter');

      res.status(result.alreadySubscribed ? 200 : 201).json({
        message: result.message,
        subscriber: {
          id: result.subscriber.id,
          email: result.subscriber.email,
        },
      });
    } catch (error) {
      logger.error({ error }, 'Erro ao inscrever na newsletter');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao processar inscrição' });
    }
  }

  /**
   * GET /api/newsletter/unsubscribe/:token
   * Cancelar inscrição (público)
   */
  async unsubscribe(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;

      // Validar token
      unsubscribeNewsletterSchema.parse({ token });

      // Cancelar inscrição
      const result = await newsletterService.unsubscribe(token);

      logger.info({ email: result.subscriber.email }, 'Inscrição cancelada');

      res.json({
        message: result.message,
        subscriber: {
          id: result.subscriber.id,
          email: result.subscriber.email,
        },
      });
    } catch (error) {
      logger.error({ error }, 'Erro ao cancelar inscrição');

      if (error instanceof Error) {
        if (error.name === 'ZodError') {
          res.status(400).json({ error: 'Token inválido', details: error });
          return;
        }

        if (error.message === 'Token inválido ou inscrição não encontrada') {
          res.status(404).json({ error: error.message });
          return;
        }
      }

      res.status(500).json({ error: 'Erro ao processar cancelamento' });
    }
  }

  /**
   * GET /api/newsletter
   * Listar inscritos (admin)
   */
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      // Validar query params
      const validatedQuery = newsletterFiltersSchema.parse(req.query);
      const filters: NewsletterFilters = validatedQuery;

      const result = await newsletterService.findAll(filters);

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao listar inscritos');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Parâmetros inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao listar inscritos' });
    }
  }

  /**
   * GET /api/newsletter/:id
   * Buscar inscrito por ID (admin)
   */
  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const subscriber = await newsletterService.findById(id);

      res.json(subscriber);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar inscrito');

      if (error instanceof Error && error.message === 'Inscrito não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar inscrito' });
    }
  }

  /**
   * DELETE /api/newsletter/:id
   * Deletar inscrito (admin)
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await newsletterService.delete(id);

      logger.info({ subscriberId: id }, 'Inscrito deletado');

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao deletar inscrito');

      if (error instanceof Error && error.message === 'Inscrito não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao deletar inscrito' });
    }
  }

  /**
   * GET /api/newsletter/export
   * Exportar lista de emails (admin)
   */
  async export(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.query;

      const subscribers = await newsletterService.export(
        status as 'ACTIVE' | 'UNSUBSCRIBED' | undefined
      );

      // Retornar como CSV
      const csv = [
        'email,status,subscribedAt',
        ...subscribers.map(
          (s) =>
            `${s.email},${s.status},${s.subscribedAt.toISOString()}`
        ),
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=newsletter-subscribers.csv');
      res.send(csv);
    } catch (error) {
      logger.error({ error }, 'Erro ao exportar lista');
      res.status(500).json({ error: 'Erro ao exportar lista' });
    }
  }

  /**
   * GET /api/newsletter/stats
   * Estatísticas da newsletter (admin)
   */
  async getStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await newsletterService.getStats();

      res.json(stats);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar estatísticas');
      res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
  }
}

export const newsletterController = new NewsletterController();
