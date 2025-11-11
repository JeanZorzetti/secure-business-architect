import { useState, useCallback, useRef } from 'react';

interface UseUndoRedoOptions<T> {
  maxHistorySize?: number;
  onUndo?: (state: T) => void;
  onRedo?: (state: T) => void;
}

interface UseUndoRedoReturn<T> {
  state: T;
  setState: (newState: T | ((prev: T) => T)) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clear: () => void;
  reset: (initialState: T) => void;
}

/**
 * Hook personalizado para implementar funcionalidade de Undo/Redo
 *
 * @example
 * const { state, setState, undo, redo, canUndo, canRedo } = useUndoRedo({
 *   initialState: '',
 *   maxHistorySize: 50
 * });
 */
export function useUndoRedo<T>(
  initialState: T,
  options: UseUndoRedoOptions<T> = {}
): UseUndoRedoReturn<T> {
  const { maxHistorySize = 50, onUndo, onRedo } = options;

  // Estados
  const [state, setCurrentState] = useState<T>(initialState);
  const [history, setHistory] = useState<T[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ref para evitar adicionar ao histórico durante undo/redo
  const isUndoRedoAction = useRef(false);

  // Atualizar estado e adicionar ao histórico
  const setState = useCallback(
    (newState: T | ((prev: T) => T)) => {
      setCurrentState((prev) => {
        const nextState =
          typeof newState === 'function'
            ? (newState as (prev: T) => T)(prev)
            : newState;

        // Se for uma ação de undo/redo, não adicionar ao histórico
        if (isUndoRedoAction.current) {
          isUndoRedoAction.current = false;
          return nextState;
        }

        // Adicionar ao histórico
        setHistory((h) => {
          // Remover estados futuros se estiver no meio do histórico
          const newHistory = h.slice(0, currentIndex + 1);
          newHistory.push(nextState);

          // Limitar tamanho do histórico
          if (newHistory.length > maxHistorySize) {
            newHistory.shift();
            setCurrentIndex((i) => i); // Manter índice
            return newHistory;
          }

          setCurrentIndex((i) => i + 1);
          return newHistory;
        });

        return nextState;
      });
    },
    [currentIndex, maxHistorySize]
  );

  // Undo
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      isUndoRedoAction.current = true;
      const newIndex = currentIndex - 1;
      const previousState = history[newIndex];

      setCurrentIndex(newIndex);
      setCurrentState(previousState);

      if (onUndo) {
        onUndo(previousState);
      }
    }
  }, [currentIndex, history, onUndo]);

  // Redo
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const newIndex = currentIndex + 1;
      const nextState = history[newIndex];

      setCurrentIndex(newIndex);
      setCurrentState(nextState);

      if (onRedo) {
        onRedo(nextState);
      }
    }
  }, [currentIndex, history, onRedo]);

  // Verificar se pode fazer undo/redo
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  // Limpar histórico
  const clear = useCallback(() => {
    setHistory([state]);
    setCurrentIndex(0);
  }, [state]);

  // Reset com novo estado inicial
  const reset = useCallback((newInitialState: T) => {
    setCurrentState(newInitialState);
    setHistory([newInitialState]);
    setCurrentIndex(0);
  }, []);

  return {
    state,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    clear,
    reset,
  };
}
