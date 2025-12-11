const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATABASE_URL = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';
const pool = new Pool({ connectionString: DATABASE_URL });

const artigo = {
  id: crypto.randomUUID(),
  title: 'Sociedade 50/50: Por Que 73% Delas Terminam em Conflito (e Como Evitar)',
  slug: 'sociedade-50-50-riscos-solucoes',
  excerpt: 'Descubra por que 73% das sociedades 50/50 enfrentam impasses graves e como estruturar corretamente sua empresa para evitar conflitos que custam R$ 50-500 mil em litígios.',
  content: fs.readFileSync(path.join(__dirname, '../docs/NOVOS-ARTIGOS/artigo-sociedade-50-50.md'), 'utf8'),
  coverImage: '/uploads/images/sociedade-50-50-cover.png',
  category: 'Direito Societário',
  tags: ['societário', 'sociedade 50 50', 'empate societário', 'acordo de sócios', 'voto de minerva', 'dissolução sociedade'],
  author: 'Jennifer Barreto',
  status: 'PUBLISHED',
  publishedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

async function publishArticle() {
  console.log('📝 Publicando artigo: Sociedade 50/50\n');

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
    console.log(`   - Palavras: ~3.200`);
    console.log(`   - Seções H2: 8`);
    console.log(`   - Subseções H3: 35+`);
    console.log(`   - FAQ: 6 perguntas`);
    console.log(`   - Links internos: 4`);
    console.log(`   - Tempo de leitura: 12 min\n`);

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
