import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { logger } from '../config/logger';
import type { LoginDTO } from '../types/auth.types';

export class AuthController {
  /**
   * POST /api/auth/login
   * Autentica usuário e retorna tokens
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginDTO: LoginDTO = req.body;

      // Validar campos obrigatórios
      if (!loginDTO.email || !loginDTO.password) {
        res.status(400).json({ error: 'Email e senha são obrigatórios' });
        return;
      }

      // Autenticar
      const authResponse = await authService.login(loginDTO);

      logger.info({ userId: authResponse.user.id }, 'Login realizado com sucesso');

      res.json(authResponse);
    } catch (error) {
      logger.error({ error }, 'Erro no login');

      if (error instanceof Error) {
        if (error.message === 'Credenciais inválidas' || error.message === 'Usuário inativo') {
          res.status(401).json({ error: error.message });
          return;
        }
      }

      res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }

  /**
   * POST /api/auth/logout
   * Realiza logout (no backend stateless, apenas confirma)
   */
  async logout(req: Request, res: Response): Promise<void> {
    try {
      logger.info({ userId: req.userId }, 'Logout realizado');
      res.json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
      logger.error({ error }, 'Erro no logout');
      res.status(500).json({ error: 'Erro ao realizar logout' });
    }
  }

  /**
   * POST /api/auth/refresh
   * Renova access token usando refresh token
   */
  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({ error: 'Refresh token não fornecido' });
        return;
      }

      const result = await authService.refreshAccessToken(refreshToken);

      logger.info('Access token renovado com sucesso');

      res.json(result);
    } catch (error) {
      logger.error({ error }, 'Erro ao renovar token');

      if (error instanceof Error && error.message.includes('inválido')) {
        res.status(401).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao renovar token' });
    }
  }

  /**
   * GET /api/auth/me
   * Retorna dados do usuário autenticado
   */
  async getMe(req: Request, res: Response): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const user = await authService.getUserById(req.userId);

      res.json({ user });
    } catch (error) {
      logger.error({ error }, 'Erro ao buscar dados do usuário');

      if (error instanceof Error && error.message === 'Usuário não encontrado') {
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
    }
  }
}

export const authController = new AuthController();
