import express from 'express';
import { settingsController } from '../controllers/settingsController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { requireSuperAdmin } from '../middlewares/roleMiddleware';
import { apiLimiter } from '../middlewares/rateLimiter';

const router = express.Router();

// Apply authentication and rate limiting
router.use(authenticateToken);
router.use(apiLimiter);

// Get settings (all authenticated users can read)
router.get('/admin/settings', settingsController.getSettings.bind(settingsController));

// Update settings (only super admin)
router.put(
  '/admin/settings',
  requireSuperAdmin,
  settingsController.updateSettings.bind(settingsController)
);

export default router;
