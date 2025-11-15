# Roadmap UX/UI - Artigos do Blog v2.0

**Data de Criação:** 13/11/2025
**Última Atualização:** 13/11/2025
**Objetivo:** Transformar os artigos do blog em experiência de leitura profissional e envolvente
**Status:** 🟡 EM ANDAMENTO - Fases 1, 2 e 3 Concluídas ✅

---

## 📊 Análise do Problema Atual

### ❌ Problemas Identificados:

1. **Formatação HTML Básica:**
   - Artigos usam `dangerouslySetInnerHTML` com HTML puro
   - Sem estilização customizada
   - Tipografia genérica e sem hierarquia visual clara
   - Espaçamentos inconsistentes

2. **Resumo Executivo:**
   - Design inline com estilos hardcoded
   - Não responsivo adequadamente
   - Cores não seguem o design system (Gold + Preto)
   - Quebra na experiência mobile

3. **Conteúdo:**
   - Parágrafos muito longos sem quebras visuais
   - Falta de elementos visuais (icons, cards, destaques)
   - Checklists sem interatividade
   - Quotes e citações sem destaque

4. **Leitura:**
   - Linha muito longa (sem max-width otimizado)
   - Contraste de cores não otimizado
   - Falta de breathing room
   - Sans-serif genérica (não há serif para leitura longa)

5. **Engajamento:**
   - Sem progress bar de leitura
   - Falta de table of contents
   - CTA genérico ao final
   - Sem related articles

---

## 🎯 Objetivos do Redesign

### Metas Principais:

1. ✅ **Profissionalismo:** Design que transmite expertise jurídica
2. ✅ **Legibilidade:** Otimizar para leitura longa e confortável
3. ✅ **Engajamento:** Manter leitor até o final do artigo
4. ✅ **Conversão:** CTAs estratégicos que geram leads
5. ✅ **Responsividade:** Experiência perfeita em mobile/tablet/desktop

### KPIs de Sucesso:

- ⏱️ **Tempo de leitura:** Aumentar de 2min → 5min+
- 📈 **Scroll depth:** >70% dos leitores chegam ao final
- 🎯 **CTR do CTA:** >5% de cliques em "Agendar Consulta"
- 📱 **Mobile bounce:** Reduzir <40%

---

## 🏗️ FASE 1: Componente ArticleContent (P0 - CRÍTICO) ✅ CONCLUÍDA

**Objetivo:** Criar componente React dedicado para renderizar conteúdo de artigos

**Data de Conclusão:** 13/11/2025
**Commit:** 2e35c9f

### Tarefas:

- [x] **1.1. Criar ArticleContent.tsx** ✅
  - Localização: `frontend/src/components/blog/ArticleContent.tsx`
  - Props: `{ htmlContent: string }`
  - Parser HTML → React usando `html-react-parser`
  - Customização de todos os elementos (h1-h4, p, ul, ol, a, blockquote, strong, em, code, pre, table, img, hr)

- [x] **1.2. Criar ArticleContent.module.css** ✅
  - Localização: `frontend/src/components/blog/ArticleContent.module.css`
  - Tipografia otimizada (Playfair Display para headings, Inter para body)
  - Paleta Gold (#b46d0c) + Preto (#1a1a1a) consistente
  - Max-width 65ch para legibilidade
  - Responsive breakpoints (mobile-first)
  - Print styles otimizados

- [x] **1.3. Substituir dangerouslySetInnerHTML** ✅
  - Arquivo: `frontend/src/pages/BlogPostAPI.tsx`
  - Trocado `<div dangerouslySetInnerHTML />` por `<ArticleContent htmlContent={summaryData.htmlWithoutSummary} />`
  - Build verificado e funcionando (9.55s)

### Melhorias Implementadas:

- ✅ Instalada biblioteca `html-react-parser` (13 packages)
- ✅ Fontes Google adicionadas ao index.html (Playfair Display + Inter)
- ✅ Todos os elementos HTML customizados com classes CSS modulares
- ✅ Line-height 1.75 para leitura confortável
- ✅ Border-bottom gold nos H2 para hierarquia visual
- ✅ Links com underline offset e hover effects
- ✅ Blockquotes com border-left gold e background sutil
- ✅ Tabelas responsivas com hover states
- ✅ Imagens com lazy loading e border-radius
- ✅ Listas com markers gold (#b46d0c)
- ✅ Código inline e blocos com syntax highlighting ready

### Estrutura do Componente:

```tsx
interface ArticleContentProps {
  content: string;
  title: string;
  readingTime?: number;
}

export function ArticleContent({ content, title, readingTime }: ArticleContentProps) {
  // Parse HTML e transforma em componentes React
  // Aplica estilos customizados
  // Adiciona interatividade (smooth scroll, code highlight, etc.)
}
```

### Design System para Artigos:

```css
/* Tipografia */
.article-h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--foreground);
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.article-h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--foreground);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-p {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--muted-foreground);
  margin-bottom: 1.5rem;
  max-width: 65ch; /* Otimizado para leitura */
}

.article-ul, .article-ol {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.article-li {
  font-size: 1.125rem;
  line-height: 1.8;
  margin-bottom: 0.75rem;
  color: var(--muted-foreground);
}
```

---

## 🎨 FASE 2: Redesign do Resumo Executivo (P0 - CRÍTICO) ✅ CONCLUÍDA

**Objetivo:** Transformar bloco inline em componente React elegante

**Data de Conclusão:** 13/11/2025
**Commit:** 2e35c9f

### Tarefas:

- [x] **2.1. Criar ExecutiveSummary.tsx** ✅
  - Localização: `frontend/src/components/blog/ExecutiveSummary.tsx`
  - Design baseado em cards modernos premium
  - Icons do lucide-react (Clock, Target, BookOpen, TrendingUp)
  - Hover effects com box-shadow gold

- [x] **2.2. Extrair dados do HTML** ✅
  - Função utilitária: `frontend/src/utils/extractExecutiveSummary.ts`
  - Parser usando DOMParser nativo
  - Estrutura TypeScript: `{ readingTime, learningPoints[], result, htmlWithoutSummary }`
  - Remove div `.resumo-executivo` do HTML original automaticamente

- [x] **2.3. Integrar no BlogPostAPI** ✅
  - Renderizado antes do ArticleContent
  - Condicional: só exibe se houver `learningPoints.length > 0`
  - Usa `useMemo` para performance

### Melhorias Implementadas:

- ✅ Card com gradiente Gold/Black (#1a1a1a → #2d2d2d)
- ✅ Header escuro com border gold de 2px
- ✅ Ícone BookOpen no título
- ✅ Meta info (tempo de leitura) em card branco separado
- ✅ Learning points com checkmarks circulares gold
- ✅ Resultado destacado em card preto com borda gold
- ✅ Hover effect que aumenta box-shadow com tom gold
- ✅ Responsive: padding e font-sizes ajustados para mobile
- ✅ Print-ready: cores mantidas com print-color-adjust

### Componente ExecutiveSummary:

```tsx
interface ExecutiveSummaryProps {
  readingTime: number;
  keyPoints: string[];
  outcome: string;
}

export function ExecutiveSummary({ readingTime, keyPoints, outcome }: ExecutiveSummaryProps) {
  return (
    <Card className="mb-8 bg-gradient-to-br from-secondary/30 to-secondary/10 border-l-4 border-primary">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Resumo Executivo</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Tempo de leitura: {readingTime} minutos</span>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">O que você vai aprender:</p>
            <ul className="space-y-2">
              {keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-start gap-2">
              <Target className="h-4 w-4 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">Resultado:</p>
                <p className="text-sm text-muted-foreground">{outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## 📚 FASE 3: Table of Contents Flutuante (P1 - ALTA) ✅ CONCLUÍDA

**Objetivo:** Adicionar navegação rápida entre seções

**Data de Conclusão:** 13/11/2025
**Commit:** adc2e1e

### Tarefas:

- [x] **3.1. Criar TableOfContents.tsx** ✅
  - Extrai todos os H2 e H3 do conteúdo
  - Gera IDs únicos slugificados para cada heading
  - Scroll suave ao clicar com offset de 100px
  - Intersection Observer para detectar seção ativa

- [x] **3.2. Design Desktop** ✅
  - Sticky sidebar à direita (>= 1280px)
  - Highlight da seção atual com border-left gold
  - Background gradient (#fafaf8 → #f5f3ee)
  - Scrollbar customizada (gold)
  - Hover effects com background gold/5

- [x] **3.3. Design Mobile** ✅
  - Botão flutuante fixed (bottom-right) com icon List
  - Drawer deslizante (85% width, max 320px)
  - Overlay escuro com fade-in animation
  - Header preto/gold com botão close
  - Lista scrollável com links ativos destacados

### Melhorias Implementadas:

- ✅ Função utilitária `extractTableOfContents.ts` com slugify automático
- ✅ Função `addIdsToHeadings` para injetar IDs no HTML
- ✅ Layout 2 colunas no BlogPostAPI: `xl:grid-cols-[1fr_280px]`
- ✅ H3 com indentação (margin-left: 1rem) para hierarquia visual
- ✅ Intersection Observer com rootMargin otimizado (-80px top, -80% bottom)
- ✅ TOC renderizado 2x: desktop (hidden xl:block) + mobile (visível sempre)
- ✅ Accessibility: prefers-reduced-motion support
- ✅ Print-ready: TOC oculto em impressão

### Componente TOC:

```tsx
interface TOCItem {
  id: string;
  title: string;
  level: number; // h2, h3
}

export function TableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('');

  return (
    <nav className="sticky top-24 hidden lg:block">
      <p className="text-sm font-semibold mb-4">Neste Artigo</p>
      <ul className="space-y-2 border-l-2 border-border pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "text-sm transition-colors hover:text-primary",
                activeId === item.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

## 🎭 FASE 4: Elementos Visuais Avançados (P1 - ALTA)

**Objetivo:** Enriquecer artigo com componentes interativos

### Tarefas:

- [ ] **4.1. Callout Boxes**
  - Componente para destacar informações importantes
  - Tipos: Info, Warning, Success, Tip
  - Icons do lucide-react

- [ ] **4.2. Checklists Interativos**
  - Checkbox clicável (apenas visual, sem persistência)
  - Animação ao marcar
  - Progress bar mostrando % completado

- [ ] **4.3. Quote Destacado**
  - Design elegante com borda Gold
  - Icon de aspas
  - Autor/fonte se disponível

- [ ] **4.4. Código Syntax Highlight**
  - Para artigos técnicos futuros
  - Biblioteca: Prism.js ou highlight.js
  - Tema dark/light

### Componente Callout:

```tsx
type CalloutType = 'info' | 'warning' | 'success' | 'tip';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const config = {
    info: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
    warning: { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    success: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    tip: { icon: Lightbulb, color: 'text-primary', bg: 'bg-primary/5' },
  }[type];

  const Icon = config.icon;

  return (
    <div className={cn("rounded-lg p-4 my-6", config.bg)}>
      <div className="flex gap-3">
        <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.color)} />
        <div>
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
```

### Componente InteractiveChecklist:

```tsx
interface ChecklistProps {
  items: string[];
}

export function InteractiveChecklist({ items }: ChecklistProps) {
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

  const progress = (checked.size / items.length) * 100;

  return (
    <div className="my-6 p-6 bg-secondary/30 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-primary" />
          Checklist Prático
        </h4>
        <span className="text-sm text-muted-foreground">
          {checked.size}/{items.length}
        </span>
      </div>

      <div className="w-full bg-border rounded-full h-2 mb-4">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <button
              onClick={() => toggleItem(index)}
              className="mt-0.5 flex-shrink-0"
            >
              {checked.has(index) ? (
                <CheckSquare className="h-5 w-5 text-primary" />
              ) : (
                <Square className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            <span className={cn(
              "text-sm",
              checked.has(index) && "line-through text-muted-foreground"
            )}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🚀 FASE 5: Melhorias de Performance e SEO (P1 - ALTA)

**Objetivo:** Otimizar velocidade e indexação

### Tarefas:

- [ ] **5.1. Lazy Load de Imagens**
  - Usar `loading="lazy"` em todas as imagens
  - Placeholder blur enquanto carrega
  - Responsive images com srcset

- [ ] **5.2. Reading Progress Bar**
  - Barra no topo mostrando % de leitura
  - Cor Gold
  - Smooth animation

- [ ] **5.3. Schema.org Article**
  - Verificar se ArticleSchema está correto
  - Adicionar `author`, `publisher`, `datePublished`
  - Testar no Rich Results Test do Google

- [ ] **5.4. Open Graph Tags**
  - Imagem social (1200x630) para cada artigo
  - Title, description otimizados para compartilhamento

### Componente ReadingProgressBar:

```tsx
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollProgress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-border z-50">
      <div
        className="h-full bg-primary transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

---

## 💎 FASE 6: CTAs Estratégicos (P2 - MÉDIA)

**Objetivo:** Converter leitores em leads qualificados

### Tarefas:

- [ ] **6.1. CTA Inline no Meio do Artigo**
  - Após 40% do conteúdo
  - Card destacado "Precisa de Ajuda Jurídica?"
  - Link para /contato

- [ ] **6.2. CTA Sticky no Final**
  - Botão fixo no canto (mobile)
  - "Agendar Consulta" sempre visível
  - Whatsapp direto (opcional)

- [ ] **6.3. Related Articles**
  - 3 artigos relacionados ao final
  - Baseado em tags/categoria
  - Cards com imagem + excerpt

### Componente InlineCTA:

```tsx
export function InlineCTA() {
  return (
    <Card className="my-12 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
      <CardContent className="p-8 text-center">
        <Scale className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-3">
          Precisa de Consultoria Jurídica Estratégica?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Com 12 anos de experiência, ajudo empresários a transformar
          complexidade jurídica em decisões claras e lucrativas.
        </p>
        <Button size="lg" asChild>
          <Link to="/contato">
            <MessageSquare className="mr-2 h-4 w-4" />
            Agendar Diagnóstico Estratégico
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## 📱 FASE 7: Otimizações Mobile (P2 - MÉDIA)

**Objetivo:** Experiência perfeita em dispositivos móveis

### Tarefas:

- [ ] **7.1. Tipografia Responsiva**
  - Font-size menor em mobile
  - Line-height otimizado
  - Margens ajustadas

- [ ] **7.2. Sticky TOC Mobile**
  - Botão "Seções" fixo
  - Drawer que abre do lado
  - Navegação rápida

- [ ] **7.3. Share Buttons**
  - WhatsApp, Twitter, LinkedIn, Email
  - Sticky no scroll (mobile)
  - Native share API quando disponível

---

## 🎯 FASE 8: Analytics e Testes (P3 - BAIXA)

**Objetivo:** Medir impacto das melhorias

### Tarefas:

- [ ] **8.1. Event Tracking**
  - Google Analytics 4
  - Eventos: scroll_depth, cta_click, share, time_on_page
  - Heatmaps (Hotjar/Microsoft Clarity)

- [ ] **8.2. A/B Testing**
  - Testar diferentes CTAs
  - Posição do resumo executivo
  - Cores de destaque

- [ ] **8.3. Feedback Widget**
  - "Este artigo foi útil?" no final
  - Like/Dislike simples
  - Coletar sugestões

---

## 📋 Checklist de Implementação

### Antes de Começar:
- [ ] Backup dos 11 artigos atuais no DB
- [ ] Criar branch `feature/article-ux-v2`
- [ ] Setup de ambiente de dev local

### Durante:
- [ ] Implementar fase por fase
- [ ] Testar com todos os 11 artigos após cada fase
- [ ] Commit incremental (não esperar tudo pronto)
- [ ] Screenshot antes/depois

### Depois:
- [ ] Teste em múltiplos devices (mobile, tablet, desktop)
- [ ] Lighthouse audit (performance, accessibility, SEO)
- [ ] Validar HTML/CSS
- [ ] Deploy em staging primeiro
- [ ] Pedir feedback do cliente

---

## 🎨 Design References

### Inspirações:
1. **Medium.com** - Tipografia e espaçamento
2. **Stripe Blog** - Componentes visuais
3. **Smashing Magazine** - Table of contents
4. **CSS-Tricks** - Code highlights e callouts
5. **JB Advocacia Site Ref** - Manter identidade Gold + Preto

### Fontes Sugeridas:
- **Headings:** Playfair Display (serif clássica, autoridade)
- **Body:** Inter (sans-serif moderna, legível)
- **Monospace:** JetBrains Mono (para códigos futuros)

### Paleta de Cores:
```css
/* Já existente no design system */
--primary: #b46d0c (Gold)
--foreground: #1a1a1a (Preto suave)
--muted-foreground: #737373 (Cinza)
--background: #ffffff (Branco)
--secondary: #f5f5f5 (Cinza muito claro)
```

---

## 🚦 Priorização (MoSCoW)

### Must Have (Fase 1-2):
- ✅ ArticleContent component
- ✅ Redesign do Resumo Executivo
- ✅ Tipografia otimizada
- ✅ Responsividade básica

### Should Have (Fase 3-5):
- ✅ Table of Contents
- ✅ Callouts e Quotes
- ✅ Reading Progress Bar
- ✅ CTAs inline

### Could Have (Fase 6-7):
- ⚡ Checklists interativos
- ⚡ Related articles
- ⚡ Share buttons
- ⚡ Sticky CTA mobile

### Won't Have (Now):
- ❌ Comentários de usuários
- ❌ Sistema de bookmarks
- ❌ Dark mode toggle por artigo
- ❌ Audio narration (text-to-speech)

---

## 📈 Próximos Passos

1. **Revisar roadmap com cliente** ✅
2. **Aprovar design mockups** (Figma opcional)
3. **Iniciar Fase 1** - ArticleContent component
4. **Testar com 1 artigo piloto** antes de aplicar em todos
5. **Iterar baseado em feedback**

---

**Observações Finais:**

- Este roadmap é vivo - ajustar conforme necessário
- Priorizar qualidade sobre velocidade
- Cada fase deve ser deployável independentemente
- Manter compatibilidade com artigos futuros
- Documentar padrões de escrita para novos artigos
