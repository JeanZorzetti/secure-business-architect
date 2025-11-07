import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import pinoHttp from 'pino-http';
import env from './config/env';
import { logger } from './config/logger';
import prisma from './config/database';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { apiLimiter } from './middlewares/rateLimiter';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import blogRoutes from './routes/blogRoutes';
import serviceRoutes from './routes/serviceRoutes';

// Create Express app
const app: Application = express();

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

// Apply general rate limiting to all API routes
app.use(env.API_PREFIX, apiLimiter);

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

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = env.PORT;

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('✅ Database connected successfully');

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
