const { Client } = require('pg');

const updates = [
  {
    slug: 'gestao-contratos-lucratividade',
    title: 'Gestão de Contratos e Lucratividade Empresarial'
  },
  {
    slug: 'contrato-parceria-agronegocio',
    title: 'Contrato de Parceria no Agronegócio'
  },
  {
    slug: 'sociedade-50-50-riscos',
    title: 'Sociedade 50/50: Riscos e Alternativas'
  },
  {
    slug: 'pops-ambiente-corporativo',
    title: 'POPs no Ambiente Corporativo: Importância'
  },
  {
    slug: 'passivos-trabalhistas-prevencao',
    title: 'Passivos Trabalhistas: Como Identificar e Prevenir'
  },
  {
    slug: 'contrato-social-acordo-socios',
    title: 'Contrato Social vs Acordo de Sócios'
  }
];

async function run() {
  const client = new Client({
    connectionString: 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public'
  });

  try {
    await client.connect();

    for (const update of updates) {
      const result = await client.query(
        'UPDATE blog_posts SET title = $1 WHERE slug = $2 RETURNING slug, LENGTH(title) as chars',
        [update.title, update.slug]
      );
      
      if (result.rowCount > 0) {
        console.log(`✓ ${result.rows[0].slug}: ${result.rows[0].chars} chars`);
      }
    }

    console.log('\n✅ Títulos otimizados!');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

run();
