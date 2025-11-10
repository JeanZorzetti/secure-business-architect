import { api } from '@/lib/api';
import type {
  Lead,
  LeadFilters,
  PaginatedLeads,
  LeadStats,
  CreateLeadDTO,
  UpdateLeadDTO,
  CreateInteractionDTO,
  UpdateInteractionDTO,
  CreateNoteDTO,
  UpdateNoteDTO,
  ConvertLeadDTO,
  Interaction,
  Note,
  TimelineItem,
} from '@/types/lead';

export const leadsApi = {
  // ==================== LEADS CRUD ====================

  /**
   * Listar leads com filtros e paginação
   */
  async getAll(filters?: LeadFilters): Promise<PaginatedLeads> {
    const params = new URLSearchParams();

    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    // Handle single or array of statuses
    if (filters?.leadStatus) {
      if (Array.isArray(filters.leadStatus)) {
        filters.leadStatus.forEach(status => params.append('leadStatus', status));
      } else {
        params.append('leadStatus', filters.leadStatus);
      }
    }

    // Handle single or array of priorities
    if (filters?.priority) {
      if (Array.isArray(filters.priority)) {
        filters.priority.forEach(priority => params.append('priority', priority));
      } else {
        params.append('priority', filters.priority);
      }
    }

    if (filters?.assignedTo) params.append('assignedTo', filters.assignedTo);
    if (filters?.source) params.append('source', filters.source);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);

    if (filters?.tags && filters.tags.length > 0) {
      filters.tags.forEach(tag => params.append('tags', tag));
    }

    if (filters?.hasNextFollowUp !== undefined) {
      params.append('hasNextFollowUp', filters.hasNextFollowUp.toString());
    }

    const response = await api.get<PaginatedLeads>(`/admin/leads?${params.toString()}`);
    return response.data;
  },

  /**
   * Buscar lead por ID
   */
  async getById(id: string): Promise<Lead> {
    const response = await api.get<Lead>(`/admin/leads/${id}`);
    return response.data;
  },

  /**
   * Criar novo lead
   */
  async create(data: CreateLeadDTO): Promise<Lead> {
    const response = await api.post<Lead>('/admin/leads', data);
    return response.data;
  },

  /**
   * Atualizar lead
   */
  async update(id: string, data: UpdateLeadDTO): Promise<Lead> {
    const response = await api.patch<Lead>(`/admin/leads/${id}`, data);
    return response.data;
  },

  /**
   * Deletar lead
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/admin/leads/${id}`);
  },

  /**
   * Converter lead em cliente
   */
  async convert(id: string, data?: ConvertLeadDTO): Promise<Lead> {
    const response = await api.patch<Lead>(`/admin/leads/${id}/convert`, data || {});
    return response.data;
  },

  /**
   * Obter estatísticas de leads
   */
  async getStats(): Promise<LeadStats> {
    const response = await api.get<LeadStats>('/admin/leads/stats');
    return response.data;
  },

  /**
   * Exportar leads para CSV
   */
  async export(filters?: LeadFilters): Promise<Blob> {
    const params = new URLSearchParams();

    if (filters?.leadStatus) {
      if (Array.isArray(filters.leadStatus)) {
        filters.leadStatus.forEach(status => params.append('leadStatus', status));
      } else {
        params.append('leadStatus', filters.leadStatus);
      }
    }

    if (filters?.priority) {
      if (Array.isArray(filters.priority)) {
        filters.priority.forEach(priority => params.append('priority', priority));
      } else {
        params.append('priority', filters.priority);
      }
    }

    if (filters?.assignedTo) params.append('assignedTo', filters.assignedTo);
    if (filters?.source) params.append('source', filters.source);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);

    if (filters?.tags && filters.tags.length > 0) {
      filters.tags.forEach(tag => params.append('tags', tag));
    }

    const response = await api.get(`/admin/leads/export?${params.toString()}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // ==================== INTERACTIONS ====================

  /**
   * Listar interações de um lead
   */
  async getInteractions(leadId: string): Promise<Interaction[]> {
    const response = await api.get<Interaction[]>(`/admin/leads/${leadId}/interactions`);
    return response.data;
  },

  /**
   * Criar interação para um lead
   */
  async createInteraction(leadId: string, data: CreateInteractionDTO): Promise<Interaction> {
    const response = await api.post<Interaction>(`/admin/leads/${leadId}/interactions`, data);
    return response.data;
  },

  /**
   * Atualizar interação
   */
  async updateInteraction(interactionId: string, data: UpdateInteractionDTO): Promise<Interaction> {
    const response = await api.patch<Interaction>(`/admin/interactions/${interactionId}`, data);
    return response.data;
  },

  /**
   * Deletar interação
   */
  async deleteInteraction(interactionId: string): Promise<void> {
    await api.delete(`/admin/interactions/${interactionId}`);
  },

  // ==================== NOTES ====================

  /**
   * Listar notas de um lead
   */
  async getNotes(leadId: string): Promise<Note[]> {
    const response = await api.get<Note[]>(`/admin/leads/${leadId}/notes`);
    return response.data;
  },

  /**
   * Criar nota para um lead
   */
  async createNote(leadId: string, data: CreateNoteDTO): Promise<Note> {
    const response = await api.post<Note>(`/admin/leads/${leadId}/notes`, data);
    return response.data;
  },

  /**
   * Atualizar nota
   */
  async updateNote(noteId: string, data: UpdateNoteDTO): Promise<Note> {
    const response = await api.patch<Note>(`/admin/notes/${noteId}`, data);
    return response.data;
  },

  /**
   * Deletar nota
   */
  async deleteNote(noteId: string): Promise<void> {
    await api.delete(`/admin/notes/${noteId}`);
  },

  // ==================== TIMELINE ====================

  /**
   * Obter timeline completa de um lead (interações + notas)
   */
  async getTimeline(leadId: string): Promise<TimelineItem[]> {
    const response = await api.get<TimelineItem[]>(`/admin/leads/${leadId}/timeline`);
    return response.data;
  },
};
