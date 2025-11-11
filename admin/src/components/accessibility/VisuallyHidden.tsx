import { createElement } from 'react';
import type { ReactNode, ElementType } from 'react';

interface VisuallyHiddenProps {
  children: ReactNode;
  as?: ElementType;
}

/**
 * Componente para esconder conteúdo visualmente mas mantê-lo acessível para screen readers
 * Útil para labels descritivos e contexto adicional
 */
export function VisuallyHidden({
  children,
  as = 'span',
}: VisuallyHiddenProps) {
  return createElement(
    as,
    {
      className: 'sr-only',
      style: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      },
    },
    children
  );
}
