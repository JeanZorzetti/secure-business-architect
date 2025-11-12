const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const blogPosts = [
  {
    title: 'Por que a gestão de contratos é crucial para a lucratividade da sua empresa?',
    slug: 'gestao-contratos-lucratividade',
    excerpt:
      'Um contrato bem gerenciado pode ser a diferença entre o sucesso e o fracasso de uma operação comercial. Entenda como o ciclo de vida contratual impacta diretamente seu resultado financeiro e como evitar as armadilhas mais comuns que drenam recursos.',
    content: `# Por que a gestão de contratos é crucial para a lucratividade da sua empresa?

Um contrato bem gerenciado pode ser a diferença entre o sucesso e o fracasso de uma operação comercial. Entenda como o ciclo de vida contratual impacta diretamente seu resultado financeiro e como evitar as armadilhas mais comuns que drenam recursos.

## O Ciclo de Vida Contratual

A gestão eficaz de contratos começa muito antes da assinatura e se estende muito além dela. Cada fase do ciclo de vida contratual - desde a negociação inicial até a renovação ou rescisão - apresenta oportunidades de criar valor e riscos de perder dinheiro.

## Principais Desafios

1. **Prazos e vencimentos não monitorados**
2. **Cláusulas de reajuste não aplicadas**
3. **Falta de controle de obrigações**
4. **Ausência de indicadores de performance**

## Como Implementar uma Gestão Eficaz

Comece com um inventário completo de todos os contratos da empresa. Categorize-os por tipo, valor e criticidade. Estabeleça alertas para datas importantes e crie um processo claro de revisão periódica.

## Conclusão

A gestão de contratos não é apenas uma questão jurídica - é uma disciplina estratégica que impacta diretamente a lucratividade. Investir em processos e ferramentas adequadas pode gerar economia significativa e evitar surpresas desagradáveis.`,
    author: 'Jennifer Barreto',
    tags: ['gestão de contratos', 'direito empresarial', 'lucratividade'],
    publishedAt: new Date('2024-03-15'),
    status: 'PUBLISHED',
  },
  {
    title: 'Sociedade 50/50: Por que essa pode não ser a melhor escolha para você',
    slug: 'sociedade-50-50-riscos',
    excerpt:
      'A divisão igualitária parece justa, mas pode se tornar um pesadelo operacional. Analisamos os riscos de uma sociedade 50/50 e apresentamos alternativas mais inteligentes para estruturar sua empresa sem criar impasses que paralisam decisões estratégicas.',
    content: `# Sociedade 50/50: Por que essa pode não ser a melhor escolha para você

A divisão igualitária parece justa, mas pode se tornar um pesadelo operacional. Analisamos os riscos de uma sociedade 50/50 e apresentamos alternativas mais inteligentes para estruturar sua empresa.

## O Problema do Empate

Quando dois sócios têm exatamente 50% cada, qualquer discordância pode paralisar a empresa. Decisões críticas ficam em impasse, impedindo o crescimento e a adaptação necessária em um mercado dinâmico.

## Riscos Principais

- **Paralisia decisória** em momentos críticos
- **Desgaste da relação** entre os sócios
- **Perda de oportunidades** de negócio
- **Dificuldade de resolução** de conflitos

## Alternativas Inteligentes

### 51/49
Uma das soluções mais simples é ajustar para 51/49. O sócio majoritário pode desempatar decisões importantes, mas ambos mantêm influência significativa.

### Acordo de Sócios
Um Acordo de Sócios bem estruturado pode definir mecanismos de desempate, áreas de decisão exclusivas de cada sócio, e processos de mediação.

## Conclusão

A sociedade 50/50 só funciona com extrema maturidade e alinhamento entre os sócios. Para a maioria das empresas, estruturas alternativas oferecem mais segurança e agilidade operacional.`,
    author: 'Jennifer Barreto',
    tags: ['sociedade', 'direito societário', 'governança'],
    publishedAt: new Date('2024-03-10'),
    status: 'PUBLISHED',
  },
  {
    title: 'Contrato de Parceria: Uma solução para a mão-de-obra no agronegócio',
    slug: 'contrato-parceria-agronegocio',
    excerpt:
      'O contrato de parceria no agronegócio oferece flexibilidade e compartilhamento de riscos. Descubra como estruturar parcerias que protegem ambas as partes, garantem a continuidade operacional e se adaptam às peculiaridades do setor rural.',
    content: `# Contrato de Parceria: Uma solução para a mão-de-obra no agronegócio

O contrato de parceria no agronegócio oferece flexibilidade e compartilhamento de riscos. Descubra como estruturar parcerias que protegem ambas as partes e garantem a continuidade operacional.

## O que é o Contrato de Parceria Rural

É uma modalidade contratual onde produtor e parceiro compartilham recursos, trabalho e resultados. Diferente da relação de emprego tradicional, há compartilhamento de riscos e lucros.

## Vantagens

1. **Flexibilidade operacional**
2. **Compartilhamento de riscos**
3. **Alinhamento de interesses**
4. **Redução de custos fixos**

## Elementos Essenciais

Todo contrato de parceria agrícola deve conter:

- Definição clara das contribuições de cada parte
- Percentual de divisão dos resultados
- Responsabilidades e obrigações
- Prazo de duração
- Condições de rescisão

## Cuidados Importantes

É fundamental que o contrato reflita uma parceria real, não uma relação de emprego disfarçada. O parceiro deve ter autonomia, assumir riscos reais e participar efetivamente das decisões.

## Conclusão

O contrato de parceria é uma ferramenta valiosa para o agronegócio, mas requer estruturação cuidadosa para evitar questionamentos trabalhistas e garantir a segurança jurídica de ambas as partes.`,
    author: 'Jennifer Barreto',
    tags: ['agronegócio', 'contratos', 'direito do trabalho'],
    publishedAt: new Date('2024-03-05'),
    status: 'PUBLISHED',
  },
  {
    title: 'Contrato Social vs. Acordo de Sócios: Entenda a diferença crucial',
    slug: 'contrato-social-acordo-socios',
    excerpt:
      'Muitos empresários confundem esses dois documentos ou ignoram a importância do Acordo de Sócios. Explicamos quando usar cada um e por que o Acordo de Sócios pode ser o documento mais estratégico da sua empresa.',
    content: `# Contrato Social vs. Acordo de Sócios: Entenda a diferença crucial

Muitos empresários confundem esses dois documentos ou ignoram a importância do Acordo de Sócios. Vamos esclarecer as diferenças e quando usar cada um.

## Contrato Social

O Contrato Social é o documento constitutivo da empresa, registrado na Junta Comercial. Define a estrutura básica: nome, capital, atividades, quotas dos sócios e regras fundamentais de funcionamento.

**Características:**
- Documento público
- Registro obrigatório
- Alterações exigem procedimentos formais
- Define a relação empresa-sócios

## Acordo de Sócios

O Acordo de Sócios é um documento privado entre os sócios, que complementa o Contrato Social. Pode tratar de questões mais sensíveis e estratégicas sem exposição pública.

**Características:**
- Documento privado
- Flexível e confidencial
- Fácil de alterar
- Define a relação entre os sócios

## O Que Colocar no Acordo de Sócios

- Direito de preferência na venda de quotas
- Cláusulas de não-concorrência
- Mecanismos de resolução de conflitos
- Tag along e drag along
- Vesting de quotas
- Processo sucessório

## Por Que o Acordo é Estratégico

O Acordo de Sócios permite regular questões delicadas longe dos olhos da concorrência e do mercado. É onde se define o verdadeiro funcionamento da sociedade.

## Conclusão

Ambos os documentos são importantes, mas cumprem funções diferentes. O ideal é ter um Contrato Social enxuto e objetivo, complementado por um Acordo de Sócios detalhado que proteja os interesses de todos.`,
    author: 'Jennifer Barreto',
    tags: ['contrato social', 'acordo de sócios', 'direito societário'],
    publishedAt: new Date('2024-02-28'),
    status: 'PUBLISHED',
  },
  {
    title: 'Due Diligence: O que avaliar antes de comprar uma empresa',
    slug: 'due-diligence-checklist',
    excerpt:
      'Comprar uma empresa sem uma due diligence adequada é como dirigir vendado. Conheça os 7 pontos críticos que devem ser avaliados antes de qualquer aquisição e como evitar surpresas que podem custar milhões.',
    content: `# Due Diligence: O que avaliar antes de comprar uma empresa

Comprar uma empresa sem uma due diligence adequada é como dirigir vendado. Conheça os pontos críticos que devem ser avaliados antes de qualquer aquisição.

## O Que é Due Diligence

É o processo de investigação profunda de uma empresa antes de sua aquisição. O objetivo é identificar riscos, validar informações e fundamentar a decisão de compra.

## 7 Pontos Críticos

### 1. Situação Societária
Verificar se há litígios entre sócios, divergências não resolvidas, ou estruturas societárias problemáticas.

### 2. Passivos Trabalhistas
Analisar reclamações trabalhistas em andamento, passivos potenciais, e práticas trabalhistas da empresa.

### 3. Contratos Vigentes
Revisar todos os contratos importantes: clientes, fornecedores, locação, financiamentos, etc.

### 4. Situação Tributária
Certificados de regularidade fiscal, processos administrativos, e contingências tributárias.

### 5. Propriedade Intelectual
Marcas registradas, patentes, direitos autorais e know-how proprietário.

### 6. Ativos e Passivos
Validação de balanços, contas a receber, estoques e dívidas.

### 7. Compliance Regulatório
Licenças, alvarás, autorizações específicas do setor e conformidade com regulamentações.

## O Custo de Não Fazer

Já vi aquisições onde o comprador descobriu, tarde demais:
- Passivos trabalhistas milionários não revelados
- Contratos com cláusulas de rescisão em caso de mudança de controle
- Litígios capazes de inviabilizar o negócio

## Conclusão

Due diligence não é custo, é investimento. O valor gasto na investigação é ínfimo comparado aos riscos de uma aquisição mal avaliada.`,
    author: 'Jennifer Barreto',
    tags: ['due diligence', 'M&A', 'aquisições'],
    publishedAt: new Date('2024-02-20'),
    status: 'PUBLISHED',
  },
  {
    title: '3 Cláusulas que todo contrato empresarial precisa ter',
    slug: 'clausulas-essenciais-contratos',
    excerpt:
      'Existem cláusulas que são verdadeiras "vacinas jurídicas" para sua empresa. Descubra as três mais importantes que protegem seus interesses e evitam litígios caros e demorados.',
    content: `# 3 Cláusulas que todo contrato empresarial precisa ter

Existem cláusulas que são verdadeiras "vacinas jurídicas" para sua empresa. Vamos explorar as três mais importantes.

## 1. Cláusula de Resolução de Conflitos

**Por que é essencial:**
Define como disputas serão resolvidas antes que elas aconteçam, quando as partes ainda estão em bons termos.

**O que incluir:**
- Mediação obrigatória antes de processo judicial
- Arbitragem como alternativa à justiça comum
- Foro competente adequado ao seu negócio

**Benefício:**
Economia de tempo e recursos em caso de conflito.

## 2. Cláusula de Confidencialidade e Não-Concorrência

**Por que é essencial:**
Protege informações sensíveis do negócio e impede que parceiros se tornem concorrentes usando conhecimento privilegiado.

**O que incluir:**
- Definição clara do que é confidencial
- Prazo de vigência da obrigação
- Penalidades pelo descumprimento
- Escopo geográfico e temporal da não-concorrência

**Benefício:**
Proteção do know-how e posicionamento de mercado.

## 3. Cláusula de Rescisão e Penalidades

**Por que é essencial:**
Estabelece as regras de saída da relação contratual e as consequências do inadimplemento.

**O que incluir:**
- Hipóteses de rescisão unilateral
- Prazos de aviso prévio
- Multas graduadas conforme a gravidade
- Procedimento de rescisão

**Benefício:**
Previsibilidade e proteção contra quebras contratuais abusivas.

## Conclusão

Estas três cláusulas formam o tripé de proteção de qualquer contrato empresarial. Invista tempo na sua redação cuidadosa - isso pode evitar problemas que custariam muito mais no futuro.`,
    author: 'Jennifer Barreto',
    tags: ['contratos', 'cláusulas contratuais', 'direito empresarial'],
    publishedAt: new Date('2024-02-12'),
    status: 'PUBLISHED',
  },
  {
    title: 'Como negociar contratos sem deixar dinheiro na mesa',
    slug: 'negociacao-estrategica-contratos',
    excerpt:
      'Negociar é mais sobre equilíbrio do que sobre vitória. Aprenda as estratégias que uso para garantir que meus clientes fechem acordos vantajosos sem comprometer relações comerciais importantes.',
    content: `# Como negociar contratos sem deixar dinheiro na mesa

Negociar é mais sobre equilíbrio do que sobre vitória. Vamos explorar estratégias práticas para acordos vantajosos.

## A Mentalidade Correta

Esqueça a ideia de "ganhar" a negociação. Bons contratos são aqueles onde ambas as partes sentem que fizeram um bom negócio e estão motivadas a cumprir o acordado.

## 5 Estratégias Práticas

### 1. Prepare-se Profundamente

Conheça não apenas seus números, mas também os da outra parte. Entenda suas motivações, prazos e restrições.

### 2. Identifique as Variáveis Negociáveis

Preço é apenas uma variável. Prazo de pagamento, condições de entrega, garantias, escopo - tudo pode ser negociado.

### 3. Crie Pacotes de Concessões

Nunca conceda uma variável isoladamente. "Posso aceitar esse prazo se você concordar com essa condição de pagamento."

### 4. Use o Silêncio Estrategicamente

Após fazer uma oferta, permaneça em silêncio. A pressão do silêncio frequentemente leva a outra parte a melhorar sua posição.

### 5. Documente Tudo Imediatamente

Após cada rodada de negociação, envie email confirmando os pontos acordados. Isso evita retrocessos e mal-entendidos.

## Erros Comuns

- Fazer a primeira concessão sem receber nada em troca
- Negociar sem preparação adequada
- Deixar questões importantes em aberto "para resolver depois"
- Aceitar acordos verbais sem documentação
- Negociar sob pressão de prazo autoimposto

## A Arte do "Não"

Saber dizer não é fundamental. Um "não" firme mas educado, acompanhado de uma contraproposta construtiva, demonstra profissionalismo e seriedade.

## Conclusão

Negociação contratual é uma habilidade que se desenvolve com prática. As melhores negociações são aquelas onde você sai da sala com um acordo justo e uma relação comercial fortalecida.`,
    author: 'Jennifer Barreto',
    tags: ['negociação', 'contratos', 'estratégia'],
    publishedAt: new Date('2024-02-05'),
    status: 'PUBLISHED',
  },
  {
    title: 'Passivos trabalhistas ocultos: Como identificar e prevenir',
    slug: 'passivos-trabalhistas-prevencao',
    excerpt:
      'Muitas empresas descobrem passivos trabalhistas milionários tarde demais. Saiba quais são os sinais de alerta e como implementar uma cultura de compliance que protege sua empresa desde já.',
    content: `# Passivos trabalhistas ocultos: Como identificar e prevenir

Muitas empresas descobrem passivos trabalhistas milionários tarde demais. Vamos identificar os sinais de alerta e estratégias de prevenção.

## O Que São Passivos Ocultos

São contingências trabalhistas que não aparecem no balanço, mas existem e podem ser acionadas a qualquer momento. Podem envolver questões como:

- Horas extras não registradas
- Equiparação salarial
- Desvio de função
- Intervalos não concedidos
- Irregularidades em rescisões

## Sinais de Alerta

### 1. Alta Rotatividade
Rotatividade excessiva pode indicar problemas de gestão que geram passivos.

### 2. Falta de Controle de Jornada
Ausência de ponto eletrônico ou registros inconsistentes são bandeiras vermelhas.

### 3. Pagamentos "Por Fora"
Qualquer pagamento não registrado é um passivo potencial esperando para explodir.

### 4. Terceirização Irregular
Terceirização que mascara relação de emprego é uma das maiores fontes de passivos.

## Como Prevenir

### Auditoria Preventiva
Realize auditorias internas regularmente. É melhor descobrir o problema antes do funcionário.

### Políticas Claras e Documentadas
Tenha políticas de RH bem definidas e garanta que sejam seguidas consistentemente.

### Treinamento de Gestores
Muitos passivos surgem de decisões equivocadas de gestores não treinados.

### Controles Robustos
Sistemas adequados de controle de ponto, registro de pagamentos e documentação de processos.

### Regularização Proativa
Ao identificar um problema, regularize imediatamente. Quanto mais tempo passa, maior o passivo.

## O Custo da Negligência

Vi casos onde empresas pagaram mais em passivos trabalhistas do que gastaram em folha de pagamento em anos de operação. A conta sempre chega.

## Conclusão

Prevenção de passivos trabalhistas não é paranoia - é gestão responsável. O custo de manter conformidade é sempre menor que o custo de corrigir anos de irregularidades.`,
    author: 'Jennifer Barreto',
    tags: ['direito do trabalho', 'compliance', 'passivos trabalhistas'],
    publishedAt: new Date('2024-01-28'),
    status: 'PUBLISHED',
  },
  {
    title: 'O óbvio precisa ser dito: A importância dos POPs no ambiente corporativo',
    slug: 'pops-ambiente-corporativo',
    excerpt:
      'Procedimentos Operacionais Padrão não são apenas documentos burocráticos. São ferramentas poderosas de gestão e proteção legal. Veja como transformar expectativas implícitas em regras explícitas.',
    content: `# O óbvio precisa ser dito: A importância dos POPs no ambiente corporativo

Procedimentos Operacionais Padrão não são burocracia - são ferramentas estratégicas de gestão e proteção legal.

## Por Que "O Óbvio" Precisa Estar Escrito

O que é óbvio para você pode não ser para seu colaborador. O que você considera senso comum pode ser completamente desconhecido para alguém com background diferente.

## O Que São POPs

Procedimentos Operacionais Padrão são documentos que descrevem, passo a passo, como executar atividades específicas na empresa.

**Exemplo simples:**
Não basta dizer "atenda bem o cliente". Um POP detalha:
- Como atender o telefone
- Quais informações coletar
- Como registrar a interação
- Quando e como escalar problemas
- Prazos de resposta

## Benefícios Operacionais

### 1. Padronização
Todos executam a tarefa da mesma forma, com o mesmo padrão de qualidade.

### 2. Treinamento
Novos colaboradores aprendem mais rápido e com menos dependência de outros.

### 3. Melhoria Contínua
Processos documentados podem ser analisados e melhorados sistematicamente.

### 4. Escalabilidade
Crescer sem POPs é impossível. A qualidade se dilui com o crescimento.

## Benefícios Jurídicos

POPs são proteção legal em múltiplas situações:

### Em Ações Trabalhistas
Demonstram que a empresa forneceu diretrizes claras e treinou adequadamente.

### Em Questões Regulatórias
Provam conformidade com normas do setor.

### Em Litígios Comerciais
Mostram que processos foram seguidos adequadamente.

## Como Implementar POPs Efetivos

### 1. Comece Pelos Processos Críticos
Não tente documentar tudo de uma vez. Priorize o que tem maior impacto.

### 2. Envolva Quem Executa
Os melhores POPs são criados com a participação de quem faz o trabalho no dia a dia.

### 3. Seja Visual Quando Possível
Fluxogramas, checklists e imagens facilitam o entendimento.

### 4. Mantenha Atualizado
POP desatualizado é pior que não ter POP.

### 5. Treine e Monitore
Não basta criar - é preciso treinar as pessoas e verificar se estão seguindo.

## Erro Comum

O maior erro é criar POPs excessivamente complexos que ninguém usa. POPs devem ser práticos, diretos e realmente úteis no dia a dia.

## Conclusão

POPs são a diferença entre uma empresa que funciona com base em conhecimento tribal e uma organização profissional e escalável. Mais que isso, são proteção legal valiosa quando problemas surgem.

Invista tempo em documentar seus processos. Seu "eu" do futuro - e seus advogados - agradecerão.`,
    author: 'Jennifer Barreto',
    tags: ['POPs', 'gestão', 'compliance', 'processos'],
    publishedAt: new Date('2024-01-20'),
    status: 'PUBLISHED',
  },
];

async function main() {
  console.log('🌱 Iniciando seed de posts do blog...');

  for (const post of blogPosts) {
    try {
      // Verificar se o post já existe
      const existing = await prisma.blogPost.findUnique({
        where: { slug: post.slug },
      });

      if (existing) {
        console.log(`⏭️  Post "${post.title}" já existe, pulando...`);
        continue;
      }

      const created = await prisma.blogPost.create({
        data: post,
      });

      console.log(`✅ Post criado: "${created.title}" (${created.slug})`);
    } catch (error) {
      console.error(`❌ Erro ao criar post "${post.title}":`, error.message);
    }
  }

  console.log('\n✨ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
