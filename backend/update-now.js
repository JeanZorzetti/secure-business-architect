const { Client } = require('pg');

const updates = [
  {
    slug: 'gestao-contratos-lucratividade',
    excerpt: 'Entenda como o ciclo de vida contratual impacta seu resultado financeiro e como evitar as armadilhas mais comuns que drenam recursos da empresa.'
  },
  {
    slug: 'contrato-parceria-agronegocio',
    excerpt: 'Descubra como estruturar contratos de parceria no agronegócio que protejam ambas as partes, garantam continuidade operacional e compartilhem riscos.'
  },
  {
    slug: 'sociedade-50-50-riscos',
    excerpt: 'Divisão igualitária pode virar pesadelo. Conheça os riscos da sociedade 50/50 e alternativas inteligentes para evitar impasses nas decisões estratégicas.'
  },
  {
    slug: 'clausulas-essenciais-contratos',
    excerpt: 'Descubra as 3 cláusulas essenciais que são verdadeiras "vacinas jurídicas" para sua empresa e evitam litígios caros e demorados.'
  },
  {
    slug: 'pops-ambiente-corporativo',
    excerpt: 'POPs são ferramentas poderosas de gestão e proteção legal. Veja como transformar expectativas implícitas em regras explícitas que blindam sua empresa.'
  },
  {
    slug: 'negociacao-estrategica-contratos',
    excerpt: 'Aprenda estratégias para fechar acordos vantajosos sem comprometer relações comerciais. Negociação é sobre equilíbrio, não vitória.'
  },
  {
    slug: 'due-diligence-checklist',
    excerpt: 'Conheça os 7 pontos críticos para avaliar antes de qualquer aquisição. Due diligence adequada evita surpresas que podem custar milhões à sua empresa.'
  },
  {
    slug: 'passivos-trabalhistas-prevencao',
    excerpt: 'Identifique sinais de alerta de passivos trabalhistas e implemente cultura de compliance que protege sua empresa antes que seja tarde demais.'
  },
  {
    slug: 'contrato-social-acordo-socios',
    excerpt: 'Entenda a diferença crucial entre Contrato Social e Acordo de Sócios. Descubra quando usar cada um e por que o Acordo pode ser o mais estratégico.'
  }
];

async function run() {
  const client = new Client({
    connectionString: 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public'
  });

  try {
    await client.connect();
    console.log('✓ Conectado\n');

    for (const update of updates) {
      const result = await client.query(
        'UPDATE blog_posts SET excerpt = $1 WHERE slug = $2 RETURNING slug, LENGTH(excerpt) as chars',
        [update.excerpt, update.slug]
      );
      
      if (result.rowCount > 0) {
        console.log(`✓ ${result.rows[0].slug}: ${result.rows[0].chars} chars`);
      } else {
        console.log(`✗ ${update.slug}: NÃO ENCONTRADO`);
      }
    }

    console.log(`\n✅ Atualização concluída!`);

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

run();
