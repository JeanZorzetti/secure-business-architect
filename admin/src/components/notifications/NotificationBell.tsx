import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { leadsApi } from '@/api/leads';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Clock } from 'lucide-react';

export function NotificationBell() {
  const navigate = useNavigate();

  const { data: stats } = useQuery({
    queryKey: ['leads-stats'],
    queryFn: () => leadsApi.getStats(),
    refetchInterval: 30000,
  });

  const newLeadsCount = stats?.byStatus.NEW || 0;
  const overdueCount = stats?.overdueFollowUps || 0;
  const upcomingCount = stats?.upcomingFollowUps || 0;

  const totalNotifications = newLeadsCount + overdueCount + (upcomingCount > 0 ? 1 : 0);
  const hasNotifications = totalNotifications > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
            >
              {totalNotifications > 9 ? '9+' : totalNotifications}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {!hasNotifications ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            Nenhuma notificação no momento
          </div>
        ) : (
          <>
            {/* Novos Leads */}
            {newLeadsCount > 0 && (
              <DropdownMenuItem
                onClick={() => navigate('/leads')}
                className="cursor-pointer"
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="p-2 rounded-full bg-blue-500/10">
                    <Bell className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {newLeadsCount} {newLeadsCount === 1 ? 'Novo Lead' : 'Novos Leads'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Clique para visualizar
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            )}

            {/* Follow-ups Atrasados */}
            {overdueCount > 0 && (
              <DropdownMenuItem
                onClick={() => navigate('/leads')}
                className="cursor-pointer"
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="p-2 rounded-full bg-red-500/10">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {overdueCount} Follow-up{overdueCount === 1 ? '' : 's'} Atrasado{overdueCount === 1 ? '' : 's'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Leads aguardam contato urgente
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            )}

            {/* Follow-ups Próximos */}
            {upcomingCount > 0 && (
              <DropdownMenuItem
                onClick={() => navigate('/leads')}
                className="cursor-pointer"
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="p-2 rounded-full bg-yellow-500/10">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {upcomingCount} Follow-up{upcomingCount === 1 ? '' : 's'} Próximo{upcomingCount === 1 ? '' : 's'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Contatos agendados para breve
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate('/leads')}
              className="cursor-pointer text-center justify-center"
            >
              Ver todos os leads
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
