import { useEffect, useRef } from 'react';

interface UseFocusTrapOptions {
  enabled?: boolean;
  initialFocus?: HTMLElement | null;
  onEscape?: () => void;
}

/**
 * Hook para implementar focus trap em modais/dialogs
 * Mantém o foco dentro do elemento enquanto aberto
 */
export function useFocusTrap<T extends HTMLElement>(
  options: UseFocusTrapOptions = {}
) {
  const { enabled = true, initialFocus, onEscape } = options;
  const containerRef = useRef<T>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;

    // Salvar elemento com foco anterior
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focar elemento inicial ou primeiro elemento focável
    const focusableElements = getFocusableElements(container);
    const firstFocusable = initialFocus || focusableElements[0];

    if (firstFocusable) {
      // Pequeno delay para garantir que o elemento está renderizado
      setTimeout(() => {
        firstFocusable.focus();
      }, 50);
    }

    // Handler para tecla Tab
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscape) {
        event.preventDefault();
        onEscape();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(container);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      // Tab normal - do último para o primeiro
      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }

      // Shift+Tab - do primeiro para o último
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup: restaurar foco anterior
    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [enabled, initialFocus, onEscape]);

  return containerRef;
}

/**
 * Obtém todos os elementos focáveis dentro de um container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  const elements = container.querySelectorAll<HTMLElement>(focusableSelectors);

  return Array.from(elements).filter((element) => {
    // Filtrar elementos ocultos
    const style = window.getComputedStyle(element);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      element.offsetParent !== null
    );
  });
}
