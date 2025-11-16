const { Client } = require('pg');

const connectionString = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';

async function listPosts() {
  const client = new Client({ connectionString });

  try {
    await client.connect();

    const result = await client.query(`
      SELECT id, slug, title, LENGTH(excerpt) as len
      FROM blog_posts
      WHERE slug LIKE '%contrato%' OR slug LIKE '%diligence%' OR slug LIKE '%sociedade%'
      ORDER BY slug
    `);

    result.rows.forEach(post => {
      console.log(`${post.slug} (${post.len} chars)`);
    });

  } catch (error) {
    console.error('Erro:', error.message);
  } finally {
    await client.end();
  }
}

listPosts();
