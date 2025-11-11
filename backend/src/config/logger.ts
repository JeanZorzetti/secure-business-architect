import pino from 'pino';
import path from 'path';
import fs from 'fs';
import env from './env';

const isDevelopment = env.NODE_ENV === 'development';
const isProduction = env.NODE_ENV === 'production';

// Criar diretório de logs se não existir (apenas em produção)
const logsDir = path.join(process.cwd(), 'logs');
if (isProduction && !fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Configuração do Logger
 *
 * - Development: usa pino-pretty para output colorido no console
 * - Production: usa pino-roll para rotação automática de logs
 *   - Logs são salvos em ./logs/app.log
 *   - Rotação diária automática
 *   - Máximo de 10 arquivos de log mantidos
 *   - Formato: app.log.YYYY-MM-DD
 */
export const logger = pino({
  level: env.LOG_LEVEL,
  transport: isDevelopment
    ? {
        // Development: Pretty print no console
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      }
    : isProduction
      ? {
          // Production: Log rotation com pino-roll
          target: 'pino-roll',
          options: {
            file: path.join(logsDir, 'app.log'),
            frequency: 'daily', // Rotação diária
            size: '10m', // Tamanho máximo por arquivo: 10MB
            limit: {
              count: 10, // Manter últimos 10 arquivos
            },
            mkdir: true,
          },
        }
      : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
