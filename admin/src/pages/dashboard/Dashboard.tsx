import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentContacts } from '@/components/dashboard/RecentContacts';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { TopPostsList } from '@/components/dashboard/TopPostsList';
import { PeriodFilter, type PeriodOption } from '@/components/dashboard/PeriodFilter';
import { Users, Mail, FileText, TrendingUp, AlertCircle, Send, BookOpen, Eye, BarChart3 } from 'lucide-react';
import { contactsApi } from '@/api/contacts';
import { newsletterApi } from '@/api/newsletter';
import { blogApi } from '@/api/blog';
import { analyticsApi } from '@/api/analytics';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

export function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [periodDays, setPeriodDays] = useState<PeriodOption>('30');

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

  const { data: analyticsOverview, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['analytics-overview'],
    queryFn: () => analyticsApi.getOverview(),
  });

  const { data: topPosts, isLoading: isLoadingTopPosts } = useQuery({
    queryKey: ['top-posts'],
    queryFn: () => analyticsApi.getTopPosts(5),
  });

  const days = parseInt(periodDays, 10);

  const { data: contactsTrend, isLoading: isLoadingContactsTrend } = useQuery({
    queryKey: ['contacts-trend', days],
    queryFn: () => analyticsApi.getContactsTrend(days),
  });

  const { data: blogViewsTrend, isLoading: isLoadingBlogViewsTrend } = useQuery({
    queryKey: ['blog-views-trend', days],
    queryFn: () => analyticsApi.getBlogViewsTrend(days),
  });

  // Buscar dados do período anterior para comparação
  const { data: contactsTrendPrevious } = useQuery({
    queryKey: ['contacts-trend-previous', days],
    queryFn: () => analyticsApi.getContactsTrend(days * 2),
    select: (data) => {
      // Pegar apenas a primeira metade dos dados (período anterior)
      return data.slice(0, days);
    },
  });

  const { data: blogViewsTrendPrevious } = useQuery({
    queryKey: ['blog-views-trend-previous', days],
    queryFn: () => analyticsApi.getBlogViewsTrend(days * 2),
    select: (data) => {
      // Pegar apenas a primeira metade dos dados (período anterior)
      return data.slice(0, days);
    },
  });

  // Calcular totais para comparação
  const contactsComparison = useMemo(() => {
    if (!contactsTrend || !contactsTrendPrevious) return undefined;

    const current = contactsTrend.reduce((sum, item) => sum + item.count, 0);
    const previous = contactsTrendPrevious.reduce((sum, item) => sum + item.count, 0);

    return {
      current,
      previous,
      label: `período anterior (${days} dias)`,
    };
  }, [contactsTrend, contactsTrendPrevious, days]);

  const blogViewsComparison = useMemo(() => {
    if (!blogViewsTrend || !blogViewsTrendPrevious) return undefined;

    const current = blogViewsTrend.reduce((sum, item) => sum + item.count, 0);
    const previous = blogViewsTrendPrevious.reduce((sum, item) => sum + item.count, 0);

    return {
      current,
      previous,
      label: `período anterior (${days} dias)`,
    };
  }, [blogViewsTrend, blogViewsTrendPrevious, days]);

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

        {/* Analytics Overview */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Visão Geral - Analytics
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {isLoadingAnalytics ? (
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
                  title="Total de Visualizações"
                  value={analyticsOverview?.totalViews || 0}
                  icon={Eye}
                  description="Visualizações no blog"
                />
                <StatCard
                  title="Total de Contatos"
                  value={analyticsOverview?.totalContacts || 0}
                  icon={Users}
                  description="Todos os contatos"
                />
                <StatCard
                  title="Inscritos Newsletter"
                  value={analyticsOverview?.totalNewsletterSubscribers || 0}
                  icon={Send}
                  description="Inscritos ativos"
                />
                <StatCard
                  title="Posts Publicados"
                  value={analyticsOverview?.totalBlogPosts || 0}
                  icon={BookOpen}
                  description="Total de posts"
                />
              </>
            )}
          </div>

          {/* Métricas do mês */}
          {!isLoadingAnalytics && analyticsOverview && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-3">Métricas deste mês:</p>
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Contatos</p>
                      <p className="text-2xl font-bold">{analyticsOverview.contactsThisMonth}</p>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Inscritos</p>
                      <p className="text-2xl font-bold">{analyticsOverview.subscribersThisMonth}</p>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Posts</p>
                      <p className="text-2xl font-bold">{analyticsOverview.postsThisMonth}</p>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Visualizações</p>
                      <p className="text-2xl font-bold">{analyticsOverview.viewsThisMonth}</p>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Trends and Top Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Tendências e Análises
            </h3>
            <PeriodFilter value={periodDays} onChange={setPeriodDays} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Contacts Trend Chart */}
            <div>
              {isLoadingContactsTrend ? (
                <Card className="h-[450px] animate-pulse">
                  <div className="h-full bg-muted rounded" />
                </Card>
              ) : contactsTrend && contactsTrend.length > 0 ? (
                <TrendChart
                  title="Tendência de Contatos"
                  description={`Últimos ${days} dias`}
                  data={contactsTrend}
                  color="#3b82f6"
                  dataKey="contacts"
                  comparisonData={contactsComparison}
                />
              ) : null}
            </div>

            {/* Blog Views Trend Chart */}
            <div>
              {isLoadingBlogViewsTrend ? (
                <Card className="h-[450px] animate-pulse">
                  <div className="h-full bg-muted rounded" />
                </Card>
              ) : blogViewsTrend && blogViewsTrend.length > 0 ? (
                <TrendChart
                  title="Tendência de Visualizações"
                  description={`Últimos ${days} dias`}
                  data={blogViewsTrend}
                  color="#10b981"
                  dataKey="views"
                  comparisonData={blogViewsComparison}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Top Posts List */}
        {isLoadingTopPosts ? (
          <Card className="h-[400px] animate-pulse">
            <div className="h-full bg-muted rounded" />
          </Card>
        ) : topPosts && topPosts.length > 0 ? (
          <TopPostsList posts={topPosts} />
        ) : null}

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
