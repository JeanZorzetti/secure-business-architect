import { Request, Response } from 'express';
import { settingsService } from '../services/settingsService';

class SettingsController {
  /**
   * Get site settings
   */
  async getSettings(_req: Request, res: Response) {
    try {
      const settings = await settingsService.getSettings();
      res.json(settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      res.status(500).json({ error: 'Erro ao buscar configurações' });
    }
  }

  /**
   * Update site settings
   */
  async updateSettings(req: Request, res: Response) {
    try {
      const settings = await settingsService.updateSettings(req.body);
      res.json(settings);
    } catch (error) {
      console.error('Error updating settings:', error);
      res.status(500).json({ error: 'Erro ao atualizar configurações' });
    }
  }
}

export const settingsController = new SettingsController();
