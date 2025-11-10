import { Request, Response } from 'express';
import { campaignService } from '../services/campaignService';
import { logger } from '../config/logger';
import {
  createCampaignSchema,
  updateCampaignSchema,
  campaignFiltersSchema,
} from '../validators/campaignValidators';
import { z } from 'zod';

export class CampaignController {
  // ==================== CRUD ====================

  /**
   * POST /api/admin/newsletter/campaign
   * Criar nova campanha
   */
  async createCampaign(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = createCampaignSchema.parse(req.body);
      const userId = req.user?.id as string;

      const campaign = await campaignService.createCampaign(validatedData, userId);

      logger.info({ campaignId: campaign.id }, 'Campanha criada');
      res.status(201).json(campaign);
    } catch (error) {
      logger.error({ error }, 'Erro ao criar campanha');

      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Dados inválidos', details: error.errors });
        return;
      }

      res.status(500).json({ error: 'Erro ao criar campanha' });
    }
  }

  /**
   * GET /api/admin/newsletter/campaigns
   * Listar campanhas
   */
  async findAllCampaigns(req: Request, res: Response): Promise<void> {
    try {
      const validatedQuery = campaignFiltersSchema.parse(req.query);
      const result = await campaignService.findAllCampaigns(validatedQuery);

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao listar campanhas');

      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Parâmetros inválidos', details: error.errors });
        return;
      }

      res.status(500).json({ error: 'Erro ao listar campanhas' });
    }
  }

  /**
   * GET /api/admin/newsletter/campaigns/:id
   * Buscar campanha por ID
   */
  async findCampaignById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const campaign = await campaignService.findCampaignById(id);

      res.json(campaign);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar campanha');

      if (error instanceof Error && error.message === 'Campanha não encontrada') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar campanha' });
    }
  }

  /**
   * PUT /api/admin/newsletter/campaigns/:id
   * Atualizar campanha
   */
  async updateCampaign(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const validatedData = updateCampaignSchema.parse(req.body);

      const campaign = await campaignService.updateCampaign(id, validatedData);

      logger.info({ campaignId: id }, 'Campanha atualizada');
      res.json(campaign);
    } catch (error) {
      logger.error({ error }, 'Erro ao atualizar campanha');

      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Dados inválidos', details: error.errors });
        return;
      }

      if (error instanceof Error && error.message === 'Campanha não encontrada') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao atualizar campanha' });
    }
  }

  /**
   * DELETE /api/admin/newsletter/campaigns/:id
   * Deletar campanha
   */
  async deleteCampaign(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await campaignService.deleteCampaign(id);

      logger.info({ campaignId: id }, 'Campanha deletada');
      res.status(204).send();
    } catch (error) {
      logger.error({ error }, 'Erro ao deletar campanha');

      if (error instanceof Error && error.message === 'Campanha não encontrada') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao deletar campanha' });
    }
  }

  // ==================== CAMPAIGN ACTIONS ====================

  /**
   * POST /api/admin/newsletter/campaigns/:id/send
   * Enviar campanha
   */
  async sendCampaign(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const campaign = await campaignService.sendCampaign(id);

      logger.info({ campaignId: id }, 'Campanha enviada');
      res.json(campaign);
    } catch (error) {
      logger.error({ error }, 'Erro ao enviar campanha');

      if (error instanceof Error) {
        if (error.message === 'Campanha não encontrada') {
          res.status(404).json({ error: error.message });
          return;
        }

        if (error.message === 'Campanha já foi enviada ou está em envio') {
          res.status(400).json({ error: error.message });
          return;
        }
      }

      res.status(500).json({ error: 'Erro ao enviar campanha' });
    }
  }

  /**
   * POST /api/admin/newsletter/campaigns/:id/schedule
   * Agendar campanha
   */
  async scheduleCampaign(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { scheduledFor } = req.body;

      const scheduleSchema = z.object({
        scheduledFor: z.coerce.date(),
      });

      const validatedData = scheduleSchema.parse({ scheduledFor });
      const campaign = await campaignService.scheduleCampaign(id, validatedData.scheduledFor);

      logger.info({ campaignId: id, scheduledFor: validatedData.scheduledFor }, 'Campanha agendada');
      res.json(campaign);
    } catch (error) {
      logger.error({ error }, 'Erro ao agendar campanha');

      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Data inválida', details: error.errors });
        return;
      }

      if (error instanceof Error) {
        if (error.message === 'Campanha não encontrada') {
          res.status(404).json({ error: error.message });
          return;
        }

        if (
          error.message === 'Apenas campanhas em rascunho podem ser agendadas' ||
          error.message === 'Data de agendamento deve ser futura'
        ) {
          res.status(400).json({ error: error.message });
          return;
        }
      }

      res.status(500).json({ error: 'Erro ao agendar campanha' });
    }
  }

  /**
   * POST /api/admin/newsletter/campaigns/:id/cancel
   * Cancelar agendamento
   */
  async cancelScheduledCampaign(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const campaign = await campaignService.cancelScheduledCampaign(id);

      logger.info({ campaignId: id }, 'Agendamento cancelado');
      res.json(campaign);
    } catch (error) {
      logger.error({ error }, 'Erro ao cancelar agendamento');

      if (error instanceof Error) {
        if (error.message === 'Campanha não encontrada') {
          res.status(404).json({ error: error.message });
          return;
        }

        if (error.message === 'Apenas campanhas agendadas podem ser canceladas') {
          res.status(400).json({ error: error.message });
          return;
        }
      }

      res.status(500).json({ error: 'Erro ao cancelar agendamento' });
    }
  }

  // ==================== STATS ====================

  /**
   * GET /api/admin/newsletter/campaigns/stats
   * Estatísticas de campanhas
   */
  async getStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await campaignService.getStats();
      res.json(stats);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar estatísticas');
      res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
  }
}

export const campaignController = new CampaignController();
