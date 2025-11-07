import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentContacts } from '@/components/dashboard/RecentContacts';
import { Users, Mail, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { contactsApi } from '@/api/contacts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

export function Dashboard() {
  const { user } = useAuthStore();

  const { data: contactStats, isLoading, error } = useQuery({
    queryKey: ['contact-stats'],
    queryFn: () => contactsApi.getStats(),
  });

  if (error) {
    return (
      <MainLayout title="Dashboard">
        <Card className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>Erro ao carregar estatísticas. Por favor, tente novamente.</p>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Message */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold">Bem-vindo, {user?.name || 'Admin'}!</h2>
          <p className="mt-2 text-muted-foreground">
            Este é o painel administrativo do site JB Advocacia. Aqui você pode
            gerenciar leads, contatos, newsletter, blog e todo o conteúdo do site.
          </p>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-6 h-32 animate-pulse">
                  <div className="h-full bg-muted rounded" />
                </Card>
              ))}
            </>
          ) : (
            <>
              <StatCard
                title="Total de Contatos"
                value={contactStats?.total || 0}
                icon={Users}
                description="Todos os contatos recebidos"
              />
              <StatCard
                title="Pendentes"
                value={contactStats?.pending || 0}
                icon={Mail}
                description="Aguardando resposta"
              />
              <StatCard
                title="Lidos"
                value={contactStats?.read || 0}
                icon={FileText}
                description="Contatos visualizados"
              />
              <StatCard
                title="Arquivados"
                value={contactStats?.archived || 0}
                icon={TrendingUp}
                description="Contatos arquivados"
              />
            </>
          )}
        </div>

        {/* Recent Contacts */}
        <RecentContacts />

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Ações Rápidas</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4 gap-2"
              onClick={() => {
                // TODO: Navigate to leads page
                console.log('Navigate to leads');
              }}
            >
              <Users className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-medium">Ver Leads</p>
                <p className="text-sm text-muted-foreground font-normal">
                  Gerenciar leads e CRM
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4 gap-2"
              onClick={() => {
                // TODO: Navigate to new post
                console.log('Navigate to new post');
              }}
            >
              <FileText className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-medium">Novo Post</p>
                <p className="text-sm text-muted-foreground font-normal">
                  Criar novo post no blog
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col items-start p-4 gap-2"
              onClick={() => {
                // TODO: Navigate to contacts
                console.log('Navigate to contacts');
              }}
            >
              <Mail className="h-6 w-6 text-primary" />
              <div className="text-left">
                <p className="font-medium">Contatos</p>
                <p className="text-sm text-muted-foreground font-normal">
                  Ver mensagens de contato
                </p>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
