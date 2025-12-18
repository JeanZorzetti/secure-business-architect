const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATABASE_URL = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';
const pool = new Pool({ connectionString: DATABASE_URL });

// Read the markdown file directly with Node.js encoding handling
const articlePath = path.join(__dirname, '../docs/ARTIGOS-CONVERTIDOS/Rescisão Antecipada em Contratos de Integração - Lições de um Caso Prático (1) (1).md');
const content = fs.readFileSync(articlePath, 'utf8');

const artigo = {
  id: crypto.randomUUID(),
  title: 'Rescisão Antecipada em Contratos de Integração: Lições de um Caso Prático',
  slug: 'rescisao-antecipada-contratos-integracao',
  excerpt: 'Análise prática sobre rescisão antecipada em contratos de integração, custos envolvidos, responsabilidades das partes e como evitar litígios milionários através de cláusulas bem elaboradas.',
  content: content,
  coverImage: '/uploads/images/rescisao-contratos-cover.png',
  category: 'Direito Empresarial',
  tags: ['contratos', 'rescisão antecipada', 'contratos de integração', 'indenização', 'litígio empresarial', 'cláusulas contratuais'],
  author: 'Jennifer Barreto',
  status: 'PUBLISHED',
  publishedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

async function publishArticle() {
  console.log('📝 Publicando artigo: Rescisão Antecipada em Contratos de Integração\n');

  try {
    const result = await pool.query(`
      INSERT INTO blog_posts (
        id, title, slug, excerpt, content, "coverImage", category, tags,
        author, status, "publishedAt", "createdAt", "updatedAt"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id, slug, title
    `, [
      artigo.id,
      artigo.title,
      artigo.slug,
      artigo.excerpt,
      artigo.content,
      artigo.coverImage,
      artigo.category,
      artigo.tags,
      artigo.author,
      artigo.status,
      artigo.publishedAt,
      artigo.createdAt,
      artigo.updatedAt
    ]);

    console.log('✅ Artigo publicado com sucesso!\n');
    console.log(`📌 ID: ${result.rows[0].id}`);
    console.log(`📝 Título: ${result.rows[0].title}`);
    console.log(`🔗 Slug: ${result.rows[0].slug}`);
    console.log(`🌐 URL: https://jbadvocacia.roilabs.com.br/conteudo/${result.rows[0].slug}\n`);
    console.log(`📊 Estatísticas:`);
    console.log(`   - Palavras: ~1.276`);
    console.log(`   - Caracteres: ~8.994`);
    console.log(`   - Tempo de leitura: 5 min\n`);

  } catch (error) {
    if (error.code === '23505') {
      console.error('❌ Erro: Artigo com esse slug já existe no banco de dados.');
      console.error('💡 Use outro slug ou atualize o artigo existente.\n');
    } else {
      console.error('❌ Erro ao publicar artigo:', error.message);
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
}

publishArticle();
