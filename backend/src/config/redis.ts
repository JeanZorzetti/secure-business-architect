import { createClient } from 'redis';
import env from './env';
import { logger } from './logger';

const redisClient = createClient({
  url: env.REDIS_URL,
  password: env.REDIS_PASSWORD,
});

redisClient.on('error', (err) => {
  logger.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('ready', () => {
  logger.info('Redis client ready');
});

redisClient.on('disconnect', () => {
  logger.warn('Redis client disconnected');
});

// Connect to Redis
export const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.info('✅ Redis connected successfully');
  } catch (error) {
    logger.error({ error }, '❌ Failed to connect to Redis');
    // Don't exit process, app can run without Redis (no caching)
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await redisClient.quit();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await redisClient.quit();
  process.exit(0);
});

export default redisClient;
