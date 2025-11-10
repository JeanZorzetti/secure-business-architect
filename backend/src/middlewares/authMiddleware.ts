import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { logger } from '../config/logger';

/**
 * Middleware para verificar JWT e autenticar usuário
 */
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Extrair token do header Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: 'Token não fornecido' });
      return;
    }

    // Verificar token
    const payload = authService.verifyToken(token);

    // Adicionar dados do usuário ao request (usando formato do express.d.ts)
    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    // Manter compatibilidade com código antigo
    req.userId = payload.userId;
    req.userEmail = payload.email;
    req.userRole = payload.role;

    next();
  } catch (error) {
    logger.error({ error }, 'Erro na autenticação do token');
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

/**
 * Middleware para verificar se usuário é admin
 */
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.userRole !== 'SUPER_ADMIN' && req.userRole !== 'ADMIN') {
    res.status(403).json({ error: 'Acesso negado. Requer privilégios de admin.' });
    return;
  }

  next();
};

/**
 * Middleware para verificar se usuário é super admin
 */
export const requireSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.userRole !== 'SUPER_ADMIN') {
    res.status(403).json({ error: 'Acesso negado. Requer privilégios de super admin.' });
    return;
  }

  next();
};
