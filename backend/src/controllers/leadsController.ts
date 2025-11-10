import { Request, Response } from 'express';
import { leadsService } from '../services/leadsService';
import {
  createLeadSchema,
  updateLeadSchema,
  leadListQuerySchema,
  createInteractionSchema,
  updateInteractionSchema,
  createNoteSchema,
  updateNoteSchema,
  convertLeadSchema,
} from '../validators/leadValidators';
import logger from '../config/logger';

class LeadsController {
  // ==================== LEADS CRUD ====================

  async createLead(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = createLeadSchema.parse(req.body);
      const lead = await leadsService.createLead(validatedData);

      logger.info(`Lead created: ${lead.id}`);
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }
      logger.error({ error }, 'Error creating lead:', error);
      res.status(500).json({ error: 'Erro ao criar lead' });
    }
  }

  async findAllLeads(req: Request, res: Response): Promise<void> {
    try {
      const validatedQuery = leadListQuerySchema.parse(req.query);
      const result = await leadsService.findAllLeads(validatedQuery);

      res.json(result);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Parâmetros inválidos', details: error });
        return;
      }
      logger.error({ error }, 'Error fetching leads:', error);
      res.status(500).json({ error: 'Erro ao buscar leads' });
    }
  }

  async findLeadById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const lead = await leadsService.findLeadById(id);

      res.json(lead);
    } catch (error) {
      if (error instanceof Error && error.message === 'Lead não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }
      logger.error({ error }, 'Error fetching lead:', error);
      res.status(500).json({ error: 'Erro ao buscar lead' });
    }
  }

  async updateLead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const validatedData = updateLeadSchema.parse(req.body);
      const lead = await leadsService.updateLead(id, validatedData);

      logger.info(`Lead updated: ${id}`);
      res.json(lead);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }
      if (error instanceof Error && error.message.includes('Record to update not found')) {
        res.status(404).json({ error: 'Lead não encontrado' });
        return;
      }
      logger.error({ error }, 'Error updating lead:', error);
      res.status(500).json({ error: 'Erro ao atualizar lead' });
    }
  }

  async deleteLead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await leadsService.deleteLead(id);

      logger.info(`Lead deleted: ${id}`);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        res.status(404).json({ error: 'Lead não encontrado' });
        return;
      }
      logger.error({ error }, 'Error deleting lead:', error);
      res.status(500).json({ error: 'Erro ao deletar lead' });
    }
  }

  async convertLead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const validatedData = convertLeadSchema.parse(req.body);
      const userId = req.user?.id as string;

      const lead = await leadsService.convertLead(id, userId, validatedData.notes);

      logger.info(`Lead converted: ${id} by user ${userId}`);
      res.json(lead);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }
      if (error instanceof Error && error.message.includes('Record to update not found')) {
        res.status(404).json({ error: 'Lead não encontrado' });
        return;
      }
      logger.error({ error }, 'Error converting lead:', error);
      res.status(500).json({ error: 'Erro ao converter lead' });
    }
  }

  async getLeadStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = await leadsService.getLeadStats();
      res.json(stats);
    } catch (error) {
      logger.error({ error }, 'Error fetching lead stats:', error);
      res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
  }

  async exportLeads(req: Request, res: Response): Promise<void> {
    try {
      const validatedQuery = leadListQuerySchema.parse(req.query);
      const leads = await leadsService.exportLeads(validatedQuery);

      // Convert to CSV
      const headers = Object.keys(leads[0] || {});
      const csv = [
        headers.join(','),
        ...leads.map((lead) =>
          headers.map((header) => {
            const value = lead[header as keyof typeof lead];
            // Escape commas and quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(',')
        ),
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
      res.send(csv);
    } catch (error) {
      logger.error({ error }, 'Error exporting leads:', error);
      res.status(500).json({ error: 'Erro ao exportar leads' });
    }
  }

  // ==================== INTERACTIONS ====================

  async createInteraction(req: Request, res: Response): Promise<void> {
    try {
      const { id: contactId } = req.params;
      const userId = req.user?.id as string;
      const validatedData = createInteractionSchema.parse(req.body);

      const interaction = await leadsService.createInteraction({
        ...validatedData,
        contactId,
        userId,
      });

      logger.info(`Interaction created for lead: ${contactId}`);
      res.status(201).json(interaction);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }
      logger.error({ error }, 'Error creating interaction:', error);
      res.status(500).json({ error: 'Erro ao criar interação' });
    }
  }

  async getInteractionsByLead(req: Request, res: Response): Promise<void> {
    try {
      const { id: contactId } = req.params;
      const interactions = await leadsService.findInteractionsByContactId(contactId);

      res.json(interactions);
    } catch (error) {
      logger.error({ error }, 'Error fetching interactions:', error);
      res.status(500).json({ error: 'Erro ao buscar interações' });
    }
  }

  async updateInteraction(req: Request, res: Response): Promise<void> {
    try {
      const { interactionId } = req.params;
      const validatedData = updateInteractionSchema.parse(req.body);

      const interaction = await leadsService.updateInteraction(interactionId, validatedData);

      logger.info(`Interaction updated: ${interactionId}`);
      res.json(interaction);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }
      logger.error({ error }, 'Error updating interaction:', error);
      res.status(500).json({ error: 'Erro ao atualizar interação' });
    }
  }

  async deleteInteraction(req: Request, res: Response): Promise<void> {
    try {
      const { interactionId } = req.params;
      await leadsService.deleteInteraction(interactionId);

      logger.info(`Interaction deleted: ${interactionId}`);
      res.status(204).send();
    } catch (error) {
      logger.error({ error }, 'Error deleting interaction:', error);
      res.status(500).json({ error: 'Erro ao deletar interação' });
    }
  }

  // ==================== NOTES ====================

  async createNote(req: Request, res: Response): Promise<void> {
    try {
      const { id: contactId } = req.params;
      const userId = req.user?.id as string;
      const validatedData = createNoteSchema.parse(req.body);

      const note = await leadsService.createNote({
        ...validatedData,
        contactId,
        userId,
      });

      logger.info(`Note created for lead: ${contactId}`);
      res.status(201).json(note);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }
      logger.error({ error }, 'Error creating note:', error);
      res.status(500).json({ error: 'Erro ao criar nota' });
    }
  }

  async getNotesByLead(req: Request, res: Response): Promise<void> {
    try {
      const { id: contactId } = req.params;
      const notes = await leadsService.findNotesByContactId(contactId);

      res.json(notes);
    } catch (error) {
      logger.error({ error }, 'Error fetching notes:', error);
      res.status(500).json({ error: 'Erro ao buscar notas' });
    }
  }

  async updateNote(req: Request, res: Response): Promise<void> {
    try {
      const { noteId } = req.params;
      const validatedData = updateNoteSchema.parse(req.body);

      const note = await leadsService.updateNote(noteId, validatedData);

      logger.info(`Note updated: ${noteId}`);
      res.json(note);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }
      logger.error({ error }, 'Error updating note:', error);
      res.status(500).json({ error: 'Erro ao atualizar nota' });
    }
  }

  async deleteNote(req: Request, res: Response): Promise<void> {
    try {
      const { noteId } = req.params;
      await leadsService.deleteNote(noteId);

      logger.info(`Note deleted: ${noteId}`);
      res.status(204).send();
    } catch (error) {
      logger.error({ error }, 'Error deleting note:', error);
      res.status(500).json({ error: 'Erro ao deletar nota' });
    }
  }

  // ==================== TIMELINE ====================

  async getLeadTimeline(req: Request, res: Response): Promise<void> {
    try {
      const { id: contactId } = req.params;
      const timeline = await leadsService.getLeadTimeline(contactId);

      res.json(timeline);
    } catch (error) {
      logger.error({ error }, 'Error fetching timeline:', error);
      res.status(500).json({ error: 'Erro ao buscar timeline' });
    }
  }
}

export const leadsController = new LeadsController();
