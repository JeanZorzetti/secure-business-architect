import { Router } from 'express';
import { seoController } from '../controllers/seoController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Public routes - SEO files (specific routes BEFORE wildcard)
router.get('/sitemap.xml', seoController.getSitemap.bind(seoController));
router.get('/robots.txt', seoController.getRobotsTxt.bind(seoController));

// Public routes - Meta tags and Schema
router.get('/api/seo/meta/:type/:identifier', seoController.getMetaTags.bind(seoController));
router.get('/api/seo/schema/:type/:identifier', seoController.getSchemaMarkup.bind(seoController));

// IndexNow key verification (AFTER specific routes to avoid conflicts)
router.get('/:key.txt', seoController.getIndexNowKey.bind(seoController));

// Admin routes - IndexNow notifications
router.post(
  '/api/admin/seo/notify-indexnow',
  authenticateToken,
  seoController.notifyIndexNow.bind(seoController)
);

export default router;
