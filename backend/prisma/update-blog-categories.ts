import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoryMapping: Record<string, string> = {
  'gestao-contratos-lucratividade': 'Contratos',
  'sociedade-50-50-riscos': 'Societário',
  'contrato-parceria-agronegocio': 'Agronegócio',
  'contrato-social-acordo-socios': 'Societário',
  'due-diligence-checklist': 'M&A',
  'clausulas-essenciais-contratos': 'Contratos',
  'negociacao-estrategica-contratos': 'Negociação',
  'passivos-trabalhistas-prevencao': 'Trabalhista',
  'pops-ambiente-corporativo': 'Compliance',
};

async function main() {
  console.log('🔄 Atualizando categorias dos posts...');

  for (const [slug, category] of Object.entries(categoryMapping)) {
    const updated = await prisma.blogPost.update({
      where: { slug },
      data: { category },
    });

    console.log(`✅ Post "${slug}" atualizado com categoria "${category}"`);
  }

  console.log('\n✨ Categorias atualizadas com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
