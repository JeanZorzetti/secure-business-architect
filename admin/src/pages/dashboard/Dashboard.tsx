import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentContacts } from '@/components/dashboard/RecentContacts';
import { Users, Mail, FileText, TrendingUp, AlertCircle, Send, BookOpen, Eye } from 'lucide-react';
import { contactsApi } from '@/api/contacts';
import { newsletterApi } from '@/api/newsletter';
import { blogApi } from '@/api/blog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

export function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { data: contactStats, isLoading: isLoadingContacts, error: contactError } = useQuery({
    queryKey: ['contact-stats'],
    queryFn: () => contactsApi.getStats(),
  });

  const { data: newsletterStats, isLoading: isLoadingNewsletter } = useQuery({
    queryKey: ['newsletter-stats'],
    queryFn: () => newsletterApi.getStats(),
  });

  const { data: blogStats, isLoading: isLoadingBlog } = useQuery({
    queryKey: ['blog-stats'],
    queryFn: () => blogApi.getStats(),
  });

  const error = contactError;

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

        {/* Stats Grid - Contatos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contatos</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {isLoadingContacts ? (
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
        </div>

        {/* Stats Grid - Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {isLoadingNewsletter ? (
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
                  title="Total de Inscritos"
                  value={newsletterStats?.total || 0}
                  icon={Send}
                  description="Todos os inscritos"
                />
                <StatCard
                  title="Ativos"
                  value={newsletterStats?.active || 0}
                  icon={Mail}
                  description="Inscritos ativos"
                />
                <StatCard
                  title="Cancelados"
                  value={newsletterStats?.unsubscribed || 0}
                  icon={TrendingUp}
                  description="Cancelaram inscrição"
                />
                <StatCard
                  title="Novos este mês"
                  value={newsletterStats?.thisMonth || 0}
                  icon={Users}
                  description="Inscritos no mês atual"
                />
              </>
            )}
          </div>
        </div>

        {/* Stats Grid - Blog */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Blog</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {isLoadingBlog ? (
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
                  title="Total de Posts"
                  value={blogStats?.total || 0}
                  icon={BookOpen}
                  description="Todos os posts"
                />
                <StatCard
                  title="Publicados"
                  value={blogStats?.published || 0}
                  icon={Eye}
                  description="Posts publicados"
                />
                <StatCard
                  title="Rascunhos"
                  value={blogStats?.drafts || 0}
                  icon={FileText}
                  description="Posts em rascunho"
                />
                <StatCard
                  title="Novos este mês"
                  value={blogStats?.thisMonth || 0}
                  icon={TrendingUp}
                  description="Posts criados no mês"
                />
              </>
            )}
          </div>
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
              onClick={() => navigate('/blog/new')}
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
              onClick={() => navigate('/contacts')}
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
