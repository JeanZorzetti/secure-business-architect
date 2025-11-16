const { Client } = require('pg');

const connectionString = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';

async function checkSlugs() {
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('✓ Conectado ao banco de dados\n');

    // Listar todos os posts
    const result = await client.query(`
      SELECT id, slug, title, LENGTH(excerpt) as excerpt_length, excerpt
      FROM posts
      ORDER BY "createdAt" DESC
    `);

    console.log(`📚 Total de posts no banco: ${result.rows.length}\n`);

    result.rows.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Excerpt (${post.excerpt_length} chars): ${post.excerpt}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await client.end();
  }
}

checkSlugs();
