const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATABASE_URL = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';
const pool = new Pool({ connectionString: DATABASE_URL });

// Find the file by listing directory contents
const articosDir = path.join(__dirname, '../docs/ARTIGOS-CONVERTIDOS');
const files = fs.readdirSync(articosDir);

console.log('📁 Files in ARTIGOS-CONVERTIDOS:');
files.forEach((file, index) => {
  console.log(`  ${index + 1}. ${file}`);
});

// Find the rescisão file
const rescisaoFile = files.find(f => f.toLowerCase().includes('rescis'));

if (!rescisaoFile) {
  console.error('❌ Arquivo de rescisão não encontrado!');
  process.exit(1);
}

console.log(`\n✅ Arquivo encontrado: ${rescisaoFile}\n`);

// Read the file
const articlePath = path.join(articosDir, rescisaoFile);
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

    const wordCount = content.split(/\s+/).length;
    console.log(`📊 Estatísticas:`);
    console.log(`   - Palavras: ${wordCount.toLocaleString()}`);
    console.log(`   - Caracteres: ${content.length.toLocaleString()}`);
    console.log(`   - Tempo de leitura: ${Math.ceil(wordCount / 200)} min\n`);

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
