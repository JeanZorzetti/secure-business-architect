import { Undo2, Redo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface UndoRedoButtonsProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  className?: string;
}

export function UndoRedoButtons({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  className = '',
}: UndoRedoButtonsProps) {
  return (
    <TooltipProvider>
      <div className={`flex items-center gap-1 ${className}`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onUndo}
              disabled={!canUndo}
              aria-label="Desfazer (Ctrl+Z)"
            >
              <Undo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Desfazer (Ctrl+Z)</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRedo}
              disabled={!canRedo}
              aria-label="Refazer (Ctrl+Y)"
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Refazer (Ctrl+Y)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
