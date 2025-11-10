import express from 'express';
import { analyticsController } from '../controllers/analyticsController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { publicBlogLimiter } from '../middlewares/rateLimiter';

const router = express.Router();

// Rotas públicas (tracking)
router.post('/analytics/track', publicBlogLimiter, analyticsController.trackEvent.bind(analyticsController));

// Rotas administrativas (requerem autenticação)
router.get('/admin/analytics/overview', authenticateToken, analyticsController.getOverview.bind(analyticsController));
router.get('/admin/analytics/top-posts', authenticateToken, analyticsController.getTopPosts.bind(analyticsController));
router.get('/admin/analytics/contacts-trend', authenticateToken, analyticsController.getContactsTrend.bind(analyticsController));
router.get('/admin/analytics/blog-views-trend', authenticateToken, analyticsController.getBlogViewsTrend.bind(analyticsController));
router.get('/admin/analytics/conversion-funnel', authenticateToken, analyticsController.getConversionFunnel.bind(analyticsController));
router.get('/admin/analytics/events', authenticateToken, analyticsController.getEvents.bind(analyticsController));

export default router;
