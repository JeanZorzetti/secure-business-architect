# Guia de Acessibilidade

Documentação completa das funcionalidades de acessibilidade implementadas no painel administrativo.

## 📋 Visão Geral

O sistema foi desenvolvido com foco em acessibilidade (a11y), seguindo as diretrizes WCAG 2.1 Level AA, garantindo que todos os usuários possam usar a aplicação, independente de suas habilidades.

## 🎯 Funcionalidades Implementadas

### 1. Navegação por Teclado

#### Skip Links
Links de atalho visíveis quando recebem foco (Tab), permitindo pular para conteúdo principal:

- **Skip to main content** - Pula diretamente para o conteúdo
- **Skip to navigation** - Pula para a navegação lateral

```typescript
import { SkipLinks } from '@/components/accessibility/SkipLinks';

// Já integrado no MainLayout
<SkipLinks />
```

#### Keyboard Shortcuts
9 atalhos de navegação implementados:
- `Alt + H` → Dashboard
- `Alt + L` → Leads
- `Alt + C` → Contatos
- `Alt + B` → Blog
- `Alt + N` → Newsletter
- `Alt + S` → Serviços
- `Alt + T` → Depoimentos
- `Alt + P` → Perfil
- `Ctrl + K` → Mostrar atalhos

### 2. Screen Reader Support

#### Live Regions (ARIA)
Hook para anunciar mudanças dinâmicas:

```typescript
import { useScreenReaderAnnounce } from '@/hooks/useScreenReaderAnnounce';

function MyComponent() {
  const { announce } = useScreenReaderAnnounce();

  const handleSave = () => {
    // ... salvar dados
    announce('Dados salvos com sucesso', 'polite');
  };

  const handleError = () => {
    // ... erro
    announce('Erro ao salvar. Tente novamente.', 'assertive');
  };

  return (/* ... */);
}
```

**Prioridades:**
- `polite` - Anúncio quando usuário terminar ação atual
- `assertive` - Anúncio imediato (interrompe)

#### Visually Hidden
Componente para adicionar contexto para screen readers:

```typescript
import { VisuallyHidden } from '@/components/accessibility/VisuallyHidden';

<button>
  <TrashIcon />
  <VisuallyHidden>Deletar item</VisuallyHidden>
</button>
```

### 3. Focus Management

#### Focus Trap
Hook para manter foco dentro de modais/dialogs:

```typescript
import { useFocusTrap } from '@/hooks/useFocusTrap';

function MyDialog({ isOpen, onClose }) {
  const dialogRef = useFocusTrap<HTMLDivElement>({
    enabled: isOpen,
    onEscape: onClose,
  });

  if (!isOpen) return null;

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true">
      <h2>Meu Dialog</h2>
      <button>Ação 1</button>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
}
```

**Funcionalidades:**
- Mantém foco dentro do elemento
- Tab circula entre elementos focáveis
- ESC fecha o modal (configurável)
- Restaura foco anterior ao fechar

#### Focus Indicators
Todos os elementos interativos têm indicadores visuais de foco:

```css
/* Anel de foco visível */
.focus-visible:focus {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
```

### 4. ARIA Labels e Roles

#### Landmarks
Estrutura semântica com roles ARIA:

```html
<!-- Navegação -->
<nav
  id="sidebar-navigation"
  aria-label="Navegação principal"
  role="navigation"
>
  <Sidebar />
</nav>

<!-- Conteúdo principal -->
<main
  id="main-content"
  role="main"
  aria-label="Conteúdo principal"
>
  {children}
</main>
```

#### Labels Descritivos
Todos os controles têm labels adequados:

```typescript
// Botões de ação
<button aria-label="Deletar item">
  <TrashIcon />
</button>

// Inputs com labels associados
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// Status dinâmicos
<div role="status" aria-live="polite">
  {isLoading ? 'Carregando...' : 'Dados carregados'}
</div>
```

## 🔧 Hooks Disponíveis

### useScreenReaderAnnounce

Anuncia mensagens para screen readers.

```typescript
const { announce } = useScreenReaderAnnounce();

announce(message: string, priority?: 'polite' | 'assertive', clearDelay?: number)
```

### useFocusTrap

Implementa focus trap em containers.

```typescript
const containerRef = useFocusTrap<HTMLElement>({
  enabled?: boolean;
  initialFocus?: HTMLElement;
  onEscape?: () => void;
});
```

## 📱 Componentes

### SkipLinks
Links de navegação rápida.

```typescript
<SkipLinks />
```

### VisuallyHidden
Esconde visualmente mas mantém acessível.

```typescript
<VisuallyHidden as="span">
  Texto para screen readers
</VisuallyHidden>
```

## ✅ Checklist de Acessibilidade

### Navegação por Teclado
- [x] Todos os elementos interativos acessíveis via Tab
- [x] Ordem de tabulação lógica
- [x] Skip links implementados
- [x] Focus trap em modais
- [x] Indicadores visuais de foco
- [x] Keyboard shortcuts documentados
- [x] ESC fecha modais

### Screen Readers
- [x] Live regions para anúncios
- [x] Labels descritivos em controles
- [x] Textos alternativos em imagens/ícones
- [x] Landmarks ARIA (nav, main, etc.)
- [x] Roles apropriados
- [x] Estados comunicados (loading, error, success)

### Estrutura Semântica
- [x] Headings hierárquicos (h1, h2, h3)
- [x] Lists para conteúdo de lista
- [x] Buttons para ações
- [x] Links para navegação
- [x] Forms com labels associados

### Visual
- [x] Contraste adequado (WCAG AA)
- [x] Textos redimensionáveis
- [x] Sem informação apenas por cor
- [x] Ícones com texto alternativo

## 🧪 Testes

### Teste com Teclado
1. Remova o mouse
2. Use apenas Tab, Shift+Tab, Enter, ESC, setas
3. Verifique se todos os elementos são acessíveis
4. Confirme ordem de tabulação lógica

### Teste com Screen Reader

**Windows (NVDA - gratuito):**
```bash
1. Baixe NVDA: https://www.nvaccess.org/
2. Inicie o NVDA
3. Navegue pelo site usando:
   - Tab/Shift+Tab: navegar
   - Insert+Down: ler tudo
   - H: próximo heading
   - B: próximo botão
```

**MacOS (VoiceOver - nativo):**
```bash
1. Cmd+F5: ativar VoiceOver
2. Usar VoiceOver+Seta: navegar
3. Ctrl: pausar leitura
4. VoiceOver+A: ler tudo
```

### Ferramentas de Auditoria

**Chrome DevTools:**
1. Lighthouse → Accessibility
2. DevTools → Accessibility Tree

**Extensões:**
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/extension/)
- [Accessibility Insights](https://accessibilityinsights.io/)

## 📚 Referências e Padrões

### WCAG 2.1 Level AA
Principais critérios seguidos:

- **1.1.1** - Texto alternativo
- **1.3.1** - Info e relacionamentos
- **1.4.3** - Contraste mínimo
- **2.1.1** - Teclado
- **2.1.2** - Sem armadilhas de teclado
- **2.4.1** - Bypass blocks (skip links)
- **2.4.3** - Ordem de foco
- **2.4.7** - Foco visível
- **3.2.2** - On input
- **4.1.2** - Nome, role, valor
- **4.1.3** - Mensagens de status

### Documentação
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [React Accessibility](https://react.dev/learn/accessibility)

## 🎨 Exemplos Práticos

### Form Acessível
```typescript
<form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="name">Nome *</label>
    <input
      id="name"
      type="text"
      required
      aria-required="true"
      aria-invalid={errors.name ? 'true' : 'false'}
      aria-describedby={errors.name ? 'name-error' : undefined}
    />
    {errors.name && (
      <p id="name-error" role="alert">
        {errors.name}
      </p>
    )}
  </div>

  <button type="submit" disabled={isLoading}>
    {isLoading ? (
      <>
        <Loader2 className="animate-spin" aria-hidden="true" />
        <VisuallyHidden>Enviando...</VisuallyHidden>
      </>
    ) : (
      'Enviar'
    )}
  </button>
</form>
```

### Lista com Status
```typescript
function ItemList({ items, onDelete }) {
  const { announce } = useScreenReaderAnnounce();

  const handleDelete = (id: string, name: string) => {
    onDelete(id);
    announce(`${name} foi deletado`, 'polite');
  };

  return (
    <ul role="list" aria-label="Lista de itens">
      {items.map((item) => (
        <li key={item.id}>
          <span>{item.name}</span>
          <button
            onClick={() => handleDelete(item.id, item.name)}
            aria-label={`Deletar ${item.name}`}
          >
            <TrashIcon aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
}
```

### Modal Acessível
```typescript
function AccessibleModal({ isOpen, onClose, title, children }) {
  const modalRef = useFocusTrap<HTMLDivElement>({
    enabled: isOpen,
    onEscape: onClose,
  });

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      <h2 id="modal-title">{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Fechar modal">
        <X aria-hidden="true" />
      </button>
    </div>
  );
}
```

## 🚀 Melhorias Futuras

- [ ] Modo de alto contraste
- [ ] Personalização de tamanho de fonte
- [ ] Preferência de animação reduzida
- [ ] Suporte a dictation
- [ ] Testes automatizados de a11y
- [ ] Auditoria completa WCAG 2.1 AAA

## 📞 Suporte

Para reportar problemas de acessibilidade:
1. Descreva o problema
2. Inclua tecnologia assistiva usada
3. Passos para reproduzir
4. Comportamento esperado

---

**Acessibilidade não é um recurso, é um requisito fundamental.**
