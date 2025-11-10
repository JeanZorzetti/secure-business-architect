import express from 'express';
import { usersController } from '../controllers/usersController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { requireSuperAdmin } from '../middlewares/roleMiddleware';
import { apiLimiter } from '../middlewares/rateLimiter';

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);
router.use(apiLimiter);

// ==================== PROFILE ROUTES (SELF) ====================

// Get own profile
router.get('/admin/profile', usersController.getProfile.bind(usersController));

// Update own profile
router.put('/admin/profile', usersController.updateProfile.bind(usersController));

// Change own password
router.put('/admin/profile/password', usersController.changePassword.bind(usersController));

// ==================== USER MANAGEMENT ROUTES (SUPER ADMIN ONLY) ====================

// List all users
router.get('/admin/users', requireSuperAdmin, usersController.findAllUsers.bind(usersController));

// Get user by ID
router.get('/admin/users/:id', requireSuperAdmin, usersController.findUserById.bind(usersController));

// Create new user
router.post('/admin/users', requireSuperAdmin, usersController.createUser.bind(usersController));

// Update user
router.put('/admin/users/:id', requireSuperAdmin, usersController.updateUser.bind(usersController));

// Delete user
router.delete('/admin/users/:id', requireSuperAdmin, usersController.deleteUser.bind(usersController));

// Toggle user active status
router.patch('/admin/users/:id/toggle-active', requireSuperAdmin, usersController.toggleUserActive.bind(usersController));

export default router;
