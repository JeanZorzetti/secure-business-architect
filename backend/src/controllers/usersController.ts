import { Request, Response } from 'express';
import { usersService } from '../services/usersService';
import {
  createUserSchema,
  updateUserSchema,
  updateProfileSchema,
  changePasswordSchema,
  userListQuerySchema,
} from '../validators/userValidators';
import logger from '../config/logger';

class UsersController {
  // ==================== USER MANAGEMENT (ADMIN) ====================

  async findAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const validatedQuery = userListQuerySchema.parse(req.query);
      const result = await usersService.findAllUsers(validatedQuery);

      res.json(result);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Parâmetros inválidos', details: error });
        return;
      }
      logger.error({ error }, 'Error fetching users');
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  async findUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await usersService.findUserById(id);

      res.json(user);
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuário não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }
      logger.error({ error }, 'Error fetching user');
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = createUserSchema.parse(req.body);
      const user = await usersService.createUser(validatedData);

      logger.info(`User created: ${user.id}`);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }
      if (error instanceof Error && error.message === 'Email já está em uso') {
        res.status(409).json({ error: error.message });
        return;
      }
      logger.error({ error }, 'Error creating user');
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const validatedData = updateUserSchema.parse(req.body);
      const user = await usersService.updateUser(id, validatedData);

      logger.info(`User updated: ${id}`);
      res.json(user);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }
      if (error instanceof Error && error.message === 'Email já está em uso') {
        res.status(409).json({ error: error.message });
        return;
      }
      if (error instanceof Error && error.message.includes('Record to update not found')) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }
      logger.error({ error }, 'Error updating user');
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await usersService.deleteUser(id);

      logger.info(`User deleted: ${id}`);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }
      logger.error({ error }, 'Error deleting user');
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }

  async toggleUserActive(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await usersService.toggleUserActive(id);

      logger.info(`User active status toggled: ${id}`);
      res.json(user);
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuário não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }
      logger.error({ error }, 'Error toggling user active status');
      res.status(500).json({ error: 'Erro ao alterar status do usuário' });
    }
  }

  // ==================== PROFILE MANAGEMENT (SELF) ====================

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as string;
      const user = await usersService.getProfile(userId);

      res.json(user);
    } catch (error) {
      if (error instanceof Error && error.message === 'Usuário não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }
      logger.error({ error }, 'Error fetching profile');
      res.status(500).json({ error: 'Erro ao buscar perfil' });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as string;
      const validatedData = updateProfileSchema.parse(req.body);
      const user = await usersService.updateProfile(userId, validatedData);

      logger.info(`Profile updated: ${userId}`);
      res.json(user);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }
      if (error instanceof Error && error.message === 'Email já está em uso') {
        res.status(409).json({ error: error.message });
        return;
      }
      logger.error({ error }, 'Error updating profile');
      res.status(500).json({ error: 'Erro ao atualizar perfil' });
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as string;
      const validatedData = changePasswordSchema.parse(req.body);
      const result = await usersService.changePassword(userId, validatedData);

      logger.info(`Password changed: ${userId}`);
      res.json(result);
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({ error: 'Dados inválidos', details: error });
        return;
      }
      if (error instanceof Error && error.message === 'Senha atual incorreta') {
        res.status(401).json({ error: error.message });
        return;
      }
      logger.error({ error }, 'Error changing password');
      res.status(500).json({ error: 'Erro ao alterar senha' });
    }
  }
}

export const usersController = new UsersController();
