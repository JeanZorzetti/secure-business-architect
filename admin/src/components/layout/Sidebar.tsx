import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Mail,
  FileText,
  Briefcase,
  MessageSquare,
  UserCog,
  Shield,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types/user';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { leadsApi } from '@/api/leads';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Leads / CRM', href: '/leads', icon: Users },
  { name: 'Contatos', href: '/contacts', icon: Mail },
  { name: 'Newsletter', href: '/newsletter', icon: Mail },
  { name: 'Campanhas', href: '/newsletter/campaigns', icon: Mail },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Serviços', href: '/services', icon: Briefcase },
  { name: 'Depoimentos', href: '/testimonials', icon: MessageSquare },
  { name: 'Meu Perfil', href: '/profile', icon: UserCog },
  { name: 'Usuários', href: '/users', icon: Shield, requireRole: UserRole.SUPER_ADMIN },
  { name: 'Configurações', href: '/settings', icon: Settings, requireRole: UserRole.SUPER_ADMIN },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  // Buscar estatísticas para mostrar badge de novos leads
  const { data: stats } = useQuery({
    queryKey: ['leads-stats'],
    queryFn: () => leadsApi.getStats(),
    refetchInterval: 30000, // Atualizar a cada 30 segundos
  });

  const newLeadsCount = stats?.byStatus.NEW || 0;
  const overdueCount = stats?.overdueFollowUps || 0;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/" className="flex items-center space-x-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">JB Advocacia</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navigation
          .filter((item) => {
            // Filter out items that require a specific role if user doesn't have it
            if (item.requireRole && user?.role !== item.requireRole) {
              return false;
            }
            return true;
          })
          .map((item) => {
            const isActive = location.pathname === item.href;
            const isLeadsPage = item.href === '/leads';
            const showBadge = isLeadsPage && (newLeadsCount > 0 || overdueCount > 0);

            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </div>
                {showBadge && (
                  <div className="flex items-center gap-1">
                    {newLeadsCount > 0 && (
                      <Badge
                        variant={isActive ? 'secondary' : 'default'}
                        className="h-5 min-w-[20px] px-1.5 text-xs"
                      >
                        {newLeadsCount}
                      </Badge>
                    )}
                    {overdueCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="h-5 min-w-[20px] px-1.5 text-xs"
                      >
                        {overdueCount}
                      </Badge>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
      </nav>

      {/* User Info + Logout */}
      <div className="border-t p-4">
        <div className="mb-3 flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <span className="text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">{user?.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}
