import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { campaignsApi } from '@/api/campaigns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Search,
  Plus,
  MoreVertical,
  Send,
  Calendar,
  Trash2,
  X,
  Loader2,
  Mail,
  CheckCircle,
  AlertCircle,
  Eye,
  MousePointerClick,
} from 'lucide-react';
import { CampaignStatus, type Campaign, type CreateCampaignDTO } from '@/types/campaign';
import { toast } from 'sonner';
import { formatRelativeTime } from '@/lib/utils';

const statusColors = {
  DRAFT: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20',
  SCHEDULED: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  SENDING: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  SENT: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  FAILED: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
};

const statusLabels = {
  DRAFT: 'Rascunho',
  SCHEDULED: 'Agendada',
  SENDING: 'Enviando',
  SENT: 'Enviada',
  FAILED: 'Falhou',
};

export function CampaignsList() {
  const queryClient = useQueryClient();

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<CampaignStatus | 'ALL'>('ALL');
  const [page] = useState(1);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Form state
  const [formData, setFormData] = useState<CreateCampaignDTO>({
    subject: '',
    content: '',
  });
  const [scheduledFor, setScheduledFor] = useState('');

  // Fetch campaigns
  const { data, isLoading, error } = useQuery({
    queryKey: ['campaigns', page, status, search],
    queryFn: () =>
      campaignsApi.findAll({
        page,
        limit: 20,
        status: status === 'ALL' ? undefined : status,
        search: search || undefined,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }),
  });

  // Fetch stats
  const { data: stats } = useQuery({
    queryKey: ['campaigns-stats'],
    queryFn: () => campaignsApi.getStats(),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateCampaignDTO) => campaignsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns-stats'] });
      toast.success('Campanha criada com sucesso!');
      setCreateDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast.error('Erro ao criar campanha. Tente novamente.');
    },
  });

  // Send mutation
  const sendMutation = useMutation({
    mutationFn: (id: string) => campaignsApi.send(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns-stats'] });
      toast.success('Campanha enviada com sucesso!');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Erro ao enviar campanha';
      toast.error(errorMessage);
    },
  });

  // Schedule mutation
  const scheduleMutation = useMutation({
    mutationFn: ({ id, scheduledFor }: { id: string; scheduledFor: string }) =>
      campaignsApi.schedule(id, { scheduledFor }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns-stats'] });
      toast.success('Campanha agendada com sucesso!');
      setScheduleDialogOpen(false);
      setScheduledFor('');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Erro ao agendar campanha';
      toast.error(errorMessage);
    },
  });

  // Cancel scheduled mutation
  const cancelScheduledMutation = useMutation({
    mutationFn: (id: string) => campaignsApi.cancelScheduled(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns-stats'] });
      toast.success('Agendamento cancelado com sucesso!');
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.error || 'Erro ao cancelar agendamento';
      toast.error(errorMessage);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => campaignsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns-stats'] });
      toast.success('Campanha deletada com sucesso!');
      setDeleteDialogOpen(false);
      setSelectedCampaign(null);
    },
    onError: () => {
      toast.error('Erro ao deletar campanha. Tente novamente.');
    },
  });

  const resetForm = () => {
    setFormData({
      subject: '',
      content: '',
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const handleSend = (campaign: Campaign) => {
    if (confirm(`Tem certeza que deseja enviar a campanha "${campaign.subject}" agora?`)) {
      sendMutation.mutate(campaign.id);
    }
  };

  const handleSchedule = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setScheduleDialogOpen(true);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCampaign && scheduledFor) {
      scheduleMutation.mutate({
        id: selectedCampaign.id,
        scheduledFor: new Date(scheduledFor).toISOString(),
      });
    }
  };

  const handleCancelScheduled = (campaign: Campaign) => {
    if (confirm(`Tem certeza que deseja cancelar o agendamento da campanha "${campaign.subject}"?`)) {
      cancelScheduledMutation.mutate(campaign.id);
    }
  };

  const handleDelete = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCampaign) {
      deleteMutation.mutate(selectedCampaign.id);
    }
  };

  const getOpenRate = (campaign: Campaign) => {
    if (campaign.recipientCount === 0) return 0;
    return Math.round((campaign.openCount / campaign.recipientCount) * 100);
  };

  const getClickRate = (campaign: Campaign) => {
    if (campaign.recipientCount === 0) return 0;
    return Math.round((campaign.clickCount / campaign.recipientCount) * 100);
  };

  if (error) {
    return (
      <MainLayout title="Campanhas de Newsletter">
        <Card className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>Erro ao carregar campanhas. Por favor, tente novamente.</p>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Campanhas de Newsletter">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Campanhas de Newsletter</h1>
            <p className="text-muted-foreground mt-1">
              Crie e gerencie campanhas de email para seus inscritos
            </p>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Campanha
          </Button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total de Campanhas</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-500/10 p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Enviadas</p>
                  <p className="text-2xl font-bold">{stats.byStatus.SENT}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-500/10 p-3">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Abertura</p>
                  <p className="text-2xl font-bold">{stats.averageOpenRate.toFixed(1)}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-purple-500/10 p-3">
                  <MousePointerClick className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Taxa de Cliques</p>
                  <p className="text-2xl font-bold">{stats.averageClickRate.toFixed(1)}%</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por assunto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={status}
              onValueChange={(value) => setStatus(value as CampaignStatus | 'ALL')}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos os status</SelectItem>
                <SelectItem value={CampaignStatus.DRAFT}>{statusLabels.DRAFT}</SelectItem>
                <SelectItem value={CampaignStatus.SCHEDULED}>{statusLabels.SCHEDULED}</SelectItem>
                <SelectItem value={CampaignStatus.SENT}>{statusLabels.SENT}</SelectItem>
                <SelectItem value={CampaignStatus.FAILED}>{statusLabels.FAILED}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assunto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destinatários</TableHead>
                <TableHead>Taxa de Abertura</TableHead>
                <TableHead>Taxa de Cliques</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : data?.campaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhuma campanha encontrada
                  </TableCell>
                </TableRow>
              ) : (
                data?.campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{campaign.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          Por {campaign.creator?.name || 'Desconhecido'}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[campaign.status]}>
                        {statusLabels[campaign.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.recipientCount}</TableCell>
                    <TableCell>
                      {campaign.status === CampaignStatus.SENT ? `${getOpenRate(campaign)}%` : '-'}
                    </TableCell>
                    <TableCell>
                      {campaign.status === CampaignStatus.SENT ? `${getClickRate(campaign)}%` : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {campaign.status === CampaignStatus.SENT && campaign.sentAt ? (
                          <>
                            <p>Enviada</p>
                            <p className="text-muted-foreground">
                              {formatRelativeTime(new Date(campaign.sentAt))}
                            </p>
                          </>
                        ) : campaign.status === CampaignStatus.SCHEDULED && campaign.scheduledFor ? (
                          <>
                            <p>Agendada para</p>
                            <p className="text-muted-foreground">
                              {new Date(campaign.scheduledFor).toLocaleString('pt-BR')}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>Criada</p>
                            <p className="text-muted-foreground">
                              {formatRelativeTime(new Date(campaign.createdAt))}
                            </p>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {(campaign.status === CampaignStatus.DRAFT ||
                            campaign.status === CampaignStatus.SCHEDULED) && (
                            <>
                              <DropdownMenuItem onClick={() => handleSend(campaign)}>
                                <Send className="mr-2 h-4 w-4" />
                                Enviar Agora
                              </DropdownMenuItem>
                              {campaign.status === CampaignStatus.DRAFT && (
                                <DropdownMenuItem onClick={() => handleSchedule(campaign)}>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Agendar
                                </DropdownMenuItem>
                              )}
                              {campaign.status === CampaignStatus.SCHEDULED && (
                                <DropdownMenuItem onClick={() => handleCancelScheduled(campaign)}>
                                  <X className="mr-2 h-4 w-4" />
                                  Cancelar Agendamento
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                            </>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDelete(campaign)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Deletar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova Campanha de Newsletter</DialogTitle>
            <DialogDescription>
              Crie uma nova campanha para enviar aos seus inscritos
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">
                Assunto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Digite o assunto do email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">
                Conteúdo <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Digite o conteúdo do email (HTML ou texto simples)"
                rows={10}
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateDialogOpen(false)}
                disabled={createMutation.isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Rascunho
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agendar Campanha</DialogTitle>
            <DialogDescription>
              Escolha a data e hora para enviar a campanha "{selectedCampaign?.subject}"
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleScheduleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledFor">
                Data e Hora <span className="text-red-500">*</span>
              </Label>
              <Input
                id="scheduledFor"
                type="datetime-local"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setScheduleDialogOpen(false);
                  setScheduledFor('');
                }}
                disabled={scheduleMutation.isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={scheduleMutation.isPending}>
                {scheduleMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Agendando...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar a campanha "{selectedCampaign?.subject}"? Esta ação não
              pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
}
