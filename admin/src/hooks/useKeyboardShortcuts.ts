import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const shortcuts: ShortcutConfig[] = [
      // Navigation shortcuts
      {
        key: 'h',
        altKey: true,
        action: () => navigate('/'),
        description: 'Ir para Dashboard',
      },
      {
        key: 'l',
        altKey: true,
        action: () => navigate('/leads'),
        description: 'Ir para Leads',
      },
      {
        key: 'c',
        altKey: true,
        action: () => navigate('/contacts'),
        description: 'Ir para Contatos',
      },
      {
        key: 'b',
        altKey: true,
        action: () => navigate('/blog'),
        description: 'Ir para Blog',
      },
      {
        key: 'n',
        altKey: true,
        action: () => navigate('/newsletter'),
        description: 'Ir para Newsletter',
      },
      {
        key: 's',
        altKey: true,
        action: () => navigate('/services'),
        description: 'Ir para Serviços',
      },
      {
        key: 't',
        altKey: true,
        action: () => navigate('/testimonials'),
        description: 'Ir para Depoimentos',
      },
      {
        key: 'p',
        altKey: true,
        action: () => navigate('/profile'),
        description: 'Ir para Perfil',
      },
      // Action shortcuts
      {
        key: 'k',
        ctrlKey: true,
        action: () => {
          toast.info('Atalhos de Teclado', {
            description: `
              Alt + H: Dashboard
              Alt + L: Leads
              Alt + C: Contatos
              Alt + B: Blog
              Alt + N: Newsletter
              Alt + S: Serviços
              Alt + T: Depoimentos
              Alt + P: Perfil
              Ctrl + K: Ver atalhos
            `,
            duration: 8000,
          });
        },
        description: 'Mostrar atalhos de teclado',
      },
    ];

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input/textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      const matchedShortcut = shortcuts.find(
        (shortcut) =>
          shortcut.key === event.key.toLowerCase() &&
          !!shortcut.ctrlKey === (event.ctrlKey || event.metaKey) &&
          !!shortcut.altKey === event.altKey &&
          !!shortcut.shiftKey === event.shiftKey
      );

      if (matchedShortcut) {
        event.preventDefault();
        matchedShortcut.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);
}
