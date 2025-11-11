import { useEffect } from 'react';
import { useUndoRedo } from './useUndoRedo';
import { toast } from 'sonner';

interface UseUndoRedoWithShortcutsOptions<T> {
  maxHistorySize?: number;
  enableShortcuts?: boolean;
  enableToasts?: boolean;
  onUndo?: (state: T) => void;
  onRedo?: (state: T) => void;
}

/**
 * Hook que combina useUndoRedo com keyboard shortcuts (Ctrl+Z / Ctrl+Y)
 *
 * @example
 * const editor = useUndoRedoWithShortcuts('', {
 *   enableShortcuts: true,
 *   enableToasts: true,
 *   maxHistorySize: 100
 * });
 */
export function useUndoRedoWithShortcuts<T>(
  initialState: T,
  options: UseUndoRedoWithShortcutsOptions<T> = {}
) {
  const {
    maxHistorySize = 50,
    enableShortcuts = true,
    enableToasts = false,
    onUndo: customOnUndo,
    onRedo: customOnRedo,
  } = options;

  const undoRedo = useUndoRedo(initialState, {
    maxHistorySize,
    onUndo: (state) => {
      if (enableToasts) {
        toast.success('Ação desfeita');
      }
      if (customOnUndo) {
        customOnUndo(state);
      }
    },
    onRedo: (state) => {
      if (enableToasts) {
        toast.success('Ação refeita');
      }
      if (customOnRedo) {
        customOnRedo(state);
      }
    },
  });

  // Adicionar keyboard shortcuts
  useEffect(() => {
    if (!enableShortcuts) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Z ou Cmd+Z (undo)
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        // Permitir undo em inputs/textareas nativos
        const target = event.target as HTMLElement;
        const isNativeInput =
          target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

        // Se não for input nativo E puder fazer undo, prevenir comportamento padrão
        if (!isNativeInput && undoRedo.canUndo) {
          event.preventDefault();
          undoRedo.undo();
        }
      }

      // Ctrl+Y ou Cmd+Shift+Z (redo)
      if (
        ((event.ctrlKey || event.metaKey) && event.key === 'y') ||
        ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z')
      ) {
        const target = event.target as HTMLElement;
        const isNativeInput =
          target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

        if (!isNativeInput && undoRedo.canRedo) {
          event.preventDefault();
          undoRedo.redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enableShortcuts, undoRedo]);

  return undoRedo;
}
