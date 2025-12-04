const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATABASE_URL = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';
const pool = new Pool({ connectionString: DATABASE_URL });

function generateUUID() {
  return crypto.randomUUID();
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Artigo 1: Contratação de Vendedores Externos
const artigo1 = {
  title: 'Contratação de Vendedores Externos: Principais Riscos Trabalhistas e Como Evitá-los',
  slug: 'contratacao-vendedores-externos-riscos-trabalhistas',
  excerpt: 'A contratação de empregados externos envolve riscos trabalhistas importantes. Entenda os principais cuidados que empresas precisam ter com comissão, controle de jornada e enquadramento no art. 62 da CLT.',
  category: 'Direito Trabalhista',
  tags: ['trabalhista', 'vendedores externos', 'comissão', 'controle de jornada', 'CLT'],
  author: 'Jennifer Barreto',
  coverImage: null, // Sem imagem de capa
  status: 'PUBLISHED',
  content: fs.readFileSync(
    path.join(__dirname, '../docs/ARTIGOS-CONVERTIDOS/Artigo empregados externos.md'),
    'utf8'
  )
};

// Artigo 2: CDC e Locação
const artigo2 = {
  title: 'A Inaplicabilidade do Código de Defesa do Consumidor aos Contratos de Locação Imobiliária',
  slug: 'inaplicabilidade-cdc-contratos-locacao-imobiliaria',
  excerpt: 'O STJ consolidou entendimento de que o CDC não se aplica aos contratos de locação regidos pela Lei nº 8.245/1991. Entenda as consequências práticas dessa orientação jurisprudencial.',
  category: 'Direito Imobiliário',
  tags: ['direito imobiliário', 'CDC', 'locação', 'STJ', 'Lei do Inquilinato'],
  author: 'Jennifer Barreto',
  coverImage: null,
  status: 'PUBLISHED',
  content: fs.readFileSync(
    path.join(__dirname, '../docs/ARTIGOS-CONVERTIDOS/Artigo não aplicação do CDC em contratos de locação.md'),
    'utf8'
  )
};

// Artigo 3: Justa Causa por Furto
const artigo3 = {
  title: 'Justa Causa por Furto: Como a Empresa Deve Agir para Manter a Penalidade',
  slug: 'justa-causa-furto-onus-prova-empresa',
  excerpt: 'Casos de furto no ambiente de trabalho exigem prova robusta da empresa. Saiba como proceder para manter a justa causa perante a Justiça do Trabalho e evitar rescisão indireta com danos morais.',
  category: 'Direito Trabalhista',
  tags: ['trabalhista', 'justa causa', 'furto', 'ônus da prova', 'improbidade'],
  author: 'Jennifer Barreto',
  coverImage: null,
  status: 'PUBLISHED',
  content: fs.readFileSync(
    path.join(__dirname, '../docs/ARTIGOS-CONVERTIDOS/Justa causa - ônus da prova.md'),
    'utf8'
  )
};

async function publishArticles() {
  try {
    console.log('🚀 Iniciando publicação dos 3 artigos convertidos...\n');

    const articles = [artigo1, artigo2, artigo3];
    const results = [];

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const id = generateUUID();
      const now = new Date();

      console.log(`📝 Publicando artigo ${i + 1}/3: "${article.title}"`);

      try {
        const result = await pool.query(`
          INSERT INTO blog_posts (
            id, title, slug, content, excerpt, category, tags, author,
            "coverImage", status, "publishedAt", "updatedAt", "createdAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          RETURNING id, slug, title
        `, [
          id,
          article.title,
          article.slug,
          article.content,
          article.excerpt,
          article.category,
          article.tags,
          article.author,
          article.coverImage,
          article.status,
          now,
          now,
          now
        ]);

        console.log(`   ✅ Publicado com sucesso!`);
        console.log(`   📌 ID: ${result.rows[0].id}`);
        console.log(`   🔗 Slug: ${result.rows[0].slug}`);
        console.log(`   📄 URL: https://jbadvocacia.roilabs.com.br/conteudo/${result.rows[0].slug}\n`);

        results.push({
          success: true,
          title: article.title,
          slug: result.rows[0].slug,
          id: result.rows[0].id
        });
      } catch (error) {
        console.error(`   ❌ Erro ao publicar: ${error.message}\n`);
        results.push({
          success: false,
          title: article.title,
          error: error.message
        });
      }
    }

    // Resumo final
    console.log('='.repeat(70));
    console.log('📊 RESUMO DA PUBLICAÇÃO\n');

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✅ Publicados com sucesso: ${successful.length}/3`);
    console.log(`❌ Falhas: ${failed.length}/3\n`);

    if (successful.length > 0) {
      console.log('✅ Artigos publicados:');
      successful.forEach(r => {
        console.log(`   - ${r.title}`);
        console.log(`     🔗 https://jbadvocacia.roilabs.com.br/conteudo/${r.slug}`);
      });
    }

    if (failed.length > 0) {
      console.log('\n❌ Artigos com erro:');
      failed.forEach(r => {
        console.log(`   - ${r.title}: ${r.error}`);
      });
    }

    console.log('\n' + '='.repeat(70));
    console.log('\n✅ Processo concluído!\n');

    await pool.end();
  } catch (error) {
    console.error('❌ Erro geral:', error);
    await pool.end();
    process.exit(1);
  }
}

publishArticles();
