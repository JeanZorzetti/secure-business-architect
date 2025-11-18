const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public'
});

async function run() {
  await client.connect();
  
  const result = await client.query(`
    SELECT slug, title, status
    FROM blog_posts
    ORDER BY slug
  `);
  
  console.log(`Total de posts no banco: ${result.rows.length}\n`);
  console.log('PUBLISHED posts:\n');
  
  const published = result.rows.filter(r => r.status === 'PUBLISHED');
  published.forEach(row => {
    console.log(`https://jbadvocacia.roilabs.com.br/conteudo/${row.slug}`);
  });
  
  console.log(`\n\nTotal PUBLISHED: ${published.length}`);
  
  await client.end();
}

run();
