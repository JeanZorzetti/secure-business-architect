import { Request, Response } from 'express';
import { testimonialService } from '../services/testimonialService';
import { logger } from '../config/logger';
import {
  createTestimonialSchema,
  updateTestimonialSchema,
  reorderTestimonialsSchema,
} from '../validators/testimonialValidators';
import type { CreateTestimonialDTO, UpdateTestimonialDTO } from '../types/testimonial.types';

export class TestimonialController {
  /**
   * POST /api/admin/testimonials
   * Criar depoimento (admin)
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      // Validar dados
      const validatedData = createTestimonialSchema.parse(req.body);
      const createDTO: CreateTestimonialDTO = validatedData;

      // Criar depoimento
      const testimonial = await testimonialService.create(createDTO);

      logger.info(
        { testimonialId: testimonial.id, clientName: testimonial.clientName },
        'Depoimento criado'
      );

      res.status(201).json(testimonial);
    } catch (error) {
      logger.error({ error }, 'Erro ao criar depoimento');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao criar depoimento' });
    }
  }

  /**
   * GET /api/admin/testimonials
   * Listar todos os depoimentos (admin)
   */
  async findAllAdmin(_req: Request, res: Response): Promise<void> {
    try {
      const testimonials = await testimonialService.findAll();

      res.json(testimonials);
    } catch (error) {
      logger.error({ error }, 'Erro ao listar depoimentos');
      res.status(500).json({ error: 'Erro ao listar depoimentos' });
    }
  }

  /**
   * GET /api/testimonials
   * Listar depoimentos publicados (público)
   */
  async findAllPublic(_req: Request, res: Response): Promise<void> {
    try {
      const testimonials = await testimonialService.findAllPublic();

      res.json(testimonials);
    } catch (error) {
      logger.error({ error }, 'Erro ao listar depoimentos públicos');
      res.status(500).json({ error: 'Erro ao listar depoimentos' });
    }
  }

  /**
   * GET /api/admin/testimonials/:id
   * Buscar depoimento por ID (admin)
   */
  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const testimonial = await testimonialService.findById(id);

      res.json(testimonial);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar depoimento');

      if (error instanceof Error && error.message === 'Depoimento não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar depoimento' });
    }
  }

  /**
   * PUT /api/admin/testimonials/:id
   * Atualizar depoimento (admin)
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Validar dados
      const validatedData = updateTestimonialSchema.parse(req.body);
      const updateDTO: UpdateTestimonialDTO = {
        ...validatedData,
        clientRole: validatedData.clientRole === null ? undefined : validatedData.clientRole,
        avatar: validatedData.avatar === null ? undefined : validatedData.avatar,
      };

      // Atualizar depoimento
      const testimonial = await testimonialService.update(id, updateDTO);

      logger.info({ testimonialId: id }, 'Depoimento atualizado');

      res.json(testimonial);
    } catch (error) {
      logger.error({ error }, 'Erro ao atualizar depoimento');

      if (error instanceof Error) {
        if (error.name === 'ZodError') {
          res.status(400).json({ error: 'Dados inválidos', details: error });
          return;
        }

        if (error.message === 'Depoimento não encontrado') {
          res.status(404).json({ error: error.message });
          return;
        }
      }

      res.status(500).json({ error: 'Erro ao atualizar depoimento' });
    }
  }

  /**
   * DELETE /api/admin/testimonials/:id
   * Deletar depoimento (admin)
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await testimonialService.delete(id);

      logger.info({ testimonialId: id }, 'Depoimento deletado');

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao deletar depoimento');

      if (error instanceof Error && error.message === 'Depoimento não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao deletar depoimento' });
    }
  }

  /**
   * PATCH /api/admin/testimonials/:id/toggle-publish
   * Publicar/Despublicar depoimento (admin)
   */
  async togglePublish(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await testimonialService.togglePublish(id);

      logger.info(
        { testimonialId: id, isPublished: result.testimonial.isPublished },
        'Status de publicação alterado'
      );

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao alterar status de publicação');

      if (error instanceof Error && error.message === 'Depoimento não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao alterar status de publicação' });
    }
  }

  /**
   * PATCH /api/admin/testimonials/reorder
   * Reordenar depoimentos (admin)
   */
  async reorder(req: Request, res: Response): Promise<void> {
    try {
      // Validar dados
      const validatedData = reorderTestimonialsSchema.parse(req.body);

      const result = await testimonialService.reorder(validatedData.testimonials);

      logger.info('Depoimentos reordenados');

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao reordenar depoimentos');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao reordenar depoimentos' });
    }
  }
}

export const testimonialController = new TestimonialController();
