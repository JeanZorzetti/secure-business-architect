const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = 'postgresql://jennifer:PAzo18**@31.97.23.166:5435/jennifer?schema=public';
const pool = new Pool({ connectionString: DATABASE_URL });

// Mapeamento: slug -> arquivo markdown
const artigos = [
  {
    slug: 'contratacao-vendedores-externos-riscos-trabalhistas',
    arquivo: 'Artigo empregados externos.md'
  },
  {
    slug: 'inaplicabilidade-cdc-contratos-locacao-imobiliaria',
    arquivo: 'Artigo não aplicação do CDC em contratos de locação.md'
  },
  {
    slug: 'justa-causa-furto-onus-prova-empresa',
    arquivo: 'Justa causa - ônus da prova.md'
  }
];

async function atualizarArtigos() {
  console.log('🔄 Iniciando atualização dos artigos no banco de dados...\n');

  const results = [];

  for (let i = 0; i < artigos.length; i++) {
    const { slug, arquivo } = artigos[i];
    const caminhoArquivo = path.join(__dirname, '../docs/ARTIGOS-CONVERTIDOS', arquivo);

    console.log(`📝 Artigo ${i + 1}/3: ${slug}`);

    try {
      // Ler conteúdo atualizado do arquivo
      if (!fs.existsSync(caminhoArquivo)) {
        throw new Error(`Arquivo não encontrado: ${caminhoArquivo}`);
      }

      const novoConteudo = fs.readFileSync(caminhoArquivo, 'utf8');

      console.log(`   📄 Conteúdo lido: ${novoConteudo.length} caracteres`);

      // Atualizar no banco de dados
      const result = await pool.query(`
        UPDATE blog_posts
        SET content = $1, "updatedAt" = NOW()
        WHERE slug = $2
        RETURNING id, slug, title
      `, [novoConteudo, slug]);

      if (result.rowCount === 0) {
        throw new Error(`Artigo com slug "${slug}" não encontrado no banco`);
      }

      console.log(`   ✅ Atualizado com sucesso!`);
      console.log(`   📌 ID: ${result.rows[0].id}`);
      console.log(`   🔗 URL: https://jbadvocacia.roilabs.com.br/conteudo/${slug}\n`);

      results.push({
        success: true,
        slug: slug,
        title: result.rows[0].title,
        contentLength: novoConteudo.length
      });

    } catch (error) {
      console.error(`   ❌ Erro: ${error.message}\n`);
      results.push({
        success: false,
        slug: slug,
        error: error.message
      });
    }
  }

  // Resumo final
  console.log('='.repeat(70));
  console.log('📊 RESUMO DA ATUALIZAÇÃO\n');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Atualizados com sucesso: ${successful.length}/3`);
  console.log(`❌ Falhas: ${failed.length}/3\n`);

  if (successful.length > 0) {
    console.log('✅ Artigos atualizados:');
    successful.forEach(r => {
      console.log(`   - ${r.title}`);
      console.log(`     🔗 https://jbadvocacia.roilabs.com.br/conteudo/${r.slug}`);
      console.log(`     📝 ${r.contentLength} caracteres`);
    });
  }

  if (failed.length > 0) {
    console.log('\n❌ Artigos com erro:');
    failed.forEach(r => {
      console.log(`   - ${r.slug}: ${r.error}`);
    });
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n✅ Atualização concluída!\n');
  console.log('💡 Dica: Acesse os URLs acima para verificar as mudanças no site.\n');

  await pool.end();
}

atualizarArtigos().catch(error => {
  console.error('❌ Erro geral:', error);
  pool.end();
  process.exit(1);
});
