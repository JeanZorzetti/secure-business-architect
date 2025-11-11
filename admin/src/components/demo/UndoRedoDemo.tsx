import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useUndoRedoWithShortcuts } from '@/hooks/useUndoRedoWithShortcuts';
import { UndoRedoButtons } from '@/components/common/UndoRedoButtons';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

/**
 * Componente de demonstração do sistema Undo/Redo
 * Pode ser usado como exemplo ou em ambiente de desenvolvimento
 */
export function UndoRedoDemo() {
  const [localValue, setLocalValue] = useState('');

  const editor = useUndoRedoWithShortcuts('', {
    enableShortcuts: true,
    enableToasts: true,
    maxHistorySize: 50,
  });

  // Sincronizar valor local com o estado do editor
  const handleChange = (value: string) => {
    setLocalValue(value);
    editor.setState(value);
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Demo: Undo/Redo System</h3>
          <p className="text-sm text-muted-foreground">
            Digite algo e teste os atalhos Ctrl+Z (desfazer) e Ctrl+Y (refazer)
          </p>
        </div>

        <UndoRedoButtons
          onUndo={editor.undo}
          onRedo={editor.redo}
          canUndo={editor.canUndo}
          canRedo={editor.canRedo}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="demo-textarea">Editor de Texto</Label>
        <Textarea
          id="demo-textarea"
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Comece a digitar para testar o Undo/Redo..."
          rows={10}
          className="font-mono"
        />
      </div>

      <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
        <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
        <div className="text-sm text-blue-900 dark:text-blue-100 space-y-1">
          <p className="font-medium">Atalhos disponíveis:</p>
          <ul className="space-y-1 ml-4">
            <li>• <Badge variant="secondary" className="font-mono">Ctrl+Z</Badge> - Desfazer última ação</li>
            <li>• <Badge variant="secondary" className="font-mono">Ctrl+Y</Badge> ou <Badge variant="secondary" className="font-mono">Ctrl+Shift+Z</Badge> - Refazer ação</li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <div className="text-sm text-muted-foreground">
          Histórico: {editor.canUndo ? 'Disponível' : 'Vazio'}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={editor.clear}
            disabled={!editor.canUndo && !editor.canRedo}
          >
            Limpar Histórico
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              editor.reset('');
              setLocalValue('');
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="pt-2 border-t">
        <p className="text-xs text-muted-foreground">
          <strong>Estado atual:</strong> {editor.state.length} caracteres
        </p>
      </div>
    </Card>
  );
}
