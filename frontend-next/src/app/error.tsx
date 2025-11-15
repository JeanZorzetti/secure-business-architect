'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error);

    // In production, you could send this to an error tracking service
    // e.g., Sentry, LogRocket, etc.
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="text-4xl font-bold mb-4">Algo deu errado</h1>

        <p className="text-lg text-muted-foreground mb-8">
          Ocorreu um erro inesperado. Nossa equipe foi notificada e está
          trabalhando para resolver o problema.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-secondary p-4 rounded-lg mb-8 text-left">
            <p className="text-sm font-mono text-destructive break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button variant="hero" size="lg" onClick={reset}>
            Tentar Novamente
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/">Voltar ao Início</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
