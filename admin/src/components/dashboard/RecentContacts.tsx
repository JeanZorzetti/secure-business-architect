import { useQuery } from '@tanstack/react-query';
import { Mail, Building2, Phone, Clock } from 'lucide-react';
import { contactsApi } from '@/api/contacts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatRelativeTime } from '@/lib/utils';
import type { Contact } from '@/types/contact';

const statusColors = {
  PENDING: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  READ: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  ARCHIVED: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
};

const statusLabels = {
  PENDING: 'Pendente',
  READ: 'Lido',
  ARCHIVED: 'Arquivado',
};

export function RecentContacts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['contacts', 'recent'],
    queryFn: () => contactsApi.getAll({ page: 1, limit: 5 }),
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contatos Recentes</h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contatos Recentes</h3>
        <p className="text-sm text-destructive">Erro ao carregar contatos</p>
      </Card>
    );
  }

  const contacts = data?.contacts || [];

  if (contacts.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contatos Recentes</h3>
        <div className="text-center py-8 text-muted-foreground">
          <Mail className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Nenhum contato recebido ainda</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Contatos Recentes</h3>
      <div className="space-y-4">
        {contacts.map((contact: Contact) => (
          <div
            key={contact.id}
            className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="rounded-full bg-primary/10 p-2">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-medium truncate">{contact.name}</p>
                <Badge className={statusColors[contact.status]} variant="secondary">
                  {statusLabels[contact.status]}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{contact.email}</span>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.company && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3 w-3" />
                    <span>{contact.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{formatRelativeTime(new Date(contact.createdAt))}</span>
                </div>
              </div>
              <p className="mt-2 text-sm line-clamp-2">{contact.message}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
