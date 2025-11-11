import { useEffect, useRef } from 'react';

type AnnouncementPriority = 'polite' | 'assertive';

/**
 * Hook para anunciar mensagens para screen readers
 * Cria uma live region ARIA para comunicar mudanças importantes
 */
export function useScreenReaderAnnounce() {
  const politeRegionRef = useRef<HTMLDivElement | null>(null);
  const assertiveRegionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Criar live regions se não existirem
    if (!politeRegionRef.current) {
      const politeDiv = document.createElement('div');
      politeDiv.setAttribute('role', 'status');
      politeDiv.setAttribute('aria-live', 'polite');
      politeDiv.setAttribute('aria-atomic', 'true');
      politeDiv.className = 'sr-only';
      politeDiv.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      `;
      document.body.appendChild(politeDiv);
      politeRegionRef.current = politeDiv;
    }

    if (!assertiveRegionRef.current) {
      const assertiveDiv = document.createElement('div');
      assertiveDiv.setAttribute('role', 'alert');
      assertiveDiv.setAttribute('aria-live', 'assertive');
      assertiveDiv.setAttribute('aria-atomic', 'true');
      assertiveDiv.className = 'sr-only';
      assertiveDiv.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      `;
      document.body.appendChild(assertiveDiv);
      assertiveRegionRef.current = assertiveDiv;
    }

    // Cleanup
    return () => {
      if (politeRegionRef.current) {
        document.body.removeChild(politeRegionRef.current);
        politeRegionRef.current = null;
      }
      if (assertiveRegionRef.current) {
        document.body.removeChild(assertiveRegionRef.current);
        assertiveRegionRef.current = null;
      }
    };
  }, []);

  /**
   * Anuncia uma mensagem para screen readers
   */
  const announce = (
    message: string,
    priority: AnnouncementPriority = 'polite',
    clearDelay = 1000
  ) => {
    const region =
      priority === 'assertive'
        ? assertiveRegionRef.current
        : politeRegionRef.current;

    if (region) {
      // Limpar primeiro para garantir que mudanças sejam detectadas
      region.textContent = '';

      // Pequeno delay para garantir que o clear seja processado
      setTimeout(() => {
        if (region) {
          region.textContent = message;

          // Limpar após delay para não poluir o DOM
          if (clearDelay > 0) {
            setTimeout(() => {
              if (region) {
                region.textContent = '';
              }
            }, clearDelay);
          }
        }
      }, 50);
    }
  };

  return { announce };
}
