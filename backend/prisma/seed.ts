import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin@123456', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@securebusinessarchitect.com' },
    update: {},
    create: {
      email: 'admin@securebusinessarchitect.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Seed services
  const services = [
    {
      title: 'Consultoria Jurídica Estratégica',
      slug: 'consultoria-juridica-estrategica',
      icon: 'Scale',
      description:
        'Análise profunda do seu negócio para identificar riscos jurídicos e oportunidades de crescimento sustentável.',
      benefits: [
        'Análise de riscos jurídicos',
        'Planejamento estratégico',
        'Compliance empresarial',
        'Due diligence',
      ],
      order: 1,
      isActive: true,
    },
    {
      title: 'Gestão de Contratos',
      slug: 'gestao-contratos',
      icon: 'FileText',
      description:
        'Elaboração, revisão e gestão completa de contratos empresariais com foco em segurança jurídica.',
      benefits: [
        'Elaboração de contratos personalizados',
        'Revisão jurídica detalhada',
        'Negociação de cláusulas',
        'Gestão de portfólio contratual',
      ],
      order: 2,
      isActive: true,
    },
    {
      title: 'Estruturação Societária',
      slug: 'estruturacao-societaria',
      icon: 'Building2',
      description:
        'Estruturação e reestruturação societária para otimização tributária e governança corporativa.',
      benefits: [
        'Constituição de empresas',
        'Planejamento tributário',
        'Governança corporativa',
        'Reorganizações societárias',
      ],
      order: 3,
      isActive: true,
    },
    {
      title: 'Due Diligence',
      slug: 'due-diligence',
      icon: 'Search',
      description:
        'Análise minuciosa de aspectos jurídicos, financeiros e operacionais em processos de M&A.',
      benefits: [
        'Auditoria jurídica completa',
        'Identificação de passivos',
        'Relatórios detalhados',
        'Suporte em negociações',
      ],
      order: 4,
      isActive: true,
    },
    {
      title: 'Direito do Agronegócio',
      slug: 'direito-agronegocio',
      icon: 'Sprout',
      description:
        'Assessoria especializada para empresas do agronegócio, do campo aos mercados internacionais.',
      benefits: [
        'Contratos agrários',
        'Regularização fundiária',
        'Questões ambientais',
        'Exportação e importação',
      ],
      order: 5,
      isActive: true,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  console.log(`✅ ${services.length} services created`);

  // Seed testimonials
  const testimonials = [
    {
      clientName: 'Carlos Mendes',
      clientRole: 'CEO, TechStart Ltda',
      content:
        'O trabalho da Jennifer foi fundamental para estruturar nossa empresa de forma sólida. Sua expertise em direito empresarial nos deu segurança para crescer.',
      rating: 5,
      isPublished: true,
      order: 1,
    },
    {
      clientName: 'Maria Silva',
      clientRole: 'Diretora, AgroVale S.A.',
      content:
        'Profissional extremamente competente! Nos auxiliou em uma due diligence complexa com maestria e atenção aos detalhes.',
      rating: 5,
      isPublished: true,
      order: 2,
    },
    {
      clientName: 'João Santos',
      clientRole: 'Empresário',
      content:
        'Excelente consultoria jurídica! A abordagem estratégica da Jennifer trouxe soluções práticas para nosso negócio.',
      rating: 5,
      isPublished: true,
      order: 3,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  console.log(`✅ ${testimonials.length} testimonials created`);

  // Seed blog posts
  const blogPosts = [
    {
      title: 'A Importância da Due Diligence em Processos de M&A',
      slug: 'importancia-due-diligence-ma',
      excerpt:
        'Entenda por que a due diligence é fundamental em processos de fusões e aquisições e como ela pode proteger seu investimento.',
      content: `
# A Importância da Due Diligence em Processos de M&A

A due diligence é um processo investigativo essencial em operações de fusões e aquisições (M&A). Trata-se de uma análise minuciosa dos aspectos jurídicos, financeiros e operacionais de uma empresa antes da concretização de um negócio.

## Por que realizar Due Diligence?

1. **Identificação de Riscos**: Detectar passivos ocultos, contingências fiscais e problemas jurídicos
2. **Avaliação Precisa**: Determinar o valor real da empresa
3. **Negociação Informada**: Ter subsídios para ajustar preços e condições
4. **Proteção Legal**: Resguardar os investidores de surpresas desagradáveis

## Principais Áreas Analisadas

- Contratos e obrigações
- Propriedade intelectual
- Questões trabalhistas
- Compliance regulatório
- Aspectos tributários

A due diligence bem executada é o alicerce de uma transação segura e bem-sucedida.
      `.trim(),
      author: 'Jennifer Barreto',
      category: 'Direito Empresarial',
      tags: ['Due Diligence', 'M&A', 'Fusões', 'Aquisições'],
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
    {
      title: 'Contratos Empresariais: Cláusulas Essenciais',
      slug: 'contratos-empresariais-clausulas-essenciais',
      excerpt:
        'Conheça as cláusulas indispensáveis em contratos empresariais para garantir segurança jurídica ao seu negócio.',
      content: `
# Contratos Empresariais: Cláusulas Essenciais

Um contrato bem redigido é fundamental para proteger os interesses da sua empresa e prevenir conflitos futuros.

## Cláusulas Indispensáveis

### 1. Objeto do Contrato
Descrição clara e precisa do que está sendo contratado.

### 2. Prazo e Vigência
Definição de início, término e condições de renovação.

### 3. Preço e Forma de Pagamento
Valores, prazos e condições de pagamento detalhados.

### 4. Obrigações das Partes
Responsabilidades específicas de cada parte contratante.

### 5. Cláusula de Confidencialidade
Proteção de informações sensíveis do negócio.

### 6. Rescisão
Condições para término antecipado do contrato.

### 7. Foro
Definição da jurisdição competente para resolver conflitos.

Invista tempo na elaboração de contratos sólidos - é prevenção, não despesa!
      `.trim(),
      author: 'Jennifer Barreto',
      category: 'Contratos',
      tags: ['Contratos', 'Cláusulas', 'Direito Empresarial'],
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log(`✅ ${blogPosts.length} blog posts created`);

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
