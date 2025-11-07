import { Router } from 'express';
import { serviceController } from '../controllers/serviceController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';
import { apiLimiter } from '../middlewares/rateLimiter';

const router = Router();

/**
 * ROTAS PÚBLICAS
 */

// GET /api/services - Listar serviços ativos
router.get('/', apiLimiter, serviceController.findAllPublic.bind(serviceController));

// GET /api/services/:slug - Ver serviço por slug
router.get('/:slug', apiLimiter, serviceController.findBySlug.bind(serviceController));

/**
 * ROTAS ADMIN (protegidas)
 */

// POST /api/services/admin - Criar serviço
router.post('/admin', authenticateToken, requireAdmin, serviceController.create.bind(serviceController));

// GET /api/services/admin/all - Listar todos os serviços
router.get('/admin/all', authenticateToken, requireAdmin, serviceController.findAllAdmin.bind(serviceController));

// PATCH /api/services/admin/reorder - Reordenar serviços
router.patch('/admin/reorder', authenticateToken, requireAdmin, serviceController.reorder.bind(serviceController));

// GET /api/services/admin/:id - Ver serviço por ID
router.get('/admin/:id', authenticateToken, requireAdmin, serviceController.findById.bind(serviceController));

// PUT /api/services/admin/:id - Atualizar serviço
router.put('/admin/:id', authenticateToken, requireAdmin, serviceController.update.bind(serviceController));

// DELETE /api/services/admin/:id - Deletar serviço
router.delete('/admin/:id', authenticateToken, requireAdmin, serviceController.delete.bind(serviceController));

// PATCH /api/services/admin/:id/toggle - Toggle ativo/inativo
router.patch('/admin/:id/toggle', authenticateToken, requireAdmin, serviceController.toggleActive.bind(serviceController));

export default router;
