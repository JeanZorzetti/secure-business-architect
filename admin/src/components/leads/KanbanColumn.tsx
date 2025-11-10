import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LeadKanbanCard } from './LeadKanbanCard';
import type { Lead, LeadStatus } from '@/types/lead';

interface KanbanColumnProps {
  status: LeadStatus;
  label: string;
  color: string;
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
}

export function KanbanColumn({ status, label, color, leads, onLeadClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <div className="flex-shrink-0 w-80">
      <Card className={`h-full ${color} ${isOver ? 'ring-2 ring-primary' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              {label}
            </CardTitle>
            <Badge variant="secondary" className="ml-2">
              {leads.length}
            </Badge>
          </div>
        </CardHeader>

        <div className="px-4 pb-4" ref={setNodeRef}>
          <SortableContext
            id={status}
            items={leads.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="min-h-[500px] space-y-0">
              {leads.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                  Nenhum lead
                </div>
              ) : (
                leads.map((lead) => (
                  <LeadKanbanCard
                    key={lead.id}
                    lead={lead}
                    onClick={() => onLeadClick(lead)}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </div>
      </Card>
    </div>
  );
}
