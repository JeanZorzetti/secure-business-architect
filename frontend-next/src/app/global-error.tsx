'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Algo deu errado
            </h1>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
              Ocorreu um erro crítico. Por favor, tente recarregar a página.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#d4af37',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                marginRight: '1rem',
              }}
            >
              Tentar Novamente
            </button>
            <a
              href="/"
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#333',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                display: 'inline-block',
              }}
            >
              Voltar ao Início
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
