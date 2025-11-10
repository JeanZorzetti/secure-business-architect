import { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { KanbanColumn } from './KanbanColumn';
import { LeadKanbanCard } from './LeadKanbanCard';
import type { Lead, LeadStatus } from '@/types/lead';

interface LeadsKanbanProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
}

const COLUMNS: { status: LeadStatus; label: string; color: string }[] = [
  { status: 'NEW', label: 'Novos', color: 'bg-blue-100 dark:bg-blue-900/20' },
  { status: 'CONTACTED', label: 'Contactados', color: 'bg-purple-100 dark:bg-purple-900/20' },
  { status: 'QUALIFIED', label: 'Qualificados', color: 'bg-cyan-100 dark:bg-cyan-900/20' },
  { status: 'PROPOSAL', label: 'Proposta', color: 'bg-yellow-100 dark:bg-yellow-900/20' },
  { status: 'NEGOTIATION', label: 'Negociação', color: 'bg-orange-100 dark:bg-orange-900/20' },
  { status: 'CONVERTED', label: 'Convertidos', color: 'bg-green-100 dark:bg-green-900/20' },
  { status: 'LOST', label: 'Perdidos', color: 'bg-red-100 dark:bg-red-900/20' },
];

export function LeadsKanban({ leads, onLeadClick, onStatusChange }: LeadsKanbanProps) {
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Permite clique sem arrastar acidentalmente
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Agrupar leads por status
  const leadsByStatus = useMemo(() => {
    const grouped: Record<LeadStatus, Lead[]> = {
      NEW: [],
      CONTACTED: [],
      QUALIFIED: [],
      PROPOSAL: [],
      NEGOTIATION: [],
      CONVERTED: [],
      LOST: [],
    };

    leads.forEach((lead) => {
      grouped[lead.leadStatus].push(lead);
    });

    return grouped;
  }, [leads]);

  const handleDragStart = (event: DragStartEvent) => {
    const lead = leads.find((l) => l.id === event.active.id);
    if (lead) {
      setActiveLead(lead);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveLead(null);
      return;
    }

    const leadId = active.id as string;
    const newStatus = over.id as LeadStatus;

    // Verificar se é uma coluna válida
    if (COLUMNS.some((col) => col.status === newStatus)) {
      const lead = leads.find((l) => l.id === leadId);
      if (lead && lead.leadStatus !== newStatus) {
        onStatusChange(leadId, newStatus);
      }
    }

    setActiveLead(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            label={column.label}
            color={column.color}
            leads={leadsByStatus[column.status]}
            onLeadClick={onLeadClick}
          />
        ))}
      </div>

      {/* Drag Overlay - mostra o card sendo arrastado */}
      <DragOverlay>
        {activeLead && (
          <div className="cursor-grabbing">
            <LeadKanbanCard lead={activeLead} onClick={() => {}} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
