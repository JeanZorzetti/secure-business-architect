import { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useLeadNotifications } from '@/hooks/useLeadNotifications';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { SkipLinks } from '@/components/accessibility/SkipLinks';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export function MainLayout({ children, title }: MainLayoutProps) {
  // Ativar notificações de leads
  useLeadNotifications({
    enabled: true,
    checkInterval: 30000, // Verificar a cada 30 segundos
  });

  // Ativar keyboard shortcuts
  useKeyboardShortcuts();

  return (
    <>
      <SkipLinks />
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar Navigation */}
        <nav
          id="sidebar-navigation"
          aria-label="Navegação principal"
          role="navigation"
        >
          <Sidebar />
        </nav>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <Header title={title} />

          {/* Page Content */}
          <main
            id="main-content"
            className="flex-1 overflow-y-auto p-6"
            role="main"
            aria-label={title ? `Página: ${title}` : 'Conteúdo principal'}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
