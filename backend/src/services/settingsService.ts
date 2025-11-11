import prisma from '../config/database';
import { UpdateSettingsDTO } from '../types/settings.types';

class SettingsService {
  /**
   * Get site settings
   */
  async getSettings() {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: 'default' },
    });

    // Create default settings if not exists
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: 'default',
          metaKeywords: [],
        },
      });
    }

    // Don't return sensitive SMTP password
    const { smtpPassword, ...settingsWithoutPassword } = settings;

    return {
      ...settingsWithoutPassword,
      smtpPassword: smtpPassword ? '********' : undefined,
    };
  }

  /**
   * Update site settings
   */
  async updateSettings(data: UpdateSettingsDTO) {
    // Check if settings exist
    let existingSettings = await prisma.siteSettings.findUnique({
      where: { id: 'default' },
    });

    // Create if not exists
    if (!existingSettings) {
      existingSettings = await prisma.siteSettings.create({
        data: {
          id: 'default',
          metaKeywords: [],
        },
      });
    }

    // Update settings
    const updated = await prisma.siteSettings.update({
      where: { id: 'default' },
      data: {
        ...data,
        // Only update password if provided
        smtpPassword:
          data.smtpPassword && data.smtpPassword !== '********'
            ? data.smtpPassword
            : existingSettings.smtpPassword,
      },
    });

    // Don't return sensitive SMTP password
    const { smtpPassword, ...settingsWithoutPassword } = updated;

    return {
      ...settingsWithoutPassword,
      smtpPassword: smtpPassword ? '********' : undefined,
    };
  }
}

export const settingsService = new SettingsService();
