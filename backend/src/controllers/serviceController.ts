import { Request, Response } from 'express';
import { serviceService } from '../services/serviceService';
import { logger } from '../config/logger';
import {
  createServiceSchema,
  updateServiceSchema,
  reorderServicesSchema,
} from '../validators/serviceValidators';
import type { CreateServiceDTO, UpdateServiceDTO } from '../types/service.types';

export class ServiceController {
  /**
   * POST /api/admin/services
   * Criar serviço (admin)
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      // Validar dados
      const validatedData = createServiceSchema.parse(req.body);
      const createDTO: CreateServiceDTO = validatedData;

      // Criar serviço
      const service = await serviceService.create(createDTO);

      logger.info({ serviceId: service.id, title: service.title }, 'Serviço criado');

      res.status(201).json(service);
    } catch (error) {
      logger.error({ error }, 'Erro ao criar serviço');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao criar serviço' });
    }
  }

  /**
   * GET /api/admin/services
   * Listar todos os serviços (admin)
   */
  async findAllAdmin(_req: Request, res: Response): Promise<void> {
    try {
      const services = await serviceService.findAll();

      res.json(services);
    } catch (error) {
      logger.error({ error }, 'Erro ao listar serviços');
      res.status(500).json({ error: 'Erro ao listar serviços' });
    }
  }

  /**
   * GET /api/services
   * Listar serviços ativos (público)
   */
  async findAllPublic(_req: Request, res: Response): Promise<void> {
    try {
      const services = await serviceService.findAllPublic();

      res.json(services);
    } catch (error) {
      logger.error({ error }, 'Erro ao listar serviços públicos');
      res.status(500).json({ error: 'Erro ao listar serviços' });
    }
  }

  /**
   * GET /api/services/:slug
   * Buscar serviço por slug (público)
   */
  async findBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;

      const service = await serviceService.findBySlug(slug);

      res.json(service);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar serviço por slug');

      if (error instanceof Error && error.message === 'Serviço não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar serviço' });
    }
  }

  /**
   * GET /api/admin/services/:id
   * Buscar serviço por ID (admin)
   */
  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = await serviceService.findById(id);

      res.json(service);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar serviço');

      if (error instanceof Error && error.message === 'Serviço não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar serviço' });
    }
  }

  /**
   * PUT /api/admin/services/:id
   * Atualizar serviço (admin)
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Validar dados
      const validatedData = updateServiceSchema.parse(req.body);
      const updateDTO: UpdateServiceDTO = validatedData;

      // Atualizar serviço
      const service = await serviceService.update(id, updateDTO);

      logger.info({ serviceId: id }, 'Serviço atualizado');

      res.json(service);
    } catch (error) {
      logger.error({ error }, 'Erro ao atualizar serviço');

      if (error instanceof Error) {
        if (error.name === 'ZodError') {
          res.status(400).json({ error: 'Dados inválidos', details: error });
          return;
        }

        if (error.message === 'Serviço não encontrado') {
          res.status(404).json({ error: error.message });
          return;
        }
      }

      res.status(500).json({ error: 'Erro ao atualizar serviço' });
    }
  }

  /**
   * DELETE /api/admin/services/:id
   * Deletar serviço (admin)
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await serviceService.delete(id);

      logger.info({ serviceId: id }, 'Serviço deletado');

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao deletar serviço');

      if (error instanceof Error && error.message === 'Serviço não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao deletar serviço' });
    }
  }

  /**
   * PATCH /api/admin/services/reorder
   * Reordenar serviços (admin)
   */
  async reorder(req: Request, res: Response): Promise<void> {
    try {
      // Validar dados
      const validatedData = reorderServicesSchema.parse(req.body);

      const result = await serviceService.reorder(validatedData.services);

      logger.info('Serviços reordenados');

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao reordenar serviços');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao reordenar serviços' });
    }
  }

  /**
   * PATCH /api/admin/services/:id/toggle
   * Toggle ativo/inativo (admin)
   */
  async toggleActive(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await serviceService.toggleActive(id);

      logger.info({ serviceId: id, isActive: result.service.isActive }, 'Status do serviço alterado');

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao alterar status do serviço');

      if (error instanceof Error && error.message === 'Serviço não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao alterar status do serviço' });
    }
  }
}

export const serviceController = new ServiceController();
