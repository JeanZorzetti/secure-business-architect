import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { leadsApi } from '@/api/leads';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Eye,
  Mail,
  Phone,
  Building2,
  AlertCircle,
  Download,
  Plus,
  Calendar,
  Users,
  TrendingUp,
  LayoutGrid,
  List,
} from 'lucide-react';
import { LeadStatus, Priority } from '@/types/lead';
import { formatRelativeTime } from '@/lib/utils';
import type { Lead, LeadFilters } from '@/types/lead';
import { LeadsKanban } from '@/components/leads/LeadsKanban';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Status colors and labels
const statusColors = {
  NEW: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  CONTACTED: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  QUALIFIED: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
  PROPOSAL: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  NEGOTIATION: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20',
  CONVERTED: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  LOST: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

const statusLabels = {
  NEW: 'Novo',
  CONTACTED: 'Contatado',
  QUALIFIED: 'Qualificado',
  PROPOSAL: 'Proposta Enviada',
  NEGOTIATION: 'Em Negociação',
  CONVERTED: 'Convertido',
  LOST: 'Perdido',
};

const priorityColors = {
  LOW: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20',
  MEDIUM: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  HIGH: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20',
  URGENT: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

const priorityLabels = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  URGENT: 'Urgente',
};

type ViewMode = 'table' | 'kanban';

export function LeadsList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [filters, setFilters] = useState<LeadFilters>({
    page: 1,
    limit: viewMode === 'kanban' ? 1000 : 20, // Kanban precisa carregar todos
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Fetch leads
  const { data, isLoading, error } = useQuery({
    queryKey: ['leads', filters],
    queryFn: () => leadsApi.getAll(filters),
  });

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ['leads-stats'],
    queryFn: () => leadsApi.getStats(),
  });

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handleStatusFilterChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      leadStatus: value === 'all' ? undefined : (value as any),
      page: 1,
    }));
  };

  const handlePriorityChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      priority: value === 'all' ? undefined : (value as any),
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleExport = async () => {
    try {
      const blob = await leadsApi.export(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao exportar leads:', error);
    }
  };

  // Mutation para atualizar status do lead (drag & drop no Kanban)
  const updateStatusMutation = useMutation({
    mutationFn: ({ leadId, status }: { leadId: string; status: LeadStatus }) =>
      leadsApi.update(leadId, { leadStatus: status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['leads-stats'] });
    },
  });

  const handleLeadStatusChange = (leadId: string, newStatus: LeadStatus) => {
    updateStatusMutation.mutate({ leadId, status: newStatus });
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setFilters((prev) => ({
      ...prev,
      limit: mode === 'kanban' ? 1000 : 20,
      page: 1,
    }));
  };

  if (error) {
    return (
      <MainLayout title="Leads">
        <Card className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>Erro ao carregar leads. Por favor, tente novamente.</p>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Leads">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Gestão de Leads</h1>
            <p className="text-muted-foreground mt-1">
              Sistema completo de CRM para gerenciar leads e oportunidades
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
            <Button onClick={() => navigate('/leads/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Lead
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Leads</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Convertidos</p>
                  <p className="text-2xl font-bold">{stats.byStatus.CONVERTED || 0}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Follow-ups Pendentes</p>
                  <p className="text-2xl font-bold">{stats.upcomingFollowUps}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Follow-ups Atrasados</p>
                  <p className="text-2xl font-bold">{stats.overdueFollowUps}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email ou empresa..."
                  value={filters.search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select
              value={filters.leadStatus as string || 'all'}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value={LeadStatus.NEW}>Novo</SelectItem>
                <SelectItem value={LeadStatus.CONTACTED}>Contatado</SelectItem>
                <SelectItem value={LeadStatus.QUALIFIED}>Qualificado</SelectItem>
                <SelectItem value={LeadStatus.PROPOSAL}>Proposta Enviada</SelectItem>
                <SelectItem value={LeadStatus.NEGOTIATION}>Em Negociação</SelectItem>
                <SelectItem value={LeadStatus.CONVERTED}>Convertido</SelectItem>
                <SelectItem value={LeadStatus.LOST}>Perdido</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.priority as string || 'all'}
              onValueChange={handlePriorityChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as prioridades</SelectItem>
                <SelectItem value={Priority.LOW}>Baixa</SelectItem>
                <SelectItem value={Priority.MEDIUM}>Média</SelectItem>
                <SelectItem value={Priority.HIGH}>Alta</SelectItem>
                <SelectItem value={Priority.URGENT}>Urgente</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewModeChange('table')}
                className="rounded-r-none"
              >
                <List className="h-4 w-4 mr-2" />
                Lista
              </Button>
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewModeChange('kanban')}
                className="rounded-l-none"
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Kanban
              </Button>
            </div>
          </div>
        </Card>

        {/* Kanban View */}
        {viewMode === 'kanban' && data?.leads && (
          <LeadsKanban
            leads={data.leads}
            onLeadClick={(lead) => navigate(`/leads/${lead.id}`)}
            onStatusChange={handleLeadStatusChange}
          />
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Próximo Follow-up</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={8}>
                        <div className="h-12 bg-muted animate-pulse rounded" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : data?.leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Users className="h-12 w-12 opacity-50" />
                        <p>Nenhum lead encontrado</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.leads.map((lead: Lead) => (
                    <TableRow key={lead.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {lead.name}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate max-w-[200px]">
                              {lead.email}
                            </span>
                          </div>
                          {lead.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {lead.company ? (
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="h-3 w-3 text-muted-foreground" />
                            <span>{lead.company}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusColors[lead.leadStatus]}
                        >
                          {statusLabels[lead.leadStatus]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={priorityColors[lead.priority]}
                        >
                          {priorityLabels[lead.priority]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {lead.nextFollowUp ? (
                          <div className={`${new Date(lead.nextFollowUp) < new Date() ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
                            {formatRelativeTime(new Date(lead.nextFollowUp))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {lead.user?.name || (
                          <span className="text-muted-foreground">Não atribuído</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/leads/${lead.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {data && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-sm text-muted-foreground">
                Página {data.pagination.page} de {data.pagination.totalPages} (
                {data.pagination.total} leads no total)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.pagination.page === 1}
                  onClick={() => handlePageChange(data.pagination.page - 1)}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.pagination.page === data.pagination.totalPages}
                  onClick={() => handlePageChange(data.pagination.page + 1)}
                >
                  Próxima
                </Button>
              </div>
            </div>
          )}
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
