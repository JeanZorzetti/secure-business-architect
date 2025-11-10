import { Menu } from 'lucide-react';
import { NotificationBell } from '@/components/notifications/NotificationBell';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="rounded-md p-2 hover:bg-accent lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        {title && <h1 className="text-2xl font-bold">{title}</h1>}
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <NotificationBell />
      </div>
    </header>
  );
}
