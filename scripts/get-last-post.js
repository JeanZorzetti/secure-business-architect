const { Pool } = require('pg');

// Direct connection string
const DATABASE_URL = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';
const pool = new Pool({ connectionString: DATABASE_URL });

async function getLastPost() {
  const result = await pool.query(`
    SELECT
      id, title, slug, content, excerpt,
      "publishedAt", "updatedAt", author,
      "coverImage", tags, category
    FROM blog_posts
    WHERE status = 'PUBLISHED'
    ORDER BY "publishedAt" DESC
    LIMIT 1
  `);

  if (result.rows.length > 0) {
    const post = result.rows[0];
    console.log('ÚLTIMO ARTIGO PUBLICADO:');
    console.log('========================');
    console.log('Título:', post.title);
    console.log('Slug:', post.slug);
    console.log('Autor:', post.author);
    console.log('Publicado em:', post.publishedAt);
    console.log('Categoria:', post.category);
    console.log('Tags:', JSON.stringify(post.tags));
    console.log('Excerpt length:', post.excerpt?.length || 0, 'chars');
    console.log('Content length:', post.content?.length || 0, 'chars');
    console.log('\n--- EXCERPT ---');
    console.log(post.excerpt);
    console.log('\n--- PRIMEIROS 2000 CHARS DO CONTENT ---');
    console.log(post.content?.substring(0, 2000) || 'No content');

    // Análise de estrutura
    console.log('\n--- ANÁLISE DE ESTRUTURA ---');
    const h1Count = (post.content?.match(/<h1/gi) || []).length + (post.content?.match(/^# /gm) || []).length;
    const h2Count = (post.content?.match(/<h2/gi) || []).length + (post.content?.match(/^## /gm) || []).length;
    const h3Count = (post.content?.match(/<h3/gi) || []).length + (post.content?.match(/^### /gm) || []).length;
    const linkCount = (post.content?.match(/<a /gi) || []).length + (post.content?.match(/\[.*?\]\(.*?\)/g) || []).length;
    const imgCount = (post.content?.match(/<img /gi) || []).length + (post.content?.match(/!\[.*?\]\(.*?\)/g) || []).length;

    console.log('H1 tags:', h1Count);
    console.log('H2 tags:', h2Count);
    console.log('H3 tags:', h3Count);
    console.log('Links internos/externos:', linkCount);
    console.log('Imagens:', imgCount);
    console.log('Palavras aproximadas:', Math.round((post.content?.length || 0) / 5.5));
  } else {
    console.log('Nenhum post publicado encontrado');
  }

  await pool.end();
}

getLastPost().catch(console.error);
