import { Bell, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const [notifications] = useState(0);

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
        <button
          type="button"
          className="relative rounded-md p-2 hover:bg-accent"
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {notifications}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
