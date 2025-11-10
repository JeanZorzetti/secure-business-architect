import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Lead, Priority } from '@/types/lead';
import { Building2, Mail, Phone, Calendar, User, AlertCircle } from 'lucide-react';
import { format, parseISO, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LeadKanbanCardProps {
  lead: Lead;
  onClick: () => void;
}

const priorityConfig: Record<Priority, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  LOW: { label: 'Baixa', variant: 'secondary' },
  MEDIUM: { label: 'Média', variant: 'default' },
  HIGH: { label: 'Alta', variant: 'outline' },
  URGENT: { label: 'Urgente', variant: 'destructive' },
};

export function LeadKanbanCard({ lead, onClick }: LeadKanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isOverdue = lead.nextFollowUp ? isPast(parseISO(lead.nextFollowUp)) : false;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        className={`p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow ${
          isDragging ? 'shadow-lg ring-2 ring-primary' : ''
        }`}
        onClick={onClick}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{lead.name}</h4>
              {lead.company && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Building2 className="h-3 w-3" />
                  <span className="truncate">{lead.company}</span>
                </div>
              )}
            </div>
            <Badge variant={priorityConfig[lead.priority].variant} className="text-xs flex-shrink-0">
              {priorityConfig[lead.priority].label}
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{lead.email}</span>
            </div>
            {lead.phone && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Phone className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{lead.phone}</span>
              </div>
            )}
          </div>

          {/* Next Follow-up */}
          {lead.nextFollowUp && (
            <div
              className={`flex items-center gap-1 text-xs ${
                isOverdue ? 'text-red-600 font-medium' : 'text-muted-foreground'
              }`}
            >
              {isOverdue && <AlertCircle className="h-3 w-3" />}
              <Calendar className="h-3 w-3" />
              <span>
                {format(parseISO(lead.nextFollowUp), "dd 'de' MMM", { locale: ptBR })}
              </span>
            </div>
          )}

          {/* Assigned User */}
          {lead.user && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span className="truncate">{lead.user.name}</span>
            </div>
          )}

          {/* Tags */}
          {lead.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {lead.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0">
                  {tag}
                </Badge>
              ))}
              {lead.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0">
                  +{lead.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
