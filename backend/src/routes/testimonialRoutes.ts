import express from 'express';
import { testimonialController } from '../controllers/testimonialController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { publicBlogLimiter } from '../middlewares/rateLimiter';

const router = express.Router();

// Rotas públicas (testimonials publicados)
router.get('/testimonials', publicBlogLimiter, testimonialController.findAllPublic.bind(testimonialController));

// Rotas administrativas (requerem autenticação)
router.post('/admin/testimonials', authenticateToken, testimonialController.create.bind(testimonialController));
router.get('/admin/testimonials', authenticateToken, testimonialController.findAllAdmin.bind(testimonialController));
router.get('/admin/testimonials/:id', authenticateToken, testimonialController.findById.bind(testimonialController));
router.put('/admin/testimonials/:id', authenticateToken, testimonialController.update.bind(testimonialController));
router.delete('/admin/testimonials/:id', authenticateToken, testimonialController.delete.bind(testimonialController));
router.patch('/admin/testimonials/:id/toggle-publish', authenticateToken, testimonialController.togglePublish.bind(testimonialController));
router.patch('/admin/testimonials/reorder', authenticateToken, testimonialController.reorder.bind(testimonialController));

export default router;
