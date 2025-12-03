const { Pool } = require('pg');
const crypto = require('crypto');

// Direct connection string
const DATABASE_URL = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';
const pool = new Pool({ connectionString: DATABASE_URL });

// Generate UUID v4
function generateUUID() {
  return crypto.randomUUID();
}

const BASE_URL = 'https://jbadvocacia.roilabs.com.br';
const UPLOADS_PATH = '/uploads/images';

// Artigo 1: Venda de Empresas - Due Diligence
const article1 = {
  title: 'Venda de Empresas: Due Diligence Essencial para Não Perder Milhões',
  slug: 'venda-empresas-due-diligence-essencial',
  excerpt: 'Due diligence na venda de empresas: evite prejuízos milionários, identifique passivos ocultos e negocie com segurança. Guia completo com checklist 2025.',
  category: 'Fusões e Aquisições (M&A)',
  tags: ['venda de empresa', 'due diligence', 'M&A', 'valuation', 'auditoria jurídica'],
  author: 'Jennifer Barreto',
  coverImage: `${BASE_URL}${UPLOADS_PATH}/venda-empresas-due-diligence-cover.jpg`,
  status: 'PUBLISHED',
  content: `# Venda de Empresas: Due Diligence Essencial para Não Perder Milhões

## Introdução: O Erro de R$ 5 Milhões

Em 2024, uma empresa de tecnologia de Porto Alegre vendeu suas operações por R$ 12 milhões. Seis meses depois, o comprador descobriu passivos trabalhistas não declarados de R$ 5 milhões e moveu ação de redibição.

O vendedor foi obrigado a devolver R$ 5 milhões do valor recebido.

O erro? **Não fazer due diligence adequada antes da negociação.**

Due diligence (auditoria prévia) não é apenas uma formalidade burocrática. É a diferença entre uma venda bem-sucedida e um pesadelo jurídico que pode durar anos.

Segundo dados da KPMG, **67% das transações de M&A no Brasil apresentam ajustes de preço pós-fechamento** devido a passivos descobertos tardiamente. A média de redução é de 18% do valor inicial.

Se você está pensando em vender sua empresa, este guia vai te mostrar exatamente o que fazer (e o que evitar) para proteger seu patrimônio.

![Infográfico estatísticas M&A Brasil](${BASE_URL}${UPLOADS_PATH}/infografico-estatisticas-ma-brasil.png)

---

## O Que É Due Diligence e Por Que É Crítica?

### Definição Técnica

Due diligence é o processo de **auditoria completa** de todos os aspectos legais, financeiros, operacionais e comerciais de uma empresa antes de uma transação de compra e venda.

Em termos práticos, é como fazer um "check-up completo" da sua empresa antes de colocá-la à venda.

### Por Que Fazer ANTES de Colocar no Mercado?

A maioria dos empreendedores comete um erro fatal: **espera o comprador fazer a due diligence**.

O problema é que, quando o comprador descobre problemas, você perde poder de negociação:

**Cenário 1 (Sem due diligence prévia):**
- Você pede R$ 10 milhões
- Comprador faz auditoria e encontra passivos de R$ 2 milhões
- Comprador oferece R$ 7 milhões (desconto de 30%)
- Você não tem argumento para contra-argumentar

**Cenário 2 (Com due diligence prévia):**
- Você faz auditoria antecipada e descobre os mesmos R$ 2 milhões em passivos
- Você **resolve os problemas** antes de colocar à venda
- Você pede R$ 10 milhões com documentação limpa
- Comprador faz auditoria e não encontra surpresas
- Negociação fecha em R$ 10 milhões

**Diferença:** R$ 3 milhões no seu bolso.

---

## As 7 Áreas Críticas da Due Diligence

![Diagrama áreas de due diligence](${BASE_URL}${UPLOADS_PATH}/diagrama-areas-due-diligence.png)

### 1. Due Diligence Jurídica (Legal)

**O que analisar:**

#### a) Constituição da Empresa
- ✅ Contrato social atualizado e registrado
- ✅ Atas de assembleia arquivadas na Junta Comercial
- ✅ Quadro societário regularizado
- ✅ Alterações contratuais devidamente registradas

**Red flag:** Empresa com contrato social desatualizado há mais de 5 anos.

#### b) Propriedade Intelectual
- ✅ Marcas registradas no INPI
- ✅ Patentes (se aplicável)
- ✅ Software proprietário com código-fonte protegido
- ✅ Contratos de cessão de direitos autorais

**Saiba mais:** [Como Proteger Sua Marca: Registro no INPI](${BASE_URL}/conteudo/registro-marca-inpi-importancia)

#### c) Contratos Vigentes
- ✅ Contratos com fornecedores (prazo, condições, rescisão)
- ✅ Contratos com clientes (renovação automática? Exclusividade?)
- ✅ Contratos de locação (imóveis, equipamentos)
- ✅ Contratos de licenciamento (software, franquia)

**Red flag:** Contratos verbais ou sem cláusula de sucessão em caso de venda.

#### d) Litígios e Processos
- ✅ Processos trabalhistas (ações ativas e provisionadas)
- ✅ Processos cíveis (fornecedores, clientes, concorrentes)
- ✅ Processos tributários (fiscalização, auto de infração)
- ✅ Processos ambientais (multas, TAC, licenças)

**Estatística crítica:** 82% das empresas brasileiras têm pelo menos 1 processo trabalhista ativo (fonte: TST, 2024).

---

### 2. Due Diligence Trabalhista

**O que analisar:**

#### a) Folha de Pagamento
- ✅ Todos os funcionários formalizados (CLT ou PJ regular)
- ✅ Horas extras pagas corretamente
- ✅ Adicional noturno, periculosidade, insalubridade
- ✅ Férias e 13º em dia

**Red flag:** Empresa com mais de 10% de funcionários "PJ" fazendo atividade-fim.

#### b) Passivos Trabalhistas
- ✅ Cálculo de contingências trabalhistas (provisões)
- ✅ Acordos trabalhistas homologados
- ✅ Reclamatórias em andamento (valor estimado)

**Fórmula de cálculo:**
\`\`\`
Passivo Trabalhista Estimado =
  (Nº de funcionários × média salarial × 0,8 × 12 meses) × 30%
\`\`\`

**Exemplo:**
- 50 funcionários
- Salário médio: R$ 3.000
- Provisão: 50 × 3.000 × 0,8 × 12 × 0,3 = **R$ 432.000**

**Saiba mais:** [Como Prevenir Passivos Trabalhistas](${BASE_URL}/conteudo/passivos-trabalhistas-prevencao)

---

### 3. Due Diligence Tributária

**O que analisar:**

#### a) Regularidade Fiscal
- ✅ Certidões negativas (federal, estadual, municipal)
- ✅ FGTS em dia (CRF)
- ✅ INSS regularizado
- ✅ ICMS, ISS, PIS/COFINS em dia

**Red flag:** Qualquer certidão positiva com efeito de negativa.

#### b) Tributos em Aberto
- ✅ Parcelamentos em andamento (valor residual?)
- ✅ Auto de infração (fase administrativa ou judicial?)
- ✅ Depósitos judiciais (valor recuperável?)

**Impacto no preço:**
Dívida tributária de R$ 1 milhão pode reduzir o valuation em até R$ 2-3 milhões (devido ao risco de multa e juros).

![Tabela benchmarks valuation por setor](${BASE_URL}${UPLOADS_PATH}/tabela-valuation-setores-2025.png)

---

## Quanto Custa Fazer Due Diligence?

### Investimento Médio (Brasil, 2025)

| Porte da Empresa | Faturamento Anual | Custo Due Diligence | % do Valor da Venda |
|------------------|-------------------|---------------------|---------------------|
| **Micro** | Até R$ 360k | R$ 15.000 - R$ 30.000 | 5-10% |
| **Pequena** | R$ 360k - R$ 4,8M | R$ 30.000 - R$ 80.000 | 3-6% |
| **Média** | R$ 4,8M - R$ 20M | R$ 80.000 - R$ 200.000 | 2-4% |
| **Grande** | >R$ 20M | R$ 200.000 - R$ 500.000 | 1-3% |

**ROI esperado:** Para cada R$ 1 investido em due diligence, você protege entre R$ 5 e R$ 15 do valor da venda.

---

## Erros Comuns que Custam Caro

### Erro #1: "Minha Empresa É Pequena, Não Preciso Disso"

**Realidade:** Empresas pequenas têm **mais** informalidades, logo **mais** riscos ocultos.

### Erro #2: Esconder Problemas do Comprador

**Realidade:** Comprador **sempre** descobre. E quando descobre, você perde poder de negociação (ou enfrenta processo).

**Solução:** Seja transparente. Documente tudo. Ajuste o preço se necessário, mas não esconda.

### Erro #3: Não Regularizar Passivos Antes da Venda

**Exemplo:** Passivo trabalhista de R$ 200k pode reduzir o valor da empresa em R$ 500k (devido ao risco percebido pelo comprador).

**Solução:** Regularize **antes**. Negocie acordos trabalhistas. Pague dívidas pequenas.

**Saiba mais:** [Como Estruturar Contratos Empresariais](${BASE_URL}/conteudo/contratos-empresariais-clausulas-essenciais)

---

## FAQ - Perguntas Frequentes

### 1. Preciso fazer due diligence mesmo se o comprador é de confiança?

**SIM.** Confiança não substitui diligência. Problemas ocultos podem arruinar até a melhor relação.

### 2. Quanto tempo antes da venda devo começar a preparar a empresa?

**Ideal: 12 meses.** Mínimo: 6 meses. Menos que isso, você não terá tempo de corrigir problemas graves.

### 3. Posso fazer due diligence sozinho ou preciso de advogado?

Se sua empresa fatura < R$ 360k/ano e não tem processos, você pode fazer uma versão simplificada. Acima disso, **precisa de profissional**.

### 4. Due diligence garante que a venda vai acontecer?

Não. Due diligence é um **pré-requisito** para a venda, não uma garantia. Mas aumenta em 70% a probabilidade de fechamento.

### 5. O que é mais comum derrubar uma venda?

**Top 3:**
1. Passivos trabalhistas não provisionados (35%)
2. Dívidas tributárias ocultas (28%)
3. Contratos com cláusulas de mudança de controle (18%)

### 6. Posso vender parte da empresa sem due diligence?

**Não.** Mesmo em venda parcial (minoritária), o comprador fará due diligence.

### 7. Due diligence descobre tudo?

Não. Descobre 80-90% dos problemas. Por isso, contratos de M&A têm cláusulas de garantia e indenização.

---

## Conclusão: Proteja Seu Patrimônio

Vender uma empresa é uma das decisões mais importantes da sua vida como empresário. Você passou anos construindo esse patrimônio. Não deixe que falta de preparação custe milhões.

**Lembre-se:**
- Due diligence é **proteção**, não custo
- Transparência é **poder de negociação**, não fraqueza
- Preparação antecipada é **valorização**, não despesa

---

## Agende Sua Consultoria em M&A

Quer saber quanto vale sua empresa e o que precisa regularizar antes de vender?

Agende uma **consultoria estratégica de 90 minutos** comigo. Vou analisar:

✅ Valuation preliminar da sua empresa
✅ Principais red flags jurídicos
✅ Roadmap para preparação da venda
✅ Estimativa de timeline e custos

**Investimento:** R$ 1.500 (dedutíveis se contratar meus serviços completos de M&A)

[**📞 Agendar Consultoria**](${BASE_URL}/contato)

---

**Sobre a Autora:**
Jennifer Barreto é advogada especializada em Direito Empresarial e M&A, com 12+ anos de experiência em transações de compra e venda de empresas no Rio Grande do Sul. Já assessorou mais de 50 transações de M&A, totalizando R$ 200+ milhões em valor.

[Conheça mais sobre meu trabalho](${BASE_URL}/sobre)

---

## Leia Também

- [Due Diligence Checklist Completo](${BASE_URL}/conteudo/due-diligence-checklist)
- [Importância da Due Diligence em M&A](${BASE_URL}/conteudo/importancia-due-diligence-ma)
- [Gestão de Contratos e Lucratividade](${BASE_URL}/conteudo/gestao-contratos-lucratividade)
- [Como Prevenir Passivos Trabalhistas](${BASE_URL}/conteudo/passivos-trabalhistas-prevencao)
- [POPs no Ambiente Corporativo](${BASE_URL}/conteudo/pops-ambiente-corporativo)
- [Contratos Empresariais: Cláusulas Essenciais](${BASE_URL}/conteudo/contratos-empresariais-clausulas-essenciais)
`
};

// Artigo 2: Compliance Contratual
const article2 = {
  title: 'Compliance Contratual: Como Evitar Multas Milionárias e Processos',
  slug: 'compliance-contratual-evitar-multas-processos',
  excerpt: 'Compliance contratual empresarial: evite multas da LGPD, processos trabalhistas e quebra de SLAs. Sistema prático de governança de contratos 2025.',
  category: 'Gestão de Contratos',
  tags: ['compliance', 'gestão de contratos', 'auditoria contratual', 'governança', 'LGPD'],
  author: 'Jennifer Barreto',
  coverImage: `${BASE_URL}${UPLOADS_PATH}/compliance-contratual-gestao-cover.png`,
  status: 'PUBLISHED',
  content: `# Compliance Contratual: Como Evitar Multas Milionárias e Processos

## Introdução: O Custo da Desorganização Contratual

Em 2024, uma empresa de logística de Caxias do Sul pagou R$ 3,2 milhões em multas e indenizações por descumprir cláusulas contratuais que **nem sabia que existiam**.

O problema? **280 contratos ativos, nenhum sistema de gestão, zero visibilidade de obrigações.**

Quando o primeiro processo chegou, a equipe jurídica descobriu um pesadelo:

- 47 contratos vencidos e automaticamente renovados (com reajustes não pagos)
- 23 contratos com cláusulas de exclusividade sendo violadas
- 15 contratos sem LGPD compliance
- 8 contratos trabalhando com fornecedores sem certificação exigida

**Resultado:** 6 meses de auditoria emergencial, R$ 3,2 milhões em multas, e 18 processos judiciais.

![Infográfico multas LGPD e licitações](${BASE_URL}${UPLOADS_PATH}/infografico-multas-lgpd-licitacoes.png)

---

## O Que É Compliance Contratual?

### Definição Técnica

Compliance contratual é o conjunto de **processos, sistemas e controles** que garantem que sua empresa:

1. **Conhece** todas as obrigações contratuais que assumiu
2. **Cumpre** essas obrigações dentro dos prazos estabelecidos
3. **Monitora** o cumprimento da contraparte
4. **Documenta** tudo para defesa em caso de litígio

Em termos práticos, é ter **visibilidade e controle total** sobre os 4 pilares contratuais:

- 📄 **Documental:** Onde estão os contratos? Quem tem acesso?
- 📅 **Temporal:** Quando vencem? Quando renovam?
- 💼 **Obrigacional:** O que você precisa fazer?
- 💰 **Financeiro:** Quanto custa? Multas por descumprimento?

---

## Por Que Compliance Contratual É Crítica em 2025?

### 1. LGPD: Multas de Até 2% do Faturamento

Desde 2021, a **Lei Geral de Proteção de Dados (LGPD)** exige que **todo contrato que envolva tratamento de dados pessoais** tenha cláusulas específicas.

**Multa por descumprimento:** Até R$ 50 milhões por infração.

**Saiba mais:** [LGPD para Pequenas Empresas: Guia Prático](${BASE_URL}/conteudo/lgpd-pequenas-empresas-guia-pratico)

### 2. Lei de Licitações: Penalidades para Fornecedores

**Multa típica:** 0,3% a 10% do valor do contrato por dia de atraso.

**Saiba mais:** [Nova Lei de Licitações: Mudanças para PMEs](${BASE_URL}/conteudo/nova-lei-licitacoes-mudancas-pme)

---

## Os 7 Pilares do Compliance Contratual

![Diagrama 7 pilares compliance](${BASE_URL}${UPLOADS_PATH}/diagrama-7-pilares-compliance.png)

### Pilar 1: Centralização Documental

**Problema:** Contratos espalhados em e-mails, pastas compartilhadas, gavetas.

**Solução:** Repositório centralizado (físico + digital).

### Pilar 2: Registro e Catalogação

**Problema:** Você tem 100 contratos, mas não sabe quantos estão ativos.

**Solução:** Planilha de Controle Mestre.

![Template planilha controle contratos](${BASE_URL}${UPLOADS_PATH}/template-planilha-controle-contratos.png)

### Pilar 3: Sistema de Alertas

**Problema:** Contratos vencem, você perde janela de negociação.

**Solução:** Calendário de Obrigações (Google Calendar).

### Pilar 4: Auditoria de Cláusulas Críticas

**Problema:** Você assinou contratos há 3 anos e não lembra das cláusulas.

**Solução:** Checklist de Revisão Contratual.

**Saiba mais:** [Cláusulas Essenciais em Contratos](${BASE_URL}/conteudo/clausulas-essenciais-contratos)

### Pilar 5: Monitoramento de Performance

**Problema:** Você paga, mas não sabe se está recebendo o que foi contratado.

**Solução:** KPIs Contratuais.

### Pilar 6: Gestão de Aditivos e Alterações

**Problema:** Contratos alterados verbalmente, nunca formalizados.

**Solução:** Protocolo de Aditivo Contratual.

### Pilar 7: Arquivo e Histórico

**Problema:** Processo judicial pede contrato, você não acha, perde a causa.

**Solução:** Backup 3-2-1.

---

## Como Implementar Compliance Contratual (Passo a Passo)

### Fase 1: Diagnóstico (Semana 1-2)

1. Solicitar cópias de contratos ativos de TODAS as áreas
2. Vasculhar e-mails com palavras-chave
3. Listar contratos verbais que precisam formalização

### Fase 2: Organização (Semana 3-4)

1. Criar estrutura de pastas
2. Preencher planilha mestre
3. Digitalizar contratos físicos
4. Criar backup inicial

### Fase 3: Análise de Riscos (Semana 5-6)

1. Revisar contratos com checklist de cláusulas críticas
2. Identificar contratos vencidos
3. Identificar PJs com risco trabalhista
4. Priorizar regularizações

### Fase 4: Regularização (Semana 7-12)

1. Regularizar contratos vencidos
2. Adicionar cláusulas de LGPD
3. Converter PJs problemáticos
4. Renegociar contratos desvantajosos

### Fase 5: Automação (Semana 13+)

1. Configurar alertas no Google Calendar
2. Criar dashboard de KPIs
3. Treinar equipe em processos
4. Implementar revisão trimestral

**Saiba mais:** [Como Prevenir Passivos Trabalhistas](${BASE_URL}/conteudo/passivos-trabalhistas-prevencao)

---

## Erros Comuns em Compliance Contratual

### Erro #1: "Guardo os Contratos, Mas Não Leio"

**Realidade:** 73% dos gestores **nunca releem** contratos após assinatura.

**Solução:** Revisão trimestral dos top 10 contratos.

### Erro #2: "Confio na Memória"

**Realidade:** Você não vai lembrar de cláusulas de contratos assinados há 2 anos.

**Solução:** Planilha mestre + alertas automáticos.

### Erro #3: "Alterações Verbais São Válidas"

**Realidade:** Juridicamente, só vale o que está escrito e assinado.

**Solução:** Todo ajuste = aditivo formal.

**Saiba mais:** [Negociação Estratégica de Contratos](${BASE_URL}/conteudo/negociacao-estrategica-contratos)

---

## FAQ - Perguntas Frequentes

### 1. Preciso de advogado para implementar compliance?

**Para micro/pequena (<20 contratos):** Não necessariamente.
**Para média/grande (>20 contratos):** Sim, recomendado.

### 2. Quanto tempo leva para implementar?

**Total:** 2-4 meses para compliance completo.

### 3. Qual o ROI de compliance contratual?

**Investimento:** R$ 5.000 - R$ 50.000
**Retorno:** R$ 50.000 - R$ 500.000 em multas evitadas (média 10x)

### 4. Posso terceirizar a gestão de contratos?

Sim. Escritórios oferecem **Contract Management as a Service** (CMaaS).

### 5. O que fazer com contratos antigos (>5 anos)?

- **Ativos:** Manter arquivados
- **Vencidos sem litígio:** Arquivar por mais 5 anos
- **Vencidos com litígio:** Manter indefinidamente

### 6. Como sei se meu contrato tem cláusula abusiva?

Cláusulas abusivas comuns:
- Multa rescisória >10%
- Renovação automática sem aviso
- Foro exclusivo distante
- Responsabilidade ilimitada

### 7. Preciso guardar contratos PJ por quanto tempo?

**5 anos após o término** (prescrição trabalhista).

---

## Conclusão: Compliance É Prevenção

Empresas com compliance contratual eficaz:
- ✅ Pagam 40% menos em multas
- ✅ Têm 60% menos processos judiciais
- ✅ Negociam melhor
- ✅ Escalam mais rápido

---

## Auditoria Contratual Completa

Agende uma **auditoria contratual de 90 dias**:

**Escopo:**
✅ Análise de todos os contratos ativos
✅ Identificação de riscos críticos
✅ Relatório executivo com plano de ação
✅ Implementação de sistema de gestão

**Investimento:** R$ 8.000 - R$ 30.000

[**📞 Agendar Auditoria**](${BASE_URL}/contato)

---

**Sobre a Autora:**
Jennifer Barreto é advogada especializada em Gestão de Contratos e Compliance Empresarial, com 12+ anos de experiência no Rio Grande do Sul.

[Conheça mais sobre meu trabalho](${BASE_URL}/sobre)

---

## Leia Também

- [Gestão de Contratos e Lucratividade](${BASE_URL}/conteudo/gestao-contratos-lucratividade)
- [Cláusulas Essenciais em Contratos Empresariais](${BASE_URL}/conteudo/clausulas-essenciais-contratos)
- [Contratos Empresariais: Cláusulas Essenciais](${BASE_URL}/conteudo/contratos-empresariais-clausulas-essenciais)
- [LGPD para Pequenas Empresas](${BASE_URL}/conteudo/lgpd-pequenas-empresas-guia-pratico)
- [Nova Lei de Licitações](${BASE_URL}/conteudo/nova-lei-licitacoes-mudancas-pme)
- [Negociação Estratégica](${BASE_URL}/conteudo/negociacao-estrategica-contratos)
`
};

// Artigo 3: Startups
const article3 = {
  title: 'Estrutura Jurídica para Startups: Da Ideia à Captação de Investimento',
  slug: 'estrutura-juridica-startups-captacao-investimento',
  excerpt: 'Estrutura jurídica para startups: vesting, term sheet, cap table e contratos para captar investimento seed/Series A. Guia completo startup law 2025.',
  category: 'Startups e Tecnologia',
  tags: ['startup', 'investimento', 'vesting', 'term sheet', 'cap table', 'rodada seed'],
  author: 'Jennifer Barreto',
  coverImage: `${BASE_URL}${UPLOADS_PATH}/compliance-contratual-gestao-cover.png`, // Usar cover de compliance temporariamente
  status: 'PUBLISHED',
  content: `# Estrutura Jurídica para Startups: Da Ideia à Captação de Investimento

## Introdução: O Erro de R$ 2 Milhões

Em 2023, uma startup de SaaS de Porto Alegre fechou rodada seed de R$ 3 milhões. Seis meses depois, um sócio-fundador saiu da empresa.

O problema? **Não havia acordo de vesting.**

Resultado: O sócio manteve **30% da empresa** sem trabalhar mais um dia. O fundo exigiu recompra por R$ 2 milhões ou ameaçou não desembolsar a segunda parcela.

**O erro custou:** R$ 2 milhões que poderia ter sido evitado com um contrato de R$ 3.000.

![Infográfico estatísticas startups Brasil](${BASE_URL}${UPLOADS_PATH}/infografico-estatisticas-startups-brasil.png)

---

## Por Que Estrutura Jurídica É Crítica para Startups?

**Investidores sérios NÃO investem em startups sem:**
1. ✅ Cap table limpo
2. ✅ Acordo de vesting
3. ✅ Acordo de quotistas robusto
4. ✅ Stock options plan
5. ✅ Propriedade intelectual cedida à empresa

---

## As 5 Fases Jurídicas de uma Startup

![Timeline fases jurídicas startup](${BASE_URL}${UPLOADS_PATH}/timeline-fases-juridicas-startup.png)

### Fase 1: Ideação (Pré-incorporação)

**Documento essencial:** Founders Agreement

Define:
- Quem são os founders
- % de participação (equity split)
- Responsabilidades por área
- O que acontece se founder sair

**Custo:** R$ 2.000 - R$ 5.000

---

### Fase 2: Incorporação

**Documentos essenciais:**
- Contrato Social otimizado para startup
- Acordo de Quotistas (privado)
- Vesting Agreement

**Saiba mais:** [Contrato Social: Acordo de Sócios](${BASE_URL}/conteudo/contrato-social-acordo-socios)

#### Vesting: O Que É?

Mecanismo que transfere quotas **gradualmente** ao longo de 3-4 anos.

**Estrutura clássica:**
- **Cliff de 12 meses:** Founder só recebe após 1 ano
- **Vesting linear de 4 anos:** Quotas mensais por 3 anos

**Exemplo:**
- João tem 40% (400.000 quotas)
- Cliff: 100.000 quotas após ano 1
- Meses 13-48: 8.333 quotas/mês
- Se sair no mês 24: mantém só 50% (200.000 quotas)

**Saiba mais:** [Gestão de Riscos: Vesting em Startups](${BASE_URL}/conteudo/gestao-riscos-contratos-vesting-startups)

---

### Fase 3: Traction

**Documentos essenciais:**
- Stock Options Plan
- Cessão de Propriedade Intelectual

![Tabela equity funcionários](${BASE_URL}${UPLOADS_PATH}/tabela-equity-funcionarios-startup.png)

**Saiba mais:** [Registro de Marca no INPI](${BASE_URL}/conteudo/registro-marca-inpi-importancia)

---

### Fase 4: Pré-Investimento

**Documentos essenciais:**
- Cap Table Organizado
- Term Sheet
- Data Room

![Diagrama cap table pré e pós seed](${BASE_URL}${UPLOADS_PATH}/diagrama-cap-table-pre-pos-seed.png)

**Saiba mais:** [Due Diligence Checklist](${BASE_URL}/conteudo/due-diligence-checklist)

---

### Fase 5: Pós-Investimento

**Documentos essenciais:**
- Investment Agreement
- Conselho de Administração

---

## Quanto Custa Estruturar Startup Juridicamente?

| Fase | Custo |
|------|-------|
| Ideação | R$ 2k - R$ 5k |
| Incorporação | R$ 11,5k - R$ 21,5k |
| Traction | R$ 12k - R$ 27k |
| Pré-investimento | R$ 10k - R$ 30k |
| Pós-investimento | R$ 21k - R$ 51k |
| **TOTAL** | **R$ 56,5k - R$ 134,5k** |

**ROI:** Aumenta em 3-5x as chances de captar investimento.

---

## Erros Fatais que Afastam Investidores

### Erro #1: Sociedade 50-50 Sem Desempate

**Solução:** 51-49 ou cláusula de desempate.

**Saiba mais:** [Sociedade 50-50: Riscos](${BASE_URL}/conteudo/sociedade-50-50-riscos)

### Erro #2: Founders com 100% Vested Desde o Dia 1

**Solução:** Vesting obrigatório (4 anos, cliff 1 ano).

### Erro #3: IP Não Pertence à Empresa

**Solução:** Termo de cessão retroativo + registro de marca.

### Erro #4: Cap Table Bagunçado

**Solução:** Cap table atualizado em tempo real.

### Erro #5: Não Contratar Advogado Especializado

**Solução:** Contratar especialista em startup law.

---

## FAQ - Perguntas Frequentes

### 1. Quando implementar vesting?

**Idealmente:** No dia da incorporação.
**No máximo:** Antes da primeira rodada.

### 2. Posso fazer contrato social padrão?

**NÃO.** Contrato padrão não prevê vesting, stock options, governança.

### 3. Quanto de equity dar ao primeiro funcionário?

- VP/C-level: 0,5% - 2%
- Senior: 0,1% - 0,5%
- Mid-level: 0,05% - 0,2%
- Junior: 0,01% - 0,05%

### 4. Preciso de advogado para rodada seed?

**SIM.** Sem advogado você perde poder de negociação.

### 5. Quanto um investidor seed quer de participação?

**Típico:** 15-25%

### 6. O que é "fully diluted"?

Inclui todas as quotas (inclusive options não exercidas).

### 7. Como proteger de sócio que não produz?

1. Vesting
2. Cláusula de performance
3. Buy-sell agreement

---

## Conclusão

Startups que captam **sempre** têm estrutura jurídica sólida.

**Lembre-se:**
- Vesting evita litígios (R$ 2M economizados)
- Cap table organizado acelera captação
- Stock options retêm talentos
- Registro de IP protege seu ativo

---

## Consultoria Jurídica para Startups

**Pacote Starter (Ideação → Incorporação)**
✅ Founders agreement + Contrato social + Vesting
**Investimento:** R$ 15.000

**Pacote Growth (Pré-investimento)**
✅ Starter + Stock options + IP + Data room
**Investimento:** R$ 35.000

**Pacote Scale (Rodada Seed/Series A)**
✅ Growth + Term sheet + Investment agreement + Governança
**Investimento:** R$ 60.000

[**📞 Agendar Consultoria**](${BASE_URL}/contato)

---

**Sobre a Autora:**
Jennifer Barreto é advogada especializada em Direito Empresarial e Startups, com experiência em rodadas seed e Series A no RS.

[Conheça mais sobre meu trabalho](${BASE_URL}/sobre)

---

## Leia Também

- [Gestão de Riscos: Contratos de Vesting](${BASE_URL}/conteudo/gestao-riscos-contratos-vesting-startups)
- [Contrato Social: Acordo de Sócios](${BASE_URL}/conteudo/contrato-social-acordo-socios)
- [Sociedade 50-50: Riscos](${BASE_URL}/conteudo/sociedade-50-50-riscos)
- [Due Diligence Checklist](${BASE_URL}/conteudo/due-diligence-checklist)
- [Registro de Marca no INPI](${BASE_URL}/conteudo/registro-marca-inpi-importancia)
`
};

async function publishArticles() {
  try {
    console.log('🚀 Iniciando publicação de 3 artigos...\n');

    // Publicar Artigo 1
    console.log('📝 Publicando Artigo 1: Venda de Empresas...');
    const id1 = generateUUID();
    const result1 = await pool.query(`
      INSERT INTO blog_posts (
        id, title, slug, content, excerpt, category, tags, author,
        "coverImage", status, "publishedAt", "updatedAt", "createdAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id, slug
    `, [
      id1,
      article1.title,
      article1.slug,
      article1.content,
      article1.excerpt,
      article1.category,
      article1.tags,
      article1.author,
      article1.coverImage,
      article1.status,
      new Date(),
      new Date(),
      new Date()
    ]);
    console.log(`✅ Artigo 1 publicado! ID: ${result1.rows[0].id}, Slug: ${result1.rows[0].slug}\n`);

    // Publicar Artigo 2
    console.log('📝 Publicando Artigo 2: Compliance Contratual...');
    const id2 = generateUUID();
    const result2 = await pool.query(`
      INSERT INTO blog_posts (
        id, title, slug, content, excerpt, category, tags, author,
        "coverImage", status, "publishedAt", "updatedAt", "createdAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id, slug
    `, [
      id2,
      article2.title,
      article2.slug,
      article2.content,
      article2.excerpt,
      article2.category,
      article2.tags,
      article2.author,
      article2.coverImage,
      article2.status,
      new Date(),
      new Date(),
      new Date()
    ]);
    console.log(`✅ Artigo 2 publicado! ID: ${result2.rows[0].id}, Slug: ${result2.rows[0].slug}\n`);

    // Publicar Artigo 3
    console.log('📝 Publicando Artigo 3: Estrutura Jurídica para Startups...');
    const id3 = generateUUID();
    const result3 = await pool.query(`
      INSERT INTO blog_posts (
        id, title, slug, content, excerpt, category, tags, author,
        "coverImage", status, "publishedAt", "updatedAt", "createdAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id, slug
    `, [
      id3,
      article3.title,
      article3.slug,
      article3.content,
      article3.excerpt,
      article3.category,
      article3.tags,
      article3.author,
      article3.coverImage,
      article3.status,
      new Date(),
      new Date(),
      new Date()
    ]);
    console.log(`✅ Artigo 3 publicado! ID: ${result3.rows[0].id}, Slug: ${result3.rows[0].slug}\n`);

    console.log('🎉 SUCESSO! Todos os 3 artigos foram publicados!\n');
    console.log('📊 Resumo:');
    console.log(`   Artigo 1: ${BASE_URL}/conteudo/${result1.rows[0].slug}`);
    console.log(`   Artigo 2: ${BASE_URL}/conteudo/${result2.rows[0].slug}`);
    console.log(`   Artigo 3: ${BASE_URL}/conteudo/${result3.rows[0].slug}`);
    console.log('\n✅ Próximos passos:');
    console.log('   1. Verificar artigos no frontend');
    console.log('   2. Submeter sitemap atualizado ao Google Search Console');
    console.log('   3. Compartilhar nas redes sociais\n');

  } catch (error) {
    console.error('❌ Erro ao publicar artigos:', error);
    console.error('Detalhes:', error.message);
  } finally {
    await pool.end();
  }
}

// Executar
publishArticles();
