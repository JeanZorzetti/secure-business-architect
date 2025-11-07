import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import env from '../config/env';
import type { LoginDTO, AuthResponse, JWTPayload, RefreshTokenPayload } from '../types/auth.types';

export class AuthService {
  /**
   * Autentica um usuário e retorna tokens JWT
   */
  async login(loginDTO: LoginDTO): Promise<AuthResponse> {
    const { email, password } = loginDTO;

    // Buscar usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar se usuário está ativo
    if (!user.isActive) {
      throw new Error('Usuário inativo');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar tokens
    const token = this.generateToken(user.id, user.email, user.role);
    const refreshToken = this.generateRefreshToken(user.id);

    // Remover senha do objeto de resposta
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
      refreshToken,
    };
  }

  /**
   * Gera access token JWT
   */
  generateToken(userId: string, email: string, role: string): string {
    const payload: JWTPayload = {
      userId,
      email,
      role,
    };

    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    } as jwt.SignOptions);
  }

  /**
   * Gera refresh token JWT
   */
  generateRefreshToken(userId: string): string {
    const payload: RefreshTokenPayload = {
      userId,
    };

    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    } as jwt.SignOptions);
  }

  /**
   * Verifica e decodifica access token
   */
  verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, env.JWT_SECRET) as JWTPayload;
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }

  /**
   * Verifica e decodifica refresh token
   */
  verifyRefreshToken(token: string): RefreshTokenPayload {
    try {
      return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
    } catch (error) {
      throw new Error('Refresh token inválido ou expirado');
    }
  }

  /**
   * Renova access token usando refresh token
   */
  async refreshAccessToken(refreshToken: string): Promise<{ token: string }> {
    // Verificar refresh token
    const payload = this.verifyRefreshToken(refreshToken);

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || !user.isActive) {
      throw new Error('Usuário não encontrado ou inativo');
    }

    // Gerar novo access token
    const token = this.generateToken(user.id, user.email, user.role);

    return { token };
  }

  /**
   * Busca usuário pelo ID (para rota /me)
   */
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }
}

export const authService = new AuthService();
