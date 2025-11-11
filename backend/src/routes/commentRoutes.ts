import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';
import { publicBlogLimiter } from '../middlewares/rateLimiter';

const router = Router();

/**
 * ROTAS PÚBLICAS
 */

// POST /api/comments - Criar comentário
router.post(
  '/',
  publicBlogLimiter,
  (req, res) => commentController.create(req, res)
);

// GET /api/comments/post/:postId - Listar comentários aprovados de um post
router.get(
  '/post/:postId',
  publicBlogLimiter,
  (req, res) => commentController.findPublicByPost(req, res)
);

/**
 * ROTAS ADMIN (protegidas)
 */

// GET /api/admin/comments/stats - Estatísticas
router.get(
  '/admin/stats',
  authenticateToken,
  requireAdmin,
  (req, res) => commentController.getStats(req, res)
);

// GET /api/admin/comments - Listar todos os comentários com filtros
router.get(
  '/admin',
  authenticateToken,
  requireAdmin,
  (req, res) => commentController.findAll(req, res)
);

// GET /api/admin/comments/:id - Buscar comentário por ID
router.get(
  '/admin/:id',
  authenticateToken,
  requireAdmin,
  (req, res) => commentController.findById(req, res)
);

// PUT /api/admin/comments/:id - Atualizar comentário
router.put(
  '/admin/:id',
  authenticateToken,
  requireAdmin,
  (req, res) => commentController.update(req, res)
);

// PATCH /api/admin/comments/:id/moderate - Moderar (aprovar/rejeitar/pending)
router.patch(
  '/admin/:id/moderate',
  authenticateToken,
  requireAdmin,
  (req, res) => commentController.moderate(req, res)
);

// PATCH /api/admin/comments/:id/approve - Aprovar comentário
router.patch(
  '/admin/:id/approve',
  authenticateToken,
  requireAdmin,
  (req, res) => commentController.approve(req, res)
);

// PATCH /api/admin/comments/:id/reject - Rejeitar comentário
router.patch(
  '/admin/:id/reject',
  authenticateToken,
  requireAdmin,
  (req, res) => commentController.reject(req, res)
);

// DELETE /api/admin/comments/:id - Deletar comentário
router.delete(
  '/admin/:id',
  authenticateToken,
  requireAdmin,
  (req, res) => commentController.delete(req, res)
);

// POST /api/admin/comments/delete-many - Deletar múltiplos comentários
router.post(
  '/admin/delete-many',
  authenticateToken,
  requireAdmin,
  (req, res) => commentController.deleteMany(req, res)
);

export default router;
