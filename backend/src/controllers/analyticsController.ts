import { Request, Response } from 'express';
import { analyticsService } from '../services/analyticsService';
import { logger } from '../config/logger';
import { createAnalyticsSchema, analyticsFiltersSchema } from '../validators/analyticsValidators';
import type { CreateAnalyticsDTO, AnalyticsFilters } from '../types/analytics.types';

export class AnalyticsController {
  /**
   * GET /api/admin/analytics/overview
   * Buscar visão geral de métricas (admin)
   */
  async getOverview(_req: Request, res: Response): Promise<void> {
    try {
      const overview = await analyticsService.getOverview();

      res.json(overview);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar overview de analytics');
      res.status(500).json({ error: 'Erro ao buscar métricas gerais' });
    }
  }

  /**
   * GET /api/admin/analytics/top-posts
   * Buscar posts mais visualizados (admin)
   */
  async getTopPosts(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

      const topPosts = await analyticsService.getTopPosts(limit);

      res.json(topPosts);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar top posts');
      res.status(500).json({ error: 'Erro ao buscar posts mais visualizados' });
    }
  }

  /**
   * GET /api/admin/analytics/contacts-trend
   * Buscar tendência de contatos (admin)
   */
  async getContactsTrend(req: Request, res: Response): Promise<void> {
    try {
      const days = req.query.days ? parseInt(req.query.days as string, 10) : 30;

      const trend = await analyticsService.getContactsTrend(days);

      res.json(trend);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar tendência de contatos');
      res.status(500).json({ error: 'Erro ao buscar tendência de contatos' });
    }
  }

  /**
   * GET /api/admin/analytics/blog-views-trend
   * Buscar tendência de visualizações de blog (admin)
   */
  async getBlogViewsTrend(req: Request, res: Response): Promise<void> {
    try {
      const days = req.query.days ? parseInt(req.query.days as string, 10) : 30;

      const trend = await analyticsService.getBlogViewsTrend(days);

      res.json(trend);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar tendência de visualizações');
      res.status(500).json({ error: 'Erro ao buscar tendência de visualizações' });
    }
  }

  /**
   * POST /api/analytics/track
   * Registrar evento de analytics (público)
   */
  async trackEvent(req: Request, res: Response): Promise<void> {
    try {
      // Validar dados
      const validatedData = createAnalyticsSchema.parse(req.body);

      // Adicionar IP e User-Agent automaticamente
      const createDTO: CreateAnalyticsDTO = {
        ...validatedData,
        ipAddress: (req.ip || req.socket.remoteAddress) as string,
        userAgent: req.headers['user-agent'],
      };

      // Registrar evento (não espera, fire-and-forget)
      analyticsService.trackEvent(createDTO);

      res.status(202).json({ message: 'Evento registrado' });
    } catch (error) {
      logger.error({ error }, 'Erro ao registrar evento');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao registrar evento' });
    }
  }

  /**
   * GET /api/admin/analytics/events
   * Buscar eventos com filtros (admin)
   */
  async getEvents(req: Request, res: Response): Promise<void> {
    try {
      // Validar filtros
      const validatedFilters = analyticsFiltersSchema.parse(req.query);

      const filters: AnalyticsFilters = {};

      if (validatedFilters.startDate) {
        filters.startDate = new Date(validatedFilters.startDate);
      }

      if (validatedFilters.endDate) {
        filters.endDate = new Date(validatedFilters.endDate);
      }

      if (validatedFilters.event) {
        filters.event = validatedFilters.event;
      }

      if (validatedFilters.entityType) {
        filters.entityType = validatedFilters.entityType;
      }

      const events = await analyticsService.getEvents(filters);

      res.json(events);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar eventos');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Filtros inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
  }
}

export const analyticsController = new AnalyticsController();
