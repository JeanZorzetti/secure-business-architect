import { Request, Response } from 'express';
import { contactService } from '../services/contactService';
import { logger } from '../config/logger';
import { createContactSchema, updateContactSchema, contactFiltersSchema } from '../validators/contactValidators';
import type { CreateContactDTO, ContactFilters } from '../types/contact.types';

export class ContactController {
  /**
   * POST /api/contacts
   * Cria um novo contato (público)
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      // Validar dados
      const validatedData = createContactSchema.parse(req.body);
      const createContactDTO: CreateContactDTO = validatedData;

      // Criar contato
      const contact = await contactService.create(createContactDTO);

      logger.info({ contactId: contact.id }, 'Novo contato criado');

      res.status(201).json({
        message: 'Contato enviado com sucesso! Entraremos em contato em breve.',
        contact: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
        },
      });
    } catch (error) {
      logger.error({ error }, 'Erro ao criar contato');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao enviar contato' });
    }
  }

  /**
   * GET /api/contacts
   * Lista todos os contatos com filtros (admin)
   */
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      // Validar query params
      const validatedQuery = contactFiltersSchema.parse(req.query);
      const filters: ContactFilters = validatedQuery;

      const result = await contactService.findAll(filters);

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao listar contatos');

      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Parâmetros inválidos', details: error });
        return;
      }

      res.status(500).json({ error: 'Erro ao listar contatos' });
    }
  }

  /**
   * GET /api/contacts/:id
   * Busca contato por ID (admin)
   */
  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const contact = await contactService.findById(id);

      res.json(contact);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar contato');

      if (error instanceof Error && error.message === 'Contato não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar contato' });
    }
  }

  /**
   * PATCH /api/contacts/:id/status
   * Atualiza status do contato (admin)
   */
  async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Validar dados
      const validatedData = updateContactSchema.parse(req.body);

      const contact = await contactService.updateStatus(id, validatedData.status);

      logger.info({ contactId: id, newStatus: validatedData.status }, 'Status do contato atualizado');

      res.json(contact);
    } catch (error) {
      logger.error({ error }, 'Erro ao atualizar status do contato');

      if (error instanceof Error) {
        if (error.name === 'ZodError') {
          res.status(400).json({ error: 'Dados inválidos', details: error });
          return;
        }

        if (error.message === 'Contato não encontrado') {
          res.status(404).json({ error: error.message });
          return;
        }
      }

      res.status(500).json({ error: 'Erro ao atualizar status do contato' });
    }
  }

  /**
   * DELETE /api/contacts/:id
   * Deleta contato (admin)
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const result = await contactService.delete(id);

      logger.info({ contactId: id }, 'Contato deletado');

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao deletar contato');

      if (error instanceof Error && error.message === 'Contato não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao deletar contato' });
    }
  }

  /**
   * GET /api/contacts/stats
   * Retorna estatísticas de contatos (admin)
   */
  async getStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await contactService.getStats();

      res.json(stats);
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar estatísticas de contatos');
      res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
  }
}

export const contactController = new ContactController();
