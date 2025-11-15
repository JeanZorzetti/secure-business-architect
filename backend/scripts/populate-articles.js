/**
 * Script para popular os 11 artigos do blog com conteúdo HTML
 *
 * Execução: node backend/scripts/populate-articles.js
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises;
const path = require('path');

const prisma = new PrismaClient();

// Mapeamento slug -> arquivo HTML
const articlesMap = {
  'gestao-contratos-lucratividade': 'gestao-contratos-lucratividade.html',
  'sociedade-50-50-riscos': 'sociedade-50-50-riscos.html',
  'contrato-parceria-agronegocio': 'contrato-parceria-agronegocio.html',
  'contrato-social-acordo-socios': 'contrato-social-acordo-socios.html',
  'due-diligence-checklist': 'due-diligence-checklist.html',
  'clausulas-essenciais-contratos': 'clausulas-essenciais-contratos.html',
  'negociacao-estrategica-contratos': 'negociacao-estrategica-contratos.html',
  'passivos-trabalhistas-prevencao': 'passivos-trabalhistas-prevencao.html',
  'pops-ambiente-corporativo': 'pops-ambiente-corporativo.html',
  'importancia-due-diligence-ma': 'importancia-due-diligence-ma.html',
  'contratos-empresariais-clausulas-essenciais': 'contratos-empresariais-clausulas-essenciais.html',
};

async function populateArticles() {
  console.log('🚀 Iniciando população dos artigos...\n');

  const articlesDir = path.join(__dirname, '../../docs/artigos');
  let updated = 0;
  let notFound = 0;
  const errors = [];

  for (const [slug, filename] of Object.entries(articlesMap)) {
    try {
      // Verificar se o post existe no banco
      const post = await prisma.blogPost.findUnique({
        where: { slug },
      });

      if (!post) {
        console.log(`⚠️  Post não encontrado: ${slug}`);
        notFound++;
        continue;
      }

      // Ler conteúdo HTML
      const htmlPath = path.join(articlesDir, filename);
      const htmlContent = await fs.readFile(htmlPath, 'utf-8');

      // Atualizar post com novo conteúdo
      await prisma.blogPost.update({
        where: { slug },
        data: {
          content: htmlContent,
          updatedAt: new Date(),
        },
      });

      console.log(`✅ Atualizado: ${slug}`);
      updated++;
    } catch (error) {
      console.error(`❌ Erro ao processar ${slug}:`, error.message);
      errors.push({ slug, error: error.message });
    }
  }

  console.log('\n📊 RESUMO:');
  console.log(`   ✅ Atualizados: ${updated}`);
  console.log(`   ⚠️  Não encontrados: ${notFound}`);
  console.log(`   ❌ Erros: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\n🔥 ERROS DETALHADOS:');
    errors.forEach(({ slug, error }) => {
      console.log(`   - ${slug}: ${error}`);
    });
  }

  if (updated > 0) {
    console.log('\n✨ Artigos populados com sucesso!');
  }
}

populateArticles()
  .catch((error) => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
