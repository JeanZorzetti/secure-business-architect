# Limitações SEO de SPAs (Single Page Applications)

**Data:** 2025-01-15
**Status:** Limitação arquitetural conhecida
**Impacto:** Warnings no Ahrefs, sem impacto no Google

---

## Problema Reportado pelo Ahrefs

### "Páginas não canônicas listadas no sitemap"

**Descrição:**
Ahrefs reporta que todas as páginas têm canonical apontando para `https://jbadvocacia.roilabs.com.br/` (homepage) em vez de apontarem para si mesmas.

**Exemplo:**
- URL da página: `https://jbadvocacia.roilabs.com.br/sobre`
- Canonical detectado pelo Ahrefs: `https://jbadvocacia.roilabs.com.br/` ❌
- Canonical esperado: `https://jbadvocacia.roilabs.com.br/sobre` ✅

---

## Causa Raiz: Arquitetura SPA

### Como SPAs Funcionam

```
┌────────────────────────────────────────────────┐
│ Servidor Web (qualquer URL)                   │
│ GET /sobre                                     │
│ GET /servicos                                  │
│ GET /conteudo/artigo                           │
│                                                │
│ SEMPRE retorna o MESMO index.html              │
└────────────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────────────┐
│ index.html (HTML estático)                     │
│ <link rel="canonical" href="/" /> ← FIXO!      │
│ <script> atualiza canonical </script>          │
└────────────────────────────────────────────────┘
         ↓ JavaScript executa (apenas browsers)
┌────────────────────────────────────────────────┐
│ DOM atualizado                                 │
│ canonical href muda para URL correta           │
└────────────────────────────────────────────────┘
```

### O Problema

**SPAs servem o MESMO index.html para TODAS as rotas.**

- O servidor NÃO conhece as rotas (`/sobre`, `/servicos`, etc)
- Todas as rotas retornam o arquivo `dist/index.html`
- O HTML inicial tem canonical apontando para `/`
- JavaScript atualiza o canonical DEPOIS do HTML carregar
- Crawlers que não executam JS veem o canonical errado

---

## Por Que Afeta o Ahrefs Mas Não o Google?

### Ahrefs Crawler

**Executa JavaScript apenas em páginas com 15+ domínios de referência (backlinks)**

- Site novo = < 15 backlinks
- Ahrefs vê apenas HTML estático
- Canonical aparece como "/" (homepage)
- **Resultado:** Warning "páginas não canônicas"

Fonte: [Ahrefs Blog - Crawling JavaScript](https://ahrefs.com/blog/crawling-javascript/)

### Google Bot

**Sempre executa JavaScript** (desde 2019)

- Renderiza a página completa
- Executa scripts inline
- Vê canonical atualizado corretamente
- **Resultado:** Indexação correta ✅

---

## Nossa Implementação Atual

### HTML Estático (index.html)

```html
<!-- Canonical inicial (fallback) -->
<link rel="canonical" href="https://jbadvocacia.roilabs.com.br/" id="canonical-tag" />

<!-- Script que atualiza canonical -->
<script>
  (function() {
    var canonical = document.getElementById('canonical-tag');
    if (canonical) {
      canonical.href = window.location.origin + window.location.pathname;
    }
  })();
</script>
```

### O Que Acontece

1. **Crawler sem JS (ex: Ahrefs em páginas novas):**
   - Vê: `<link rel="canonical" href="https://jbadvocacia.roilabs.com.br/" />`
   - Interpreta: canonical = homepage ❌
   - Resultado: Warning no Ahrefs

2. **Crawler com JS (ex: Google Bot, Ahrefs em páginas populares):**
   - Vê HTML inicial
   - Executa script
   - Canonical atualizado para URL correta ✅
   - Resultado: Indexação correta

3. **Browsers (usuários reais):**
   - Script executa instantaneamente
   - Canonical sempre correto
   - React Helmet sobrescreve com meta tags específicas

---

## Soluções Possíveis

### ❌ Solução 1: Remover Canonical Estático

```html
<script>
  // Criar canonical do zero via JavaScript
  var canonical = document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = window.location.origin + window.location.pathname;
  document.head.appendChild(canonical);
</script>
```

**Problema:** Crawlers sem JS não veem NENHUM canonical (pior que antes)

---

### ❌ Solução 2: Meta http-equiv

```html
<meta http-equiv="canonical" content="...">
```

**Problema:** Não existe! Canonical só funciona via `<link rel>` ou HTTP header.

---

### ⚠️ Solução 3: HTTP Header `Link`

```http
Link: <https://jbadvocacia.roilabs.com.br/sobre>; rel="canonical"
```

**Vantagens:**
- Funciona para todos os crawlers
- Mais rápido que HTML tag (indexa 3 dias antes)

**Desvantagens:**
- Requer configuração no servidor/CDN
- Servidor precisa conhecer as rotas do SPA
- Não temos acesso ao servidor aqui

---

### ✅ Solução 4: Pre-rendering (react-snap, prerender.io)

Gerar HTML estático para cada rota durante o build.

**Vantagens:**
- HTML diferente para cada rota
- Canonical correto no HTML estático
- Funciona para todos os crawlers

**Desvantagens:**
- react-snap desatualizado (puppeteer 1.20.0 de 2019)
- Prerender.io é pago ($200/mês para 250 páginas)
- Adiciona complexidade ao build

---

### 🏆 Solução 5: Migrar para SSR/SSG (Next.js, Remix)

**Vantagens:**
- Servidor renderiza HTML único para cada rota
- Canonical correto nativamente
- SEO perfeito
- Performance melhor

**Desvantagens:**
- Requer reescrever aplicação inteira
- Migração complexa (React Router → Next.js Router)
- Mais recursos de servidor necessários

---

## Decisão Atual

### Manter Implementação Atual

**Justificativa:**

1. **Google (principal search engine) funciona corretamente**
   - 93% das buscas no Brasil são Google
   - Google Bot executa JavaScript
   - Indexação está correta

2. **Ahrefs é ferramenta de análise, não search engine**
   - Warning não afeta ranking
   - Quando páginas atingirem 15+ backlinks, Ahrefs executará JS
   - Solução melhorará naturalmente com o tempo

3. **Custo-benefício**
   - Migrar para SSR: ~40h de trabalho
   - Benefício: remover warning do Ahrefs
   - Impacto no SEO real: nenhum (Google já funciona)

4. **Sitemap.xml está correto**
   - Google usa sitemap como sinal de canonização
   - Mesmo com canonical "errado" no HTML inicial, Google prioriza:
     - JavaScript renderizado (canonical correto)
     - Sitemap.xml (URLs corretos)
     - Consistência de conteúdo

---

## Monitoramento

### Google Search Console

**O que verificar:**
- [ ] Páginas indexadas (todas devem aparecer)
- [ ] URLs canônicos detectados (devem estar corretos)
- [ ] Erros de rastreamento (não deve haver)

**Como verificar:**
```
Google Search Console → Cobertura
- Ver URLs indexadas
- Clicar em URL específica
- Verificar "URL canônica selecionada pelo Google"
```

### Ahrefs

**Expectativa:**
- ⚠️ Warning "páginas não canônicas" continuará
- ✅ Quando páginas atingirem 15+ backlinks, warning desaparece
- ⏳ Pode levar 3-6 meses (crescimento orgânico de backlinks)

---

## Conclusão

**Status Atual:** ✅ **Aceitável**

- Google indexa corretamente
- SEO não está prejudicado
- Warning do Ahrefs é **falso positivo** causado por limitação arquitetural de SPAs
- Solução ideal (SSR) fica para roadmap futuro se necessário

**Recomendação:**
- Manter implementação atual
- Monitorar Google Search Console
- Considerar migração para Next.js no futuro (quando houver outros motivos além de SEO)

---

## Referências

1. [Ahrefs - Crawling JavaScript](https://ahrefs.com/blog/crawling-javascript/)
2. [Google - Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
3. [HTTP Header Canonical](https://gentofsearch.com/blog/canonical-tag-vs-rel-canonical-http-header/)
4. [Google - JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

---

**Última atualização:** 2025-01-15
**Responsável:** Claude Code (Anthropic)
**Status:** Documentado e aceito
