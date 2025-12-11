const { Pool } = require('pg');

const DATABASE_URL = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';
const pool = new Pool({ connectionString: DATABASE_URL });

const SLUG_TO_HIDE = 'inaplicabilidade-cdc-contratos-locacao-imobiliaria';

async function hideArticle() {
  console.log(`🔒 Ocultando artigo: ${SLUG_TO_HIDE}\n`);

  try {
    // Atualizar status para DRAFT (não publicado)
    const result = await pool.query(`
      UPDATE blog_posts
      SET status = 'DRAFT', "updatedAt" = NOW()
      WHERE slug = $1
      RETURNING id, slug, title, status
    `, [SLUG_TO_HIDE]);

    if (result.rowCount === 0) {
      console.error(`❌ Artigo com slug "${SLUG_TO_HIDE}" não encontrado no banco\n`);
      process.exit(1);
    }

    const article = result.rows[0];

    console.log('✅ Artigo ocultado com sucesso!\n');
    console.log(`📌 ID: ${article.id}`);
    console.log(`📝 Título: ${article.title}`);
    console.log(`🔗 Slug: ${article.slug}`);
    console.log(`📊 Status: ${article.status}`);
    console.log(`\n💡 O artigo não aparecerá mais na listagem do blog.`);
    console.log(`💡 URL ainda existe mas retornará 404: https://jbadvocacia.roilabs.com.br/conteudo/${article.slug}\n`);

  } catch (error) {
    console.error('❌ Erro ao ocultar artigo:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

hideArticle();
