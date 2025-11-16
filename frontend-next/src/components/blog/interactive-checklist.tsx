'use client';

import { useState } from 'react';
import { CheckSquare, Square, ClipboardCheck, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InteractiveChecklistProps {
  items: string[];
  title?: string;
}

export default function InteractiveChecklist({ items, title = 'Checklist Prático' }: InteractiveChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newChecked = new Set(checked);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setChecked(newChecked);
  };

  const progress = items.length > 0 ? (checked.size / items.length) * 100 : 0;
  const isComplete = checked.size === items.length && items.length > 0;

  return (
    <div className="my-8 p-6 md:p-8 bg-gradient-to-br from-accent/10 via-accent/5 to-background rounded-lg border border-accent/30 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <ClipboardCheck className="h-6 w-6 text-accent" />
          </div>
          <h4 className="text-xl font-bold text-foreground">{title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground">
            {checked.size}/{items.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-3 bg-border rounded-full mb-6 overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            isComplete
              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
              : 'bg-gradient-to-r from-accent to-accent/70'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 rounded-r-lg animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <PartyPopper className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-sm font-semibold text-green-900 dark:text-green-300">
              Parabéns! Você completou todos os itens do checklist! 🎉
            </p>
          </div>
        </div>
      )}

      {/* Checklist Items */}
      <ul className="space-y-3">
        {items.map((item, index) => {
          const isChecked = checked.has(index);

          return (
            <li key={index}>
              <button
                onClick={() => toggleItem(index)}
                className={cn(
                  'w-full flex items-start gap-3 p-3 rounded-lg transition-all duration-200',
                  'hover:bg-accent/5 focus:outline-none focus:ring-2 focus:ring-accent/50',
                  isChecked && 'bg-accent/5'
                )}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {isChecked ? (
                    <CheckSquare className="h-5 w-5 text-accent animate-in zoom-in duration-200" />
                  ) : (
                    <Square className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <span
                  className={cn(
                    'text-left text-base leading-relaxed transition-all duration-200',
                    isChecked
                      ? 'line-through text-muted-foreground/70'
                      : 'text-foreground'
                  )}
                >
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
