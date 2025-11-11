import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import pinoHttp from 'pino-http';
import env from './config/env';
import { logger } from './config/logger';
import prisma from './config/database';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { schedulerService } from './services/schedulerService';
import { apiLimiter } from './middlewares/rateLimiter';
import { trackingMiddleware } from './middlewares/trackingMiddleware';
import {
  initSentry,
  sentryRequestHandler,
  sentryTracingHandler,
  sentryErrorHandler,
} from './config/sentry';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import blogRoutes from './routes/blogRoutes';
import serviceRoutes from './routes/serviceRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import leadRoutes from './routes/leadRoutes';
import userRoutes from './routes/userRoutes';
import uploadRoutes from './routes/uploadRoutes';
import settingsRoutes from './routes/settingsRoutes';
import commentRoutes from './routes/commentRoutes';
import path from 'path';

// Create Express app
const app: Application = express();

// Initialize Sentry (must be first!)
initSentry();

// Sentry request handler (must be before all other handlers)
app.use(sentryRequestHandler());
app.use(sentryTracingHandler());

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middlewares
app.use(helmet());
app.use(
  cors({
    origin: env.ALLOWED_ORIGINS.split(','),
    credentials: true,
  })
);

// HTTP logging
app.use(
  pinoHttp({
    logger,
    autoLogging: true,
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
        remoteAddress: req.remoteAddress,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Apply general rate limiting to all API routes
app.use(env.API_PREFIX, apiLimiter);

// Apply automatic tracking middleware to all routes
app.use(trackingMiddleware);

// Health check endpoint (no rate limit)
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: env.NODE_ENV,
  });
});

// API routes
app.use(`${env.API_PREFIX}/auth`, authRoutes);
app.use(`${env.API_PREFIX}/contacts`, contactRoutes);
app.use(`${env.API_PREFIX}/newsletter`, newsletterRoutes);
app.use(`${env.API_PREFIX}/blog`, blogRoutes);
app.use(`${env.API_PREFIX}/services`, serviceRoutes);
app.use(`${env.API_PREFIX}/admin/upload`, uploadRoutes);
app.use(`${env.API_PREFIX}/comments`, commentRoutes);
app.use(`${env.API_PREFIX}`, testimonialRoutes);
app.use(`${env.API_PREFIX}`, analyticsRoutes);
app.use(`${env.API_PREFIX}`, leadRoutes);
app.use(`${env.API_PREFIX}`, userRoutes);
app.use(`${env.API_PREFIX}`, settingsRoutes);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'Secure Business Architect API',
    version: '1.0.0',
    environment: env.NODE_ENV,
    docs: `${env.BACKEND_URL}/api/docs`,
  });
});

// 404 handler
app.use(notFoundHandler);

// Sentry error handler (must be before errorHandler but after routes)
app.use(sentryErrorHandler());

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = env.PORT;

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('✅ Database connected successfully');

    // Start scheduler for scheduled posts
    schedulerService.start();
    logger.info('⏰ Scheduler started for post publishing');

    // Start server
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📝 Environment: ${env.NODE_ENV}`);
      logger.info(`🔗 API URL: ${env.BACKEND_URL}`);
      logger.info(`❤️  Health check: ${env.BACKEND_URL}/health`);
    });
  } catch (error) {
    logger.error({ error }, '❌ Failed to start server');
    process.exit(1);
  }
};

// Only start server if this file is run directly
if (require.main === module) {
  startServer();
}

export default app;
