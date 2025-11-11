# Sistema Undo/Redo

Sistema completo de Undo/Redo implementado no painel administrativo com suporte a keyboard shortcuts.

## 📋 Visão Geral

O sistema permite desfazer e refazer ações em editores de texto, formulários e outras interfaces interativas, oferecendo:

- ✅ Histórico de estados com tamanho configurável
- ✅ Keyboard shortcuts globais (Ctrl+Z / Ctrl+Y)
- ✅ Componentes de UI reutilizáveis
- ✅ Toast notifications opcionais
- ✅ Callbacks personalizados
- ✅ TypeScript com tipos genéricos

## 🎯 Componentes

### 1. useUndoRedo Hook

Hook base para gerenciar histórico de estados.

```typescript
import { useUndoRedo } from '@/hooks/useUndoRedo';

const editor = useUndoRedo('Texto inicial', {
  maxHistorySize: 50,
  onUndo: (state) => console.log('Undone:', state),
  onRedo: (state) => console.log('Redone:', state),
});

// Usar
editor.setState('Novo texto');
editor.undo(); // Volta para 'Texto inicial'
editor.redo(); // Volta para 'Novo texto'
editor.clear(); // Limpa histórico
editor.reset('Reset'); // Reset com novo estado
```

### 2. useUndoRedoWithShortcuts Hook

Versão com keyboard shortcuts integrados.

```typescript
import { useUndoRedoWithShortcuts } from '@/hooks/useUndoRedoWithShortcuts';

const editor = useUndoRedoWithShortcuts('', {
  enableShortcuts: true, // Ativa Ctrl+Z e Ctrl+Y
  enableToasts: true, // Mostra toast ao desfazer/refazer
  maxHistorySize: 100,
});
```

### 3. UndoRedoButtons Component

Botões visuais para Undo/Redo com tooltips.

```typescript
import { UndoRedoButtons } from '@/components/common/UndoRedoButtons';

<UndoRedoButtons
  onUndo={editor.undo}
  onRedo={editor.redo}
  canUndo={editor.canUndo}
  canRedo={editor.canRedo}
/>
```

## ⌨️ Keyboard Shortcuts

| Atalho | Ação |
|--------|------|
| `Ctrl+Z` ou `Cmd+Z` | Desfazer (Undo) |
| `Ctrl+Y` ou `Cmd+Shift+Z` | Refazer (Redo) |

**Nota:** Os atalhos são inteligentes e não interferem com inputs nativos (input/textarea HTML).

## 🔧 Casos de Uso

### Exemplo 1: Editor de Texto Simples

```typescript
import { useState } from 'react';
import { useUndoRedoWithShortcuts } from '@/hooks/useUndoRedoWithShortcuts';
import { UndoRedoButtons } from '@/components/common/UndoRedoButtons';
import { Textarea } from '@/components/ui/textarea';

function TextEditor() {
  const [value, setValue] = useState('');

  const editor = useUndoRedoWithShortcuts('', {
    enableShortcuts: true,
    enableToasts: true,
  });

  const handleChange = (newValue: string) => {
    setValue(newValue);
    editor.setState(newValue);
  };

  return (
    <div>
      <UndoRedoButtons
        onUndo={editor.undo}
        onRedo={editor.redo}
        canUndo={editor.canUndo}
        canRedo={editor.canRedo}
      />
      <Textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
```

### Exemplo 2: Formulário Complexo

```typescript
interface FormData {
  title: string;
  content: string;
  tags: string[];
}

function ComplexForm() {
  const editor = useUndoRedoWithShortcuts<FormData>(
    { title: '', content: '', tags: [] },
    { maxHistorySize: 50 }
  );

  const updateTitle = (title: string) => {
    editor.setState((prev) => ({ ...prev, title }));
  };

  const updateContent = (content: string) => {
    editor.setState((prev) => ({ ...prev, content }));
  };

  return (
    <form>
      <input
        value={editor.state.title}
        onChange={(e) => updateTitle(e.target.value)}
      />
      <textarea
        value={editor.state.content}
        onChange={(e) => updateContent(e.target.value)}
      />
      <UndoRedoButtons
        onUndo={editor.undo}
        onRedo={editor.redo}
        canUndo={editor.canUndo}
        canRedo={editor.canRedo}
      />
    </form>
  );
}
```

### Exemplo 3: Com Callbacks Personalizados

```typescript
const editor = useUndoRedoWithShortcuts(initialData, {
  onUndo: (state) => {
    console.log('Voltando para:', state);
    // Lógica adicional ao desfazer
    syncWithBackend(state);
  },
  onRedo: (state) => {
    console.log('Refazendo:', state);
    // Lógica adicional ao refazer
    syncWithBackend(state);
  },
});
```

## 🎨 UI Components

### UndoRedoButtons Props

```typescript
interface UndoRedoButtonsProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  className?: string;
}
```

### Customização

```typescript
<UndoRedoButtons
  onUndo={editor.undo}
  onRedo={editor.redo}
  canUndo={editor.canUndo}
  canRedo={editor.canRedo}
  className="my-custom-class"
/>
```

## 🧪 Demo Component

Para testar o sistema, use o componente de demonstração:

```typescript
import { UndoRedoDemo } from '@/components/demo/UndoRedoDemo';

// Em qualquer página
<UndoRedoDemo />
```

## 📝 API Reference

### useUndoRedo

```typescript
function useUndoRedo<T>(
  initialState: T,
  options?: UseUndoRedoOptions<T>
): UseUndoRedoReturn<T>

interface UseUndoRedoOptions<T> {
  maxHistorySize?: number; // Padrão: 50
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
```

### useUndoRedoWithShortcuts

```typescript
function useUndoRedoWithShortcuts<T>(
  initialState: T,
  options?: UseUndoRedoWithShortcutsOptions<T>
): UseUndoRedoReturn<T>

interface UseUndoRedoWithShortcutsOptions<T> {
  maxHistorySize?: number; // Padrão: 50
  enableShortcuts?: boolean; // Padrão: true
  enableToasts?: boolean; // Padrão: false
  onUndo?: (state: T) => void;
  onRedo?: (state: T) => void;
}
```

## ⚠️ Limitações e Considerações

1. **Memória**: Históricos muito grandes podem consumir memória. Use `maxHistorySize` adequado.
2. **Performance**: Para objetos grandes, considere debounce antes de adicionar ao histórico.
3. **Sincronização**: Em editores colaborativos, coordene o histórico entre usuários.
4. **Inputs Nativos**: Shortcuts não interferem com undo/redo nativo de inputs HTML.

## 🔄 Integração com Outros Sistemas

### Com Auto-save

```typescript
const editor = useUndoRedoWithShortcuts(initialState, {
  onUndo: (state) => {
    // Trigger auto-save após undo
    debouncedAutoSave(state);
  },
  onRedo: (state) => {
    // Trigger auto-save após redo
    debouncedAutoSave(state);
  },
});
```

### Com Validação

```typescript
const editor = useUndoRedoWithShortcuts(initialState, {
  onUndo: (state) => {
    // Revalidar formulário após undo
    validateForm(state);
  },
});
```

## 📚 Arquivos

- `admin/src/hooks/useUndoRedo.ts` - Hook base
- `admin/src/hooks/useUndoRedoWithShortcuts.ts` - Hook com shortcuts
- `admin/src/components/common/UndoRedoButtons.tsx` - Botões UI
- `admin/src/components/demo/UndoRedoDemo.tsx` - Componente de demo

## 🎓 Próximos Passos

Potenciais melhorias futuras:

- [ ] Histórico persistente (localStorage/IndexedDB)
- [ ] Branching de histórico (tree-based undo)
- [ ] Merge de mudanças simultâneas
- [ ] Compressão de histórico
- [ ] Visualização de histórico (timeline)
- [ ] Undo seletivo (escolher qual ação desfazer)

## 📖 Referências

- [React Hooks](https://react.dev/reference/react)
- [Memento Pattern](https://refactoring.guru/design-patterns/memento)
- [Command Pattern](https://refactoring.guru/design-patterns/command)
