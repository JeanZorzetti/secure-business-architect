import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { contactsApi } from '@/api/contacts';
import { Card } from '@/components/ui/card';
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
  Mail,
  Phone,
  Building2,
  Calendar,
  ArrowLeft,
  Trash2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { ContactStatus } from '@/types/contact';
import { formatRelativeTime } from '@/lib/utils';
import { toast } from 'sonner';
import { ConvertToLeadDialog } from '@/components/contacts/ConvertToLeadDialog';

const statusColors = {
  PENDING: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  READ: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  ARCHIVED: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20',
};

const statusLabels = {
  PENDING: 'Pendente',
  READ: 'Lido',
  ARCHIVED: 'Arquivado',
};

export function ContactDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: contact, isLoading, error } = useQuery({
    queryKey: ['contact', id],
    queryFn: () => contactsApi.getById(id!),
    enabled: !!id,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) =>
      contactsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact', id] });
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact-stats'] });
      toast.success('Status atualizado com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar status. Tente novamente.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact-stats'] });
      toast.success('Contato deletado com sucesso!');
      navigate('/contacts');
    },
    onError: () => {
      toast.error('Erro ao deletar contato. Tente novamente.');
    },
  });

  const handleStatusChange = (newStatus: string) => {
    if (id) {
      updateStatusMutation.mutate({ id, status: newStatus as ContactStatus });
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteMutation.mutate(id);
    }
  };

  if (error) {
    return (
      <MainLayout title="Detalhes do Contato">
        <Card className="p-6">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>Erro ao carregar contato. Por favor, tente novamente.</p>
          </div>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/contacts')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Contatos
          </Button>
        </Card>
      </MainLayout>
    );
  }

  if (isLoading) {
    return (
      <MainLayout title="Detalhes do Contato">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" disabled>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>
          <Card className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </Card>
        </div>
      </MainLayout>
    );
  }

  if (!contact) {
    return (
      <MainLayout title="Detalhes do Contato">
        <Card className="p-6">
          <p className="text-muted-foreground">Contato não encontrado.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/contacts')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Contatos
          </Button>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Detalhes do Contato">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/contacts')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{contact.name}</h1>
              <p className="text-muted-foreground mt-1">
                Recebido {formatRelativeTime(new Date(contact.createdAt))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select
              value={contact.status}
              onValueChange={handleStatusChange}
              disabled={updateStatusMutation.isPending}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ContactStatus.PENDING}>
                  {statusLabels.PENDING}
                </SelectItem>
                <SelectItem value={ContactStatus.READ}>
                  {statusLabels.READ}
                </SelectItem>
                <SelectItem value={ContactStatus.ARCHIVED}>
                  {statusLabels.ARCHIVED}
                </SelectItem>
              </SelectContent>
            </Select>

            <ConvertToLeadDialog contact={contact} />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-destructive" />
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja deletar este contato? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Deletar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm font-medium hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </Card>

          {contact.phone && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            </Card>
          )}

          {contact.company && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Empresa</p>
                  <p className="text-sm font-medium">{contact.company}</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Message */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Mensagem</h3>
            <Badge
              variant="outline"
              className={statusColors[contact.status]}
            >
              {statusLabels[contact.status]}
            </Badge>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {contact.message}
            </p>
          </div>
        </Card>

        {/* Metadata */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Informações</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Criado em:</span>
              <span className="font-medium">
                {new Date(contact.createdAt).toLocaleString('pt-BR')}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Atualizado em:</span>
              <span className="font-medium">
                {new Date(contact.updatedAt).toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
