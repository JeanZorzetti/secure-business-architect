# Roadmap SEO 2025: Dominando a Busca Orgânica

**Data de Criação:** 26/11/2025
**Status:** 🟡 Planejamento
**Objetivo:** Implementar as melhores práticas de SEO de 2025 (baseado no modelo "Late 2025"), focar em **AI Overviews (SGE)**, **E-E-A-T** e corrigir lacunas estruturais críticas do projeto.

---

## 📊 Diagnóstico Atual (26/11/2025)

### ✅ Pontos Fortes (Já Implementados)
- **Infraestrutura Next.js:** Renderização rápida e SEO-friendly.
- **Metadados Básicos:** Títulos, descrições e OpenGraph configurados corretamente.
- **Blog Otimizado:** `ArticleSchema`, `BreadcrumbSchema`, conteúdo rico e URLs amigáveis.
- **Sitemap & Robots:** Configuração dinâmica e correta.

### ❌ Lacunas Críticas (O que falta)
1.  **Arquitetura de Serviços:** Faltam páginas individuais (`/servicos/[slug]`).
2.  **Schema Específico:** Falta `ServiceSchema` detalhado e `ReviewSchema`.
3.  **Otimização SGE:** Conteúdo precisa de ajustes para "Direct Answers".
4.  **Core Web Vitals:** Necessário validar INP (Interaction to Next Paint).

---

## 🚀 Plano de Ação

### 🟥 Fase 1: Fundação Técnica & Arquitetura (P0) - Imediato
*O alicerce necessário para rankear e indexar corretamente.*

- [x] **1. Criar Páginas de Serviços Individuais (`/servicos/[slug]`)**
    -   **Ação:** Migrar o conteúdo da lista de serviços para páginas dedicadas.
    -   **URLs Alvo:** `/servicos/contratos-empresariais`, `/servicos/due-diligence`, etc.
    -   **Motivo:** Rankear para palavras-chave de cauda longa e alta intenção.

- [x] **2. Implementar `ServiceSchema` Detalhado**
    -   **Ação:** Injetar JSON-LD específico em cada nova página de serviço.
    -   **Campos:** `serviceType`, `provider`, `areaServed`, `hasOfferCatalog`.

- [x] **3. Core Web Vitals & INP (Interaction to Next Paint)**
    -   **Meta:** INP < 200ms.
    -   **Ação:** Verificar scripts de terceiros e otimizar carregamento de componentes interativos.
    -   **Ação:** Validar LCP (Largest Contentful Paint) na imagem Hero (usar `fetchPriority="high"`).

### 🟨 Fase 2: Estratégia de Conteúdo & AI Overviews (P1)
*Otimizando para ser a resposta da Inteligência Artificial.*

- [x] **1. Otimização para AI Overviews (SGE)**
    -   **Tática "Direct Answer":** O primeiro parágrafo após um H2 deve responder à pergunta do título em 2-3 frases (estilo dicionário).
    -   **Tática "Listicle":** Usar listas (`<ul>`, `<ol>`) para processos e benefícios (a IA prefere dados estruturados).
    -   **Estrutura de Perguntas:** Usar H2/H3 como perguntas reais (ex: "O que é Due Diligence?" vs "Definição").

- [ ] **2. E-E-A-T: O Fator "Experiência"**
    -   **Autoridade:** Garantir que a bio de Jennifer Barreto esteja visível e linkada em todos os posts.
    -   **Mídia Original:** Substituir fotos de banco de imagens genéricas por fotos reais do escritório ou da advogada atuando (onde possível), para sinalizar autenticidade ao Google.

- [x] **3. Prova Social Verificável**
    -   **Seção de Avaliações:** Adicionar `ReviewSchema` ou `AggregateRating` nas páginas de serviço.
    -   **Depoimentos Reais:** Incluir depoimentos específicos para cada serviço (não apenas genéricos na home).

### 🟦 Fase 3: Autoridade e Linkagem (P2)
*Consolidando a liderança tópica.*

- [ ] **1. Topic Clusters (Teia de Aranha)**
    -   **Ação:** Linkar artigos do blog ("Satélites") para as novas páginas de serviço ("Pilar").
    -   **Exemplo:** Artigo sobre riscos contratuais linka para `/servicos/gestao-contratos`.

- [ ] **2. Backlinks & Parcerias**
    -   **Ação:** Identificar oportunidades de guest posts em portais de negócios ou contabilidade.

---

## � Fase 4: Futuro (2026+)
- [ ] **Busca por Vídeo:** Criar vídeos curtos respondendo dúvidas jurídicas comuns e embedar nos artigos.
- [ ] **Busca Visual:** Otimizar Alt-Text descrevendo o contexto da imagem para o Google Lens.

---

## 📝 Resumo do Plano Imediato
1.  [ ] Criar páginas de serviços individuais (Prioridade Máxima).
2.  [ ] Implementar Schema de Serviços.
3.  [ ] Revisar conteúdo para formato "Direct Answer" (SGE).
