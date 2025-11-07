import { Router } from 'express';
import { blogController } from '../controllers/blogController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';
import { publicBlogLimiter } from '../middlewares/rateLimiter';

const router = Router();

/**
 * ROTAS PÚBLICAS
 */

// GET /api/blog/posts - Listar posts publicados
router.get('/posts', publicBlogLimiter, blogController.findAllPublic.bind(blogController));

// GET /api/blog/posts/search - Buscar posts
router.get('/posts/search', publicBlogLimiter, blogController.search.bind(blogController));

// GET /api/blog/categories - Listar categorias
router.get('/categories', publicBlogLimiter, blogController.getCategories.bind(blogController));

// GET /api/blog/posts/:slug - Ver post por slug
router.get('/posts/:slug', publicBlogLimiter, blogController.findBySlug.bind(blogController));

/**
 * ROTAS ADMIN (protegidas)
 */

// POST /api/admin/blog/posts - Criar post
router.post('/admin/posts', authenticateToken, requireAdmin, blogController.create.bind(blogController));

// GET /api/admin/blog/posts - Listar todos os posts
router.get('/admin/posts', authenticateToken, requireAdmin, blogController.findAllAdmin.bind(blogController));

// GET /api/admin/blog/stats - Estatísticas
router.get('/admin/stats', authenticateToken, requireAdmin, blogController.getStats.bind(blogController));

// GET /api/admin/blog/posts/:id - Ver post por ID
router.get('/admin/posts/:id', authenticateToken, requireAdmin, blogController.findById.bind(blogController));

// PUT /api/admin/blog/posts/:id - Atualizar post
router.put('/admin/posts/:id', authenticateToken, requireAdmin, blogController.update.bind(blogController));

// PATCH /api/admin/blog/posts/:id/publish - Publicar post
router.patch('/admin/posts/:id/publish', authenticateToken, requireAdmin, blogController.publish.bind(blogController));

// PATCH /api/admin/blog/posts/:id/unpublish - Despublicar post
router.patch('/admin/posts/:id/unpublish', authenticateToken, requireAdmin, blogController.unpublish.bind(blogController));

// DELETE /api/admin/blog/posts/:id - Deletar post
router.delete('/admin/posts/:id', authenticateToken, requireAdmin, blogController.delete.bind(blogController));

export default router;
