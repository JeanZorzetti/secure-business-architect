import { MainLayout } from '@/components/layout/MainLayout';
import { Users, Mail, FileText, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      name: 'Total de Leads',
      value: '0',
      icon: Users,
      change: '+0%',
      changeType: 'positive',
    },
    {
      name: 'Novos Contatos',
      value: '0',
      icon: Mail,
      change: '+0%',
      changeType: 'positive',
    },
    {
      name: 'Posts Publicados',
      value: '2',
      icon: FileText,
      change: '+2',
      changeType: 'positive',
    },
    {
      name: 'Inscritos Newsletter',
      value: '0',
      icon: TrendingUp,
      change: '+0%',
      changeType: 'positive',
    },
  ];

  return (
    <MainLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-sm text-green-600">{stat.change}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Welcome Message */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-bold">Bem-vindo ao Painel Admin!</h2>
          <p className="mt-2 text-muted-foreground">
            Este é o painel administrativo do site JB Advocacia. Aqui você pode
            gerenciar leads, contatos, newsletter, blog e todo o conteúdo do
            site.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold">Ações Rápidas</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <button className="rounded-md border bg-background p-4 text-left hover:bg-accent">
              <Users className="mb-2 h-6 w-6 text-primary" />
              <p className="font-medium">Ver Leads</p>
              <p className="text-sm text-muted-foreground">
                Gerenciar leads e CRM
              </p>
            </button>

            <button className="rounded-md border bg-background p-4 text-left hover:bg-accent">
              <FileText className="mb-2 h-6 w-6 text-primary" />
              <p className="font-medium">Novo Post</p>
              <p className="text-sm text-muted-foreground">
                Criar novo post no blog
              </p>
            </button>

            <button className="rounded-md border bg-background p-4 text-left hover:bg-accent">
              <Mail className="mb-2 h-6 w-6 text-primary" />
              <p className="font-medium">Contatos</p>
              <p className="text-sm text-muted-foreground">
                Ver mensagens de contato
              </p>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
