import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { leadsApi } from '@/api/leads';
import { toast } from 'sonner';
import { Bell } from 'lucide-react';

interface UseLeadNotificationsOptions {
  enabled?: boolean;
  checkInterval?: number; // em milissegundos
}

export function useLeadNotifications(options: UseLeadNotificationsOptions = {}) {
  const { enabled = true, checkInterval = 30000 } = options; // Default: 30 segundos

  const previousCountRef = useRef<number | null>(null);
  const hasNotifiedRef = useRef(false);

  // Buscar estatísticas de leads
  const { data: stats } = useQuery({
    queryKey: ['leads-stats'],
    queryFn: () => leadsApi.getStats(),
    enabled,
    refetchInterval: checkInterval,
  });

  // Notificar sobre novos leads
  useEffect(() => {
    if (!stats) return;

    const currentNewLeads = stats.byStatus.NEW || 0;

    // Inicializar referência na primeira vez
    if (previousCountRef.current === null) {
      previousCountRef.current = currentNewLeads;
      return;
    }

    // Verificar se há novos leads
    if (currentNewLeads > previousCountRef.current) {
      const newCount = currentNewLeads - previousCountRef.current;

      toast.success(`${newCount} ${newCount === 1 ? 'novo lead recebido' : 'novos leads recebidos'}!`, {
        description: 'Acesse a página de leads para visualizar',
        icon: <Bell className="h-4 w-4" />,
        duration: 5000,
      });
    }

    previousCountRef.current = currentNewLeads;
  }, [stats]);

  // Notificar sobre follow-ups próximos ao vencimento
  useEffect(() => {
    if (!stats || hasNotifiedRef.current) return;

    // Verificar follow-ups atrasados
    if (stats.overdueFollowUps > 0) {
      toast.error(`${stats.overdueFollowUps} follow-up${stats.overdueFollowUps === 1 ? '' : 's'} atrasado${stats.overdueFollowUps === 1 ? '' : 's'}!`, {
        description: 'Leads aguardando contato urgente',
        duration: 6000,
      });
    }

    // Verificar follow-ups próximos (nas próximas 24h)
    if (stats.upcomingFollowUps > 0 && stats.upcomingFollowUps <= 5) {
      toast.warning(`${stats.upcomingFollowUps} follow-up${stats.upcomingFollowUps === 1 ? '' : 's'} para hoje`, {
        description: 'Leads precisam ser contatados em breve',
        duration: 5000,
      });
    }

    // Marcar como notificado para não repetir na mesma sessão
    hasNotifiedRef.current = true;
  }, [stats]);

  return {
    stats,
    newLeadsCount: stats?.byStatus.NEW || 0,
    overdueCount: stats?.overdueFollowUps || 0,
    upcomingCount: stats?.upcomingFollowUps || 0,
  };
}
