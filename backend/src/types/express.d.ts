declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
      // Manter compatibilidade com código antigo
      userId?: string;
      userEmail?: string;
      userRole?: string;
    }
  }
}

export {};
