# ✅ CHECKLIST - Aceleração de Indexação (FAZER HOJE)

**Tempo estimado:** 30-60 minutos
**Objetivo:** Forçar Google a indexar as 12 páginas pendentes

---

## 📋 PARTE 1: Identificar URLs Não Indexadas (10 min)

### ☐ 1. Acessar Google Search Console
**Link:** https://search.google.com/search-console

- [ ] Fazer login com conta do Google
- [ ] Selecionar propriedade: `jbadvocacia.roilabs.com.br`

### ☐ 2. Abrir Coverage Report (ou Pages)
**Caminho:** Menu lateral → Pages (ou Coverage)

- [ ] Clicar em "Pages" no menu lateral
- [ ] Ver gráfico com páginas indexadas vs. não indexadas
- [ ] Anotar números:
  - ✅ Indexadas: ______ páginas
  - ❌ Não indexadas: ______ páginas

### ☐ 3. Listar URLs Não Indexadas
**Ação:** Clicar em "Not indexed" no gráfico

- [ ] Ver lista de URLs não indexadas
- [ ] Anotar os motivos (status):
  - [ ] "Discovered - currently not indexed"
  - [ ] "Crawled - currently not indexed"
  - [ ] "Blocked by robots.txt"
  - [ ] "Excluded by 'noindex' tag"
  - [ ] Outro: ____________________

- [ ] Copiar lista de URLs para um arquivo de texto

**Exemplo de lista:**
```
https://jbadvocacia.roilabs.com.br/conteudo/slug-1
https://jbadvocacia.roilabs.com.br/conteudo/slug-2
...
```

---

## 🔧 PARTE 2: Request Indexing (20-30 min)

### ☐ 4. Para CADA URL não indexada:

**Ferramenta:** URL Inspection Tool
**Localização:** Barra de busca no topo do Search Console

#### Para cada URL, fazer:

**a) Inspecionar URL:**
- [ ] Colar URL completa na barra de busca
- [ ] Pressionar Enter
- [ ] Aguardar resultado (5-10 segundos)

**b) Verificar Status Atual:**
- [ ] Ver status:
  - ✅ "URL is on Google" → Já indexou! Pular para próxima URL
  - ❌ "URL is not on Google" → Continuar

**c) Test Live URL:**
- [ ] Clicar em botão "TEST LIVE URL" (canto superior direito)
- [ ] Aguardar 1-2 minutos enquanto Google testa
- [ ] Ver resultado:
  - ✅ "Page is indexable" → Continuar
  - ❌ "Page is not indexable" → Anotar problema e pular

**d) Request Indexing:**
- [ ] Se "Page is indexable", clicar em "REQUEST INDEXING"
- [ ] Aguardar confirmação (30-60 segundos)
- [ ] Ver mensagem: "Indexing requested"

**e) Anotar:**
```
URL: _______________________________________
Status: [ ] Indexable  [ ] Not Indexable
Requested: [ ] Sim  [ ] Não
Problema (se houver): ______________________
```

**IMPORTANTE:**
- ⚠️ Limite de quotas: ~10-20 URLs por dia
- ⚠️ Não requerer mesma URL múltiplas vezes
- ⚠️ Priorize URLs mais importantes primeiro

---

## 🗺️ PARTE 3: Verificar Sitemap (5 min)

### ☐ 5. Abrir Sitemaps Report
**Caminho:** Menu lateral → Sitemaps

- [ ] Ver lista de sitemaps submetidos
- [ ] Verificar se `sitemap.xml` está na lista

### ☐ 6. Verificar Status do Sitemap
**Sitemap:** https://jbadvocacia.roilabs.com.br/sitemap.xml

- [ ] Ver status:
  - ✅ "Success" → Tudo OK
  - ❌ "Couldn't fetch" → Problema de acesso
  - ⚠️ "Has errors" → Erros no XML

- [ ] Anotar:
  - Data da última leitura: ____________
  - URLs descobertas: ______
  - Status: _________________

### ☐ 7. Re-submeter Sitemap (OPCIONAL)
**Se sitemap tem mais de 7 dias:**

- [ ] Clicar em sitemap.xml na lista
- [ ] Clicar em "REMOVE SITEMAP"
- [ ] Confirmar remoção
- [ ] Adicionar novamente:
  - Campo: `sitemap.xml`
  - Clicar "SUBMIT"

**Objetivo:** Forçar Google a re-crawl do sitemap

---

## 🔍 PARTE 4: Verificações Técnicas (15 min)

### ☐ 8. Verificar Robots.txt

**URL:** https://jbadvocacia.roilabs.com.br/robots.txt

- [ ] Abrir URL no navegador
- [ ] Verificar se NÃO tem estas linhas:
  ```
  Disallow: /conteudo/
  Disallow: /servicos/
  Disallow: /sobre/
  ```
- [ ] Verificar se TEM sitemap:
  ```
  Sitemap: https://jbadvocacia.roilabs.com.br/sitemap.xml
  ```

**Status:** [ ] OK  [ ] Problema encontrado

---

### ☐ 9. Testar Status HTTP (via script)

**No terminal:**
```bash
cd C:\Users\jeanz\Downloads\secure-business-architect-main
node scripts/verificar-status-http.js
```

- [ ] Executar script
- [ ] Ver relatório
- [ ] Verificar se todas retornam 200 OK
- [ ] Anotar problemas (se houver)

**Resultado:**
- ✅ Sucesso (200): ______ URLs
- ❌ Erros: ______ URLs
- 🔄 Redirects: ______ URLs

---

### ☐ 10. Verificar Structured Data

**Ferramenta:** Rich Results Test
**Link:** https://search.google.com/test/rich-results

**Para 2-3 páginas não indexadas:**
- [ ] Colar URL no Rich Results Test
- [ ] Clicar "TEST URL"
- [ ] Aguardar resultado
- [ ] Verificar:
  - ✅ "Article" schema detectado
  - ✅ "BreadcrumbList" schema detectado
  - ✅ "Organization" schema detectado
  - ❌ Erros ou avisos

**Status:** [ ] OK  [ ] Problemas encontrados

---

### ☐ 11. Verificar Core Web Vitals (OPCIONAL)

**Caminho:** Search Console → Core Web Vitals

- [ ] Ver relatório de Desktop
- [ ] Ver relatório de Mobile
- [ ] Anotar:
  - URLs "Good": ______
  - URLs "Needs Improvement": ______
  - URLs "Poor": ______

**Se houver problemas:**
- [ ] Usar PageSpeed Insights: https://pagespeed.web.dev/
- [ ] Testar URLs problemáticas
- [ ] Anotar recomendações

---

## 📊 PARTE 5: Documentar Resultados (5 min)

### ☐ 12. Criar Relatório

**Copiar template abaixo e preencher:**

```
==============================================
RELATÓRIO - ACELERAÇÃO DE INDEXAÇÃO
Data: _______________
==============================================

ANTES:
- Páginas indexadas: ______
- Páginas não indexadas: ______
- Total: ______

AÇÕES REALIZADAS:
- [ ] Request Indexing: ______ URLs
- [ ] Re-submetido sitemap: [ ] Sim [ ] Não
- [ ] Verificado robots.txt: [ ] OK [ ] Problema
- [ ] Verificado status HTTP: [ ] OK [ ] Problema
- [ ] Verificado structured data: [ ] OK [ ] Problema

PROBLEMAS ENCONTRADOS:
1. ________________________________________
2. ________________________________________
3. ________________________________________

PRÓXIMA VERIFICAÇÃO:
Data: _______________ (7 dias depois)
```

---

## ⏰ PARTE 6: Agendar Próximas Verificações

### ☐ 13. Monitoramento Diário (1 min/dia)
**Por 7 dias:**

- [ ] Dia 1 (hoje): Request Indexing feito
- [ ] Dia 2: Verificar Coverage Report
- [ ] Dia 3: Verificar Coverage Report
- [ ] Dia 4: Verificar Coverage Report
- [ ] Dia 5: Verificar Coverage Report
- [ ] Dia 6: Verificar Coverage Report
- [ ] Dia 7: Análise completa

**O que verificar:**
- Número de páginas indexadas aumentou?
- Número de páginas não indexadas diminuiu?
- Últimas datas de crawl mudaram?

---

### ☐ 14. Análise Completa (Dia 7)

**Search Console → Coverage Report:**
- [ ] Ver quantas das 12 URLs foram indexadas
- [ ] Calcular taxa de sucesso: ______%
- [ ] Se <50% indexadas, repetir Request Indexing

**Search Console → Performance:**
- [ ] Verificar se impressões aumentaram
- [ ] Verificar se cliques aumentaram
- [ ] Comparar com semana anterior

---

## 🎯 Expectativas Realistas

### Timeline:
- **3-7 dias:** Primeiras páginas indexadas
- **1-2 semanas:** 50-70% indexadas
- **3-4 semanas:** 80-100% indexadas

### Se depois de 4 semanas ainda não indexou:
- [ ] Verificar se páginas têm conteúdo único (mínimo 500 palavras)
- [ ] Verificar se não há duplicate content
- [ ] Verificar se não há penalizações manuais
- [ ] Considerar reescrever conteúdo

---

## ✅ RESUMO - O Que Foi Feito

Após completar este checklist, você terá:

✅ Identificado exatamente quais páginas não estão indexadas
✅ Solicitado indexação manual via URL Inspection Tool
✅ Re-submetido sitemap (se necessário)
✅ Verificado que não há bloqueios técnicos (robots.txt, noindex, status HTTP)
✅ Confirmado que structured data está funcionando
✅ Documentado todo o processo

---

## 🚨 Se Encontrou Problemas

### Robots.txt bloqueando páginas:
```bash
# Editar: frontend-next/public/robots.txt
# Remover linhas Disallow que bloqueiam conteúdo importante
```

### Páginas retornando 404:
```bash
# Verificar se slug está correto
# Verificar se post está PUBLISHED no banco
# Verificar logs do servidor
```

### Tag noindex detectada:
```bash
# Buscar no código: <meta name="robots" content="noindex">
# Remover de: layout.tsx ou page.tsx
```

### Structured data com erros:
```bash
# Verificar: src/lib/structured-data.ts
# Testar no Schema Validator: https://validator.schema.org/
```

---

## 📞 Próximos Passos

**Hoje:**
- ✅ Completar este checklist (30-60 min)

**Próximos 7 dias:**
- ✅ Monitorar Coverage Report diariamente (1 min/dia)

**Dia 7:**
- ✅ Análise completa de resultados
- ✅ Decidir se precisa repetir ações

**Depois de 4 semanas:**
- ✅ Se ainda houver problemas, investigar qualidade do conteúdo
- ✅ Considerar conseguir backlinks externos

---

**Documento criado:** 2025-01-29
**Baseado em:** Google Search Central Best Practices
**Referência:** Ver PLANO-ACELERACAO-INDEXACAO.md para detalhes técnicos
