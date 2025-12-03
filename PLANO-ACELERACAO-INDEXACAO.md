# 🚀 Plano de Aceleração de Indexação - Google Search Console

**Projeto:** Jennifer Barreto Advocacia
**URL:** https://jbadvocacia.roilabs.com.br
**Problema:** 12 páginas não indexadas há 5+ dias
**Data:** 2025-01-29
**Baseado em:** Documentação oficial Google Search Central

---

## 📊 Situação Atual

**Google Search Console Status (17/11/2025):**
- ✅ **12 páginas indexadas**
- ❌ **12 páginas não indexadas** (estagnado há 5+ dias)
- ⏱️ **Total:** 24 páginas

**Problema Identificado:**
O processo de indexação está parado. Novas páginas não estão sendo processadas pelo Google.

---

## 🔍 Diagnóstico Completo

### 1. **Por Que Páginas Não São Indexadas?**

Baseado na documentação oficial do Google, páginas podem não ser indexadas por:

#### A. **Problemas Técnicos:**
- ❌ Bloqueadas por `robots.txt` (impede crawling)
- ❌ Tag `noindex` na página (impede indexação)
- ❌ Erro HTTP (404, 500, etc.)
- ❌ Problemas de renderização JavaScript
- ❌ Conteúdo não acessível (shadow DOM, lazy loading extremo)
- ❌ Redirect chains ou loops
- ❌ Canonical apontando para outra URL

#### B. **Problemas de Qualidade:**
- ⚠️ Conteúdo duplicado
- ⚠️ Conteúdo de baixa qualidade
- ⚠️ Conteúdo muito similar a outras páginas
- ⚠️ Thin content (muito pouco texto)

#### C. **Crawl Budget:**
- ⏳ Site novo ou com baixa autoridade
- ⏳ Crawl budget limitado (Google prioriza outras páginas)
- ⏳ Páginas descobertas recentemente (na fila)

#### D. **Status no Search Console:**
- **"Discovered - currently not indexed"** = Descoberta mas ainda não crawled
- **"Crawled - currently not indexed"** = Crawled mas Google decidiu NÃO indexar

---

## ⚡ Ações Imediatas (Fazer HOJE)

### **AÇÃO 1: URL Inspection Tool (MAIS IMPORTANTE)**

Para CADA uma das 12 páginas não indexadas:

1. **Abra o Google Search Console:** https://search.google.com/search-console
2. **Use a ferramenta "URL Inspection"** (inspeção de URL)
3. **Cole a URL completa** da página
4. **Verifique o status atual:**
   - ✅ "URL is on Google" = Está indexada (verificar se saiu da lista)
   - ❌ "URL is not on Google" = Não está indexada

5. **Clique em "TEST LIVE URL"** (testar URL ativa)
   - Isso força o Google a fazer um crawl AGORA
   - Aguarde 1-2 minutos enquanto testa

6. **Analise os resultados:**
   - ✅ **Page is indexable** = Página pode ser indexada
   - ❌ **Page is not indexable** = Problema técnico (veja detalhes)

7. **Se "Page is indexable", clique em "REQUEST INDEXING"**
   - Isso adiciona a página na fila de prioridade
   - Limite: algumas dezenas por dia (quotas)

**IMPORTANTE:**
- Não faça "Request Indexing" múltiplas vezes para a mesma URL (não acelera)
- Priorize páginas mais importantes primeiro
- Aguarde 3-7 dias após o request

---

### **AÇÃO 2: Verificar Sitemap no Search Console**

1. **Abra Search Console → Sitemaps**
2. **Verifique se `sitemap.xml` foi submetido:**
   - URL: https://jbadvocacia.roilabs.com.br/sitemap.xml
3. **Confira o status:**
   - ✅ "Success" = Sitemap processado
   - ❌ "Couldn't fetch" = Erro de acesso
   - ⚠️ "Has errors" = Problemas no XML

4. **Se não foi submetido:**
   - Cole: `https://jbadvocacia.roilabs.com.br/sitemap.xml`
   - Clique em "Submit"

5. **Se já foi submetido, RE-SUBMETA:**
   - Remove o sitemap antigo
   - Submeta novamente para forçar re-crawl

**Como submeter sitemap:**
```
Search Console → Sitemaps → Add a new sitemap
URL: sitemap.xml
Submit
```

---

### **AÇÃO 3: Verificar Coverage Report**

1. **Search Console → Coverage (ou Pages)**
2. **Veja detalhes das 12 páginas não indexadas:**
   - Clique em "Not indexed"
   - Veja as razões específicas:
     - "Discovered - currently not indexed"
     - "Crawled - currently not indexed"
     - "Excluded by 'noindex' tag"
     - "Blocked by robots.txt"
     - "Redirect error"
     - "Soft 404"

3. **Para cada razão, tome ação específica:**

| Razão | O Que Fazer |
|-------|-------------|
| Discovered - not indexed | Request indexing via URL Inspection Tool |
| Crawled - not indexed | Melhorar qualidade do conteúdo, adicionar mais texto |
| Blocked by robots.txt | Remover regra do robots.txt |
| noindex tag | Remover tag noindex da página |
| Soft 404 | Garantir que página retorna 200, não 404 |
| Redirect error | Consertar redirect chains |

---

## 🛠️ Verificações Técnicas (Fazer em 1 Hora)

### **CHECK 1: Robots.txt**

**Verificar se robots.txt NÃO está bloqueando páginas importantes:**

1. **Acesse:** https://jbadvocacia.roilabs.com.br/robots.txt
2. **Confira se tem regras como:**
   ```
   Disallow: /conteudo/
   Disallow: /servicos/
   ```
3. **Se tiver, REMOVA essas regras**

**Configuração ideal:**
```
User-agent: *
Allow: /

# Bloquear apenas APIs e assets
Disallow: /api/
Disallow: /_next/static/
Disallow: /_next/image/

Sitemap: https://jbadvocacia.roilabs.com.br/sitemap.xml
```

**Teste:**
```bash
# Teste se Googlebot pode acessar uma URL específica
# Search Console → robots.txt Tester
# Cole uma das URLs não indexadas e teste
```

---

### **CHECK 2: Status HTTP das 12 Páginas**

**Verificar se todas retornam 200 OK:**

**Método 1: Curl (via terminal):**
```bash
curl -I https://jbadvocacia.roilabs.com.br/conteudo/[slug]
# Deve retornar: HTTP/2 200
```

**Método 2: Browser DevTools:**
1. Abra cada página no Chrome
2. F12 → Network tab
3. Reload (Ctrl+R)
4. Confira status code da página principal

**O que procurar:**
- ✅ **200 OK** = Correto
- ❌ **301/302** = Redirect (Google pode não seguir)
- ❌ **404** = Not Found (página não existe)
- ❌ **500** = Server Error (problema no servidor)

---

### **CHECK 3: Tag Noindex**

**Verificar se páginas NÃO têm `<meta name="robots" content="noindex">`:**

1. **Abra cada página não indexada**
2. **View Source (Ctrl+U)**
3. **Procure por:**
   ```html
   <meta name="robots" content="noindex">
   ```
4. **Se encontrar, REMOVA do código**

**Onde verificar no código:**
- `frontend-next/src/app/layout.tsx`
- `frontend-next/src/app/conteudo/[slug]/page.tsx`
- Metadata em `generateMetadata()`

---

### **CHECK 4: Canonical URLs**

**Verificar se canonical aponta para si mesmo:**

1. **View Source de cada página**
2. **Procure por:**
   ```html
   <link rel="canonical" href="https://jbadvocacia.roilabs.com.br/conteudo/[slug]" />
   ```
3. **Confira se o href aponta para a PRÓPRIA URL**
   - ✅ Correto: canonical = URL atual
   - ❌ Errado: canonical aponta para outra URL

---

### **CHECK 5: Renderização JavaScript**

**Testar se Google consegue renderizar o conteúdo:**

**Método 1: URL Inspection Tool**
1. Inspecione a URL
2. Clique em "View Crawled Page"
3. Veja "Screenshot" e "HTML"
4. Compare com a página real no browser

**Método 2: Rich Results Test**
1. Acesse: https://search.google.com/test/rich-results
2. Cole a URL de uma página não indexada
3. Veja se consegue renderizar o conteúdo
4. Confira se structured data aparece

**Problema comum:**
- Se usa client-side rendering (CSR), Google pode não ver o conteúdo
- Next.js com SSR/SSG deve funcionar bem

---

### **CHECK 6: Core Web Vitals**

**Verificar performance (pode afetar prioridade de indexação):**

1. **Search Console → Core Web Vitals**
2. **Confira se páginas estão em "Good":**
   - ✅ LCP < 2.5s
   - ✅ INP < 200ms
   - ✅ CLS < 0.1

3. **Se houver problemas, use PageSpeed Insights:**
   - https://pagespeed.web.dev/
   - Cole cada URL não indexada
   - Veja recomendações de otimização

**Impacto:**
- Core Web Vitals ruins NÃO impedem indexação
- Mas podem REDUZIR prioridade de crawl

---

## 📈 Métodos de Aceleração (Do Mais ao Menos Efetivo)

### **NÍVEL 1: Mais Efetivo ⚡⚡⚡**

| Método | Tempo | Eficácia | Como Fazer |
|--------|-------|----------|------------|
| **URL Inspection Tool + Request Indexing** | 3-7 dias | 🟢 Alta | Use para cada página não indexada (quota limitada) |
| **Sitemap Re-Submission** | 1-2 semanas | 🟢 Alta | Remove e re-submeta sitemap.xml no Search Console |
| **Internal Linking** | Imediato | 🟢 Alta | Já feito! Related Articles + Homepage links ✅ |

### **NÍVEL 2: Efetivo ⚡⚡**

| Método | Tempo | Eficácia | Como Fazer |
|--------|-------|----------|------------|
| **Adicionar Tag `lastmod` no Sitemap** | 1-2 semanas | 🟡 Média | Adicionar `<lastmod>` com data recente em cada URL do sitemap |
| **Melhorar Qualidade do Conteúdo** | 2-4 semanas | 🟡 Média | Adicionar mais texto, imagens, links externos |
| **Aumentar Autoridade (Backlinks)** | 1-3 meses | 🟡 Média | Conseguir links externos de sites confiáveis |

### **NÍVEL 3: Limitado ⚡**

| Método | Tempo | Eficácia | Como Fazer |
|--------|-------|----------|------------|
| **Indexing API** | N/A | 🔴 Baixa | Não aplicável (apenas JobPosting e BroadcastEvent) |
| **Re-Request Indexing Múltiplas Vezes** | N/A | 🔴 Nula | NÃO funciona (Google ignora) |
| **Mudar Priority/Changefreq no Sitemap** | N/A | 🔴 Nula | Google ignora esses parâmetros |

---

## ✅ Checklist de Ação (Fazer AGORA)

### **Hoje (1-2 horas):**

- [ ] **1. Abrir Google Search Console**
- [ ] **2. Coverage Report → Identificar as 12 URLs não indexadas**
- [ ] **3. Anotar os slugs específicos:**
  ```
  1. /conteudo/[slug-1]
  2. /conteudo/[slug-2]
  ...
  12. /conteudo/[slug-12]
  ```

- [ ] **4. Para CADA URL, usar URL Inspection Tool:**
  - [ ] Test Live URL
  - [ ] Verificar se "Page is indexable"
  - [ ] Request Indexing (se indexable)

- [ ] **5. Verificar Sitemap:**
  - [ ] Status no Search Console
  - [ ] Re-submeter se necessário

- [ ] **6. Verificações Técnicas:**
  - [ ] Robots.txt não bloqueia páginas
  - [ ] Páginas retornam 200 OK
  - [ ] Sem tag noindex
  - [ ] Canonical correto
  - [ ] Renderização JavaScript OK

---

### **Esta Semana (7 dias):**

- [ ] **7. Monitorar Coverage Report diariamente**
  - Ver se alguma página saiu de "Not indexed"

- [ ] **8. Testar Core Web Vitals**
  - PageSpeed Insights em todas as páginas

- [ ] **9. Melhorar conteúdo (se necessário):**
  - Se páginas foram "Crawled - not indexed"
  - Adicionar mais texto (mínimo 500 palavras)
  - Adicionar imagens otimizadas
  - Adicionar links internos e externos

- [ ] **10. Conferir se Structured Data está funcionando:**
  - Rich Results Test em todas as páginas
  - Verificar Article schema

---

### **Próximas 2-4 Semanas:**

- [ ] **11. Backlinks (se possível):**
  - Compartilhar artigos em redes sociais
  - Conseguir menções em outros sites
  - Guest posts em blogs relacionados

- [ ] **12. Atualizar lastmod no Sitemap:**
  - Implementar tag `<lastmod>` dinâmica
  - Atualizar data quando conteúdo muda

- [ ] **13. Adicionar mais internal links:**
  - Criar links de páginas antigas para novas
  - Criar conteúdo "hub" linkando para vários artigos

---

## 🎯 Expectativas Realistas

### **Timeline Oficial do Google:**

> "Crawling can take anywhere from **a few days to a few weeks**."

> "Requesting a recrawl does not guarantee that inclusion in search results will happen **instantly or even at all**."

### **O Que Esperar:**

#### **Cenário Otimista (3-7 dias):**
- ✅ Request Indexing aceito
- ✅ Páginas crawled e indexadas
- ✅ Aparecem no Search Console como indexadas

#### **Cenário Normal (1-3 semanas):**
- ⏳ Sitemap re-crawled
- ⏳ Páginas processadas gradualmente
- ⏳ 50-80% indexadas em 2 semanas

#### **Cenário Lento (3-6 semanas):**
- ⏳ Site novo ou com baixa autoridade
- ⏳ Crawl budget limitado
- ⏳ Google prioriza outras páginas

---

## 🚨 Red Flags (Sinais de Alerta)

### **Se DEPOIS de 4 semanas ainda não indexou:**

Pode indicar problemas sérios:

1. **Conteúdo de baixa qualidade**
   - Google decidiu conscientemente NÃO indexar
   - Solução: Reescrever conteúdo, adicionar valor único

2. **Penalização manual**
   - Search Console → Security & Manual Actions
   - Verificar se há ações manuais

3. **Duplicate content**
   - Conteúdo muito similar a outras páginas
   - Usar ferramentas de plágio (Copyscape, Siteliner)

4. **Problemas técnicos graves**
   - Server timeouts
   - Renderização quebrada
   - JavaScript errors críticos

---

## 📊 Métricas para Monitorar

### **Diariamente (Search Console):**

- **Coverage Report:**
  - Número de páginas indexadas (deve aumentar)
  - Número de páginas "Not indexed" (deve diminuir)

- **URL Inspection Tool:**
  - Status das 12 URLs específicas
  - Data do último crawl

### **Semanalmente:**

- **Performance Report:**
  - Impressões (deve aumentar)
  - Cliques (deve aumentar)
  - CTR médio

- **Sitemaps:**
  - Data da última leitura
  - Erros ou avisos

- **Core Web Vitals:**
  - LCP, INP, CLS
  - URLs com problemas

### **Mensalmente:**

- **Organic Traffic (Google Analytics):**
  - Sessões de busca orgânica
  - Páginas de entrada
  - Bounce rate

---

## 💡 Por Que 5 Dias NÃO é Alarmante

**Contexto importante:**

1. **Google NÃO indexa instantaneamente**
   - Mesmo com sitemap, pode levar dias/semanas
   - Depende de crawl budget e prioridade do site

2. **Site é relativamente novo:**
   - Domínio: roilabs.com.br (não é site antigo)
   - Google pode estar "conhecendo" o site ainda

3. **Já temos 50% indexado (12/24):**
   - Isso é POSITIVO para um site novo
   - Mostra que Google está crawling ativamente

4. **Structured Data foi adicionado recentemente:**
   - Google precisa re-crawl para ver mudanças
   - Pode levar 1-2 semanas para processar

---

## ✅ O Que JÁ Fizemos de CORRETO

| Otimização | Status | Impacto em Indexação |
|------------|--------|----------------------|
| Structured Data (Schema.org) | ✅ Implementado | 🟢 Alto - Google entende conteúdo |
| Internal Linking (Related Articles) | ✅ Implementado | 🟢 Alto - Distribui PageRank |
| Sitemap.xml dinâmico | ✅ Funcionando | 🟢 Alto - Google encontra páginas |
| Meta Tags otimizadas | ✅ Otimizado | 🟡 Médio - Melhora CTR |
| Open Graph completo | ✅ Implementado | 🟡 Médio - Social signals |
| Canonical URLs | ✅ Implementado | 🟢 Alto - Evita duplicação |
| Robots.txt correto | ✅ Configurado | 🟢 Alto - Permite crawling |
| Next.js SSR/SSG | ✅ Implementado | 🟢 Alto - Renderização perfeita |

**Conclusão:** A base técnica está EXCELENTE. Agora é questão de tempo + ações manuais (Request Indexing).

---

## 🎯 Plano de Ação Resumido (TL;DR)

### **HOJE (30 min):**

1. ✅ Search Console → Coverage Report
2. ✅ Identificar as 12 URLs não indexadas
3. ✅ URL Inspection Tool → Request Indexing (para cada uma)
4. ✅ Re-submeter sitemap.xml

### **ESTA SEMANA:**

5. ✅ Monitorar Coverage Report diariamente
6. ✅ Verificar robots.txt, status HTTP, noindex
7. ✅ Testar Rich Results para structured data

### **PRÓXIMAS 2-4 SEMANAS:**

8. ✅ Aguardar indexação (paciência!)
9. ✅ Melhorar conteúdo se necessário
10. ✅ Conseguir backlinks se possível

---

## 🔗 Links Úteis

### **Ferramentas Google:**
- **Search Console:** https://search.google.com/search-console
- **Rich Results Test:** https://search.google.com/test/rich-results
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly

### **Documentação Oficial:**
- **Request Recrawl:** https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- **Sitemap Best Practices:** https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- **JavaScript SEO:** https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- **Robots.txt Guide:** https://developers.google.com/search/docs/crawling-indexing/robots/intro
- **Crawl Budget:** https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget

### **Debugging Tools:**
- **Schema Validator:** https://validator.schema.org/
- **robots.txt Tester:** Search Console → robots.txt Tester
- **Siteliner (duplicate content):** https://www.siteliner.com/

---

## ⚠️ O Que NÃO Fazer

❌ **NÃO** requerer indexação múltiplas vezes (não acelera)
❌ **NÃO** submeter sitemap repetidamente todos os dias
❌ **NÃO** usar Indexing API (não funciona para blog posts)
❌ **NÃO** adicionar priority/changefreq no sitemap (Google ignora)
❌ **NÃO** fazer spam de backlinks de baixa qualidade
❌ **NÃO** entrar em pânico antes de 4 semanas

---

## 🎉 Conclusão

**Status:** 5 dias sem indexação é NORMAL para um site novo.

**Ações prioritárias:**
1. ✅ Request Indexing via URL Inspection Tool
2. ✅ Re-submeter sitemap
3. ✅ Aguardar 2-4 semanas
4. ✅ Monitorar diariamente

**Expectativa realista:**
- 50-80% das páginas indexadas em 2-3 semanas
- 100% em 4-6 semanas (se não houver problemas técnicos)

**Próxima verificação:** 2025-02-05 (1 semana após ações)

---

**Criado por:** Claude Code
**Baseado em:** Google Search Central Documentation
**Revisão:** v1.0
**Próxima atualização:** Após implementar ações e aguardar 1 semana
