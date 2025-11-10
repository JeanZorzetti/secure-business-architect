import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { leadsApi } from '@/api/leads';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Mail,
  Phone,
  Building2,
  ArrowLeft,
  Trash2,
  AlertCircle,
  Loader2,
  MessageSquare,
  StickyNote,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { LeadStatus, Priority, InteractionType } from '@/types/lead';
import type { CreateInteractionDTO, CreateNoteDTO, UpdateLeadDTO } from '@/types/lead';
import { formatRelativeTime } from '@/lib/utils';
import { toast } from 'sonner';

const interactionTypeLabels = {
  EMAIL: 'Email',
  PHONE: 'Telefone',
  MEETING: 'Reunião',
  WHATSAPP: 'WhatsApp',
  OTHER: 'Outro',
};

export function LeadDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // State for forms
  const [interactionForm, setInteractionForm] = useState<CreateInteractionDTO>({
    type: InteractionType.EMAIL,
    notes: '',
  });
  const [noteForm, setNoteForm] = useState<CreateNoteDTO>({
    content: '',
    isPinned: false,
  });
  const [convertNotes, setConvertNotes] = useState('');
  const [showInteractionDialog, setShowInteractionDialog] = useState(false);
  const [showNoteDialog, setShowNoteDialog] = useState(false);

  // Fetch lead data
  const { data: lead, isLoading, error } = useQuery({
    queryKey: ['lead', id],
    queryFn: () => leadsApi.getById(id!),
    enabled: !!id,
  });

  // Fetch timeline
  const { data: timeline } = useQuery({
    queryKey: ['lead-timeline', id],
    queryFn: () => leadsApi.getTimeline(id!),
    enabled: !!id,
  });

  // Mutations
  const updateLeadMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLeadDTO }) =>
      leadsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead', id] });
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['leads-stats'] });
      toast.success('Lead atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar lead. Tente novamente.');
    },
  });

  const createInteractionMutation = useMutation({
    mutationFn: ({ leadId, data }: { leadId: string; data: CreateInteractionDTO }) =>
      leadsApi.createInteraction(leadId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead', id] });
      queryClient.invalidateQueries({ queryKey: ['lead-timeline', id] });
      toast.success('Interação registrada com sucesso!');
      setInteractionForm({ type: InteractionType.EMAIL, notes: '' });
      setShowInteractionDialog(false);
    },
    onError: () => {
      toast.error('Erro ao registrar interação. Tente novamente.');
    },
  });

  const createNoteMutation = useMutation({
    mutationFn: ({ leadId, data }: { leadId: string; data: CreateNoteDTO }) =>
      leadsApi.createNote(leadId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead', id] });
      queryClient.invalidateQueries({ queryKey: ['lead-timeline', id] });
      toast.success('Nota adicionada com sucesso!');
      setNoteForm({ content: '', isPinned: false });
      setShowNoteDialog(false);
    },
    onError: () => {
      toast.error('Erro ao adicionar nota. Tente novamente.');
    },
  });

  const convertLeadMutation = useMutation({
    mutationFn: ({ id, notes }: { id: string; notes?: string }) =>
      leadsApi.convert(id, { notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lead', id] });
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['leads-stats'] });
      toast.success('Lead convertido com sucesso!');
      setConvertNotes('');
    },
    onError: () => {
      toast.error('Erro ao converter lead. Tente novamente.');
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: (id: string) => leadsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['leads-stats'] });
      toast.success('Lead deletado com sucesso!');
      navigate('/leads');
    },
    onError: () => {
      toast.error('Erro ao deletar lead. Tente novamente.');
    },
  });

  // Handlers
  const handleStatusChange = (newStatus: string) => {
    if (id) {
      updateLeadMutation.mutate({ id, data: { leadStatus: newStatus as any } });
    }
  };

  const handlePriorityChange = (newPriority: string) => {
    if (id) {
      updateLeadMutation.mutate({ id, data: { priority: newPriority as any } });
    }
  };

  const handleNextFollowUpChange = (date: string) => {
    if (id) {
      updateLeadMutation.mutate({ id, data: { nextFollowUp: date } });
    }
  };

  const handleCreateInteraction = () => {
    if (id && interactionForm.notes.trim()) {
      createInteractionMutation.mutate({ leadId: id, data: interactionForm });
    }
  };

  const handleCreateNote = () => {
    if (id && noteForm.content.trim()) {
      createNoteMutation.mutate({ leadId: id, data: noteForm });
    }
  };

  const handleConvertLead = () => {
    if (id) {
      convertLeadMutation.mutate({ id, notes: convertNotes || undefined });
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteLeadMutation.mutate(id);
    }
  };

  // Loading and error states
  if (isLoading) {
    return (
      <MainLayout title="Carregando...">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </MainLayout>
    );
  }

  if (error || !lead) {
    return (
      <MainLayout title="Erro">
        <Card className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>Erro ao carregar lead. Por favor, tente novamente.</p>
          </div>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={lead.name}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/leads')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{lead.name}</h1>
              <p className="text-muted-foreground mt-1">
                Lead recebido {formatRelativeTime(new Date(lead.createdAt))}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {lead.leadStatus !== LeadStatus.CONVERTED && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Converter Lead
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Converter Lead em Cliente</DialogTitle>
                    <DialogDescription>
                      Marcar este lead como convertido? Adicione notas sobre a conversão (opcional).
                    </DialogDescription>
                  </DialogHeader>
                  <Textarea
                    placeholder="Notas sobre a conversão..."
                    value={convertNotes}
                    onChange={(e) => setConvertNotes(e.target.value)}
                    rows={3}
                  />
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setConvertNotes('')}>
                      Cancelar
                    </Button>
                    <Button onClick={handleConvertLead}>
                      Confirmar Conversão
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Deletar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja deletar este lead? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Deletar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Lead Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Informações de Contato</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-sm hover:underline flex items-center gap-1"
                    >
                      {lead.email}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                {lead.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-sm hover:underline flex items-center gap-1"
                      >
                        {lead.phone}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}
                {lead.company && (
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Empresa</p>
                      <p className="text-sm">{lead.company}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Status & Priority */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Status e Prioridade</h2>
              <div className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Select value={lead.leadStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={LeadStatus.NEW}>Novo</SelectItem>
                      <SelectItem value={LeadStatus.CONTACTED}>Contatado</SelectItem>
                      <SelectItem value={LeadStatus.QUALIFIED}>Qualificado</SelectItem>
                      <SelectItem value={LeadStatus.PROPOSAL}>Proposta Enviada</SelectItem>
                      <SelectItem value={LeadStatus.NEGOTIATION}>Em Negociação</SelectItem>
                      <SelectItem value={LeadStatus.CONVERTED}>Convertido</SelectItem>
                      <SelectItem value={LeadStatus.LOST}>Perdido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Prioridade</Label>
                  <Select value={lead.priority} onValueChange={handlePriorityChange}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Priority.LOW}>Baixa</SelectItem>
                      <SelectItem value={Priority.MEDIUM}>Média</SelectItem>
                      <SelectItem value={Priority.HIGH}>Alta</SelectItem>
                      <SelectItem value={Priority.URGENT}>Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Próximo Follow-up</Label>
                  <Input
                    type="datetime-local"
                    className="mt-2"
                    value={lead.nextFollowUp ? new Date(lead.nextFollowUp).toISOString().slice(0, 16) : ''}
                    onChange={(e) => handleNextFollowUpChange(e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {/* Metadata */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Informações Adicionais</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Origem</p>
                  <p className="font-medium">{lead.source || 'Website'}</p>
                </div>
                {lead.user && (
                  <div>
                    <p className="text-muted-foreground">Responsável</p>
                    <p className="font-medium">{lead.user.name}</p>
                  </div>
                )}
                {lead.lastContact && (
                  <div>
                    <p className="text-muted-foreground">Último Contato</p>
                    <p className="font-medium">
                      {formatRelativeTime(new Date(lead.lastContact))}
                    </p>
                  </div>
                )}
                {lead.tags.length > 0 && (
                  <div>
                    <p className="text-muted-foreground mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {lead.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Main Content - Timeline, Interactions, Notes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Original Message */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Mensagem Original</h2>
              <p className="text-sm whitespace-pre-wrap">{lead.message}</p>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Dialog open={showInteractionDialog} onOpenChange={setShowInteractionDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Registrar Interação
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Registrar Interação</DialogTitle>
                    <DialogDescription>
                      Registre uma comunicação ou ação realizada com este lead.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Tipo de Interação</Label>
                      <Select
                        value={interactionForm.type}
                        onValueChange={(value) =>
                          setInteractionForm((prev) => ({ ...prev, type: value as any }))
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={InteractionType.EMAIL}>Email</SelectItem>
                          <SelectItem value={InteractionType.PHONE}>Telefone</SelectItem>
                          <SelectItem value={InteractionType.MEETING}>Reunião</SelectItem>
                          <SelectItem value={InteractionType.WHATSAPP}>WhatsApp</SelectItem>
                          <SelectItem value={InteractionType.OTHER}>Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Notas</Label>
                      <Textarea
                        className="mt-2"
                        placeholder="Descreva a interação..."
                        value={interactionForm.notes}
                        onChange={(e) =>
                          setInteractionForm((prev) => ({ ...prev, notes: e.target.value }))
                        }
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setInteractionForm({ type: InteractionType.EMAIL, notes: '' });
                        setShowInteractionDialog(false);
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleCreateInteraction}
                      disabled={!interactionForm.notes.trim()}
                    >
                      Salvar Interação
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <StickyNote className="h-4 w-4 mr-2" />
                    Adicionar Nota
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Nota</DialogTitle>
                    <DialogDescription>
                      Adicione uma nota interna sobre este lead.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Conteúdo</Label>
                      <Textarea
                        className="mt-2"
                        placeholder="Escreva sua nota..."
                        value={noteForm.content}
                        onChange={(e) =>
                          setNoteForm((prev) => ({ ...prev, content: e.target.value }))
                        }
                        rows={4}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isPinned"
                        checked={noteForm.isPinned}
                        onChange={(e) =>
                          setNoteForm((prev) => ({ ...prev, isPinned: e.target.checked }))
                        }
                      />
                      <Label htmlFor="isPinned">Fixar nota (aparece no topo)</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setNoteForm({ content: '', isPinned: false });
                        setShowNoteDialog(false);
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleCreateNote}
                      disabled={!noteForm.content.trim()}
                    >
                      Salvar Nota
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Timeline */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Timeline</h2>
              <div className="space-y-4">
                {timeline && timeline.length > 0 ? (
                  timeline.map((item) => (
                    <div key={item.id} className="flex gap-4 border-l-2 border-muted pl-4 pb-4">
                      <div className="flex-shrink-0">
                        {item.type === 'interaction' ? (
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        ) : (
                          <StickyNote className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">
                            {item.type === 'interaction'
                              ? `Interação: ${interactionTypeLabels[item.metadata?.type as keyof typeof interactionTypeLabels] || 'Outro'}`
                              : 'Nota'}
                            {item.metadata?.isPinned && (
                              <Badge variant="secondary" className="ml-2">Fixada</Badge>
                            )}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatRelativeTime(new Date(item.timestamp))}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {item.content}
                        </p>
                        {item.userName && (
                          <p className="text-xs text-muted-foreground">
                            por {item.userName}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhuma interação ou nota registrada ainda
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
