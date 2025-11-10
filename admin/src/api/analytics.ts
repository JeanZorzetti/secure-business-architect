import { api } from '@/lib/api';
import type { AnalyticsOverview, TopPost, AnalyticsTrend } from '../types/analytics';

export const analyticsApi = {
  // Buscar visão geral de métricas
  getOverview: async (): Promise<AnalyticsOverview> => {
    const response = await api.get<AnalyticsOverview>('/admin/analytics/overview');
    return response.data;
  },

  // Buscar posts mais visualizados
  getTopPosts: async (limit: number = 10): Promise<TopPost[]> => {
    const response = await api.get<TopPost[]>('/admin/analytics/top-posts', {
      params: { limit },
    });
    return response.data;
  },

  // Buscar tendência de contatos
  getContactsTrend: async (days: number = 30): Promise<AnalyticsTrend[]> => {
    const response = await api.get<AnalyticsTrend[]>('/admin/analytics/contacts-trend', {
      params: { days },
    });
    return response.data;
  },

  // Buscar tendência de visualizações de blog
  getBlogViewsTrend: async (days: number = 30): Promise<AnalyticsTrend[]> => {
    const response = await api.get<AnalyticsTrend[]>('/admin/analytics/blog-views-trend', {
      params: { days },
    });
    return response.data;
  },
};
