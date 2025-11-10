import { api } from '@/lib/api';
import type {
  Campaign,
  CreateCampaignDTO,
  UpdateCampaignDTO,
  ScheduleCampaignDTO,
  CampaignFilters,
  PaginatedCampaigns,
  CampaignStats,
} from '@/types/campaign';

export const campaignsApi = {
  // ==================== CRUD ====================

  create: async (data: CreateCampaignDTO): Promise<Campaign> => {
    const response = await api.post('/newsletter/campaign', data);
    return response.data;
  },

  findAll: async (filters?: CampaignFilters): Promise<PaginatedCampaigns> => {
    const response = await api.get('/newsletter/campaigns', { params: filters });
    return response.data;
  },

  findById: async (id: string): Promise<Campaign> => {
    const response = await api.get(`/newsletter/campaigns/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateCampaignDTO): Promise<Campaign> => {
    const response = await api.put(`/newsletter/campaigns/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/newsletter/campaigns/${id}`);
  },

  // ==================== CAMPAIGN ACTIONS ====================

  send: async (id: string): Promise<Campaign> => {
    const response = await api.post(`/newsletter/campaigns/${id}/send`);
    return response.data;
  },

  schedule: async (id: string, data: ScheduleCampaignDTO): Promise<Campaign> => {
    const response = await api.post(`/newsletter/campaigns/${id}/schedule`, data);
    return response.data;
  },

  cancelScheduled: async (id: string): Promise<Campaign> => {
    const response = await api.post(`/newsletter/campaigns/${id}/cancel`);
    return response.data;
  },

  // ==================== STATS ====================

  getStats: async (): Promise<CampaignStats> => {
    const response = await api.get('/newsletter/campaigns/stats');
    return response.data;
  },
};
