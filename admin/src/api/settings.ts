import { api } from '@/lib/api';
import type { SiteSettings, UpdateSettingsDTO } from '@/types/settings';

export const settingsApi = {
  /**
   * Get site settings
   */
  async getSettings(): Promise<SiteSettings> {
    const response = await api.get<SiteSettings>('/admin/settings');
    return response.data;
  },

  /**
   * Update site settings
   */
  async updateSettings(data: UpdateSettingsDTO): Promise<SiteSettings> {
    const response = await api.put<SiteSettings>('/admin/settings', data);
    return response.data;
  },
};
