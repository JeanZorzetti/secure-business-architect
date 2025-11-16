import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Scale, FileText, Users, ShieldCheck, Award, Target } from "lucide-react";
import NumberTicker from "@/components/ui/number-ticker";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import TestimonialCard from "@/components/testimonial-card";
import BlogCard from "@/components/blog-card";
import { getPosts } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Jennifer Barreto - Advocacia Empresarial Estratégica | 12 Anos de Experiência',
  description: 'Advocacia empresarial com foco em estratégia, não apenas documentos. Contratos, societário, due diligence e agronegócio. 12 anos protegendo empresas.',
  keywords: 'advocacia empresarial, contratos estratégicos, due diligence, direito societário, agronegócio, consultoria jurídica empresarial',
  alternates: {
    canonical: 'https://jbadvocacia.roilabs.com.br',
  },
  openGraph: {
    title: 'Jennifer Barreto - Advocacia Empresarial Estratégica | 12 Anos de Experiência',
    description: 'Advocacia empresarial com foco em estratégia. 12 anos protegendo empresas.',
    url: 'https://jbadvocacia.roilabs.com.br',
    siteName: 'Jennifer Barreto Advocacia',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://jbadvocacia.roilabs.com.br/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jennifer Barreto - Advocacia Empresarial Estratégica',
      },
    ],
  },
};

export default async function Home() {
  const testimonials1 = [
    {
      name: "Marcos Silva",
      role: "CEO",
      company: "Tech Solutions",
      content:
        "Jennifer não apenas elaborou nossos contratos, ela nos ajudou a entender os riscos do negócio antes mesmo de começarmos a negociar. Isso mudou completamente nossa forma de operar.",
      rating: 5,
    },
    {
      name: "Ana Paula Costa",
      role: "Proprietária",
      company: "AgroCosta",
      content:
        "Finalmente encontrei uma advogada que fala a língua do empresário. A clareza dela em explicar questões complexas me deu a confiança que eu precisava para tomar decisões importantes.",
      rating: 5,
    },
    {
      name: "Roberto Fernandes",
      role: "Diretor Financeiro",
      company: "Logística Premium",
      content:
        "A due diligence conduzida pela Jennifer nos salvou de uma aquisição problemática. Ela identificou passivos ocultos que poderiam ter custado milhões.",
      rating: 5,
    },
  ];

  const testimonials2 = [
    {
      name: "Carla Mendes",
      role: "Sócia",
      company: "Boutique Fashion",
      content:
        "A estruturação societária que fizemos com a Jennifer preveniu conflitos que certamente teriam surgido. Hoje nossa sociedade funciona como um relógio.",
      rating: 5,
    },
    {
      name: "Pedro Augusto",
      role: "Empresário",
      company: "Construtora Horizonte",
      content:
        "Os contratos trabalhistas e POPs criados reduziram drasticamente nossos processos. O investimento se pagou em menos de 6 meses.",
      rating: 5,
    },
    {
      name: "Juliana Santos",
      role: "Gerente Geral",
      company: "Rede de Restaurantes",
      content:
        "Contratar a Jennifer foi uma das melhores decisões que tomamos. Ela entende de negócios, não só de leis. Faz toda a diferença.",
      rating: 5,
    },
  ];

  // Fetch latest blog posts dynamically
  let blogPosts: Array<{
    title: string;
    excerpt: string;
    date: string;
    slug: string;
  }> = [];
  try {
    const data = await getPosts({ limit: 6 });
    blogPosts = data.posts.map(post => ({
      title: post.title,
      excerpt: post.excerpt,
      date: post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : 'Data não disponível',
      slug: post.slug,
    }));
  } catch (error) {
    console.error('[HomePage] Failed to fetch blog posts:', error);
    // Fallback to empty array if API fails
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-primary-foreground pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-100"
            style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "center center", opacity: 1 }}
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Texture Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(/assets/hero-texture.png)`,
            backgroundSize: "auto",
            backgroundRepeat: "repeat",
            backgroundPosition: "center center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "multiply",
          }}
        />

        {/* Left Image - Behind texture */}
        <div className="absolute left-0 top-0 bottom-0 w-1/4 z-5 hidden lg:block">
          <img
            src="/assets/hero-left.avif"
            alt="Padrão decorativo geométrico em tons de dourado para advocacia empresarial"
            className="h-full w-full object-cover"
            style={{ objectFit: "cover", objectPosition: "50% 50%", width: "100%" }}
          />
        </div>

        {/* Right Image - Lawyer portrait */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 z-20 hidden lg:block">
          <img
            src="/assets/hero-right.avif"
            alt="Jennifer Barreto, advogada empresarial especializada em contratos e direito societário"
            className="h-full w-full"
            style={{ objectFit: "contain", objectPosition: "center bottom", width: "100%", height: "100%" }}
          />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-30">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fadeInUp text-white drop-shadow-2xl">
              Seus contratos são a
              <span className="text-accent"> fortaleza </span>
              ou o ponto fraco do seu negócio?
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 animate-fadeInUp-delay-1 drop-shadow-xl">
              Com 12 anos de experiência, aprendi que não há contrato bom que
              salve um negócio ruim. Minha missão é garantir que a sua
              estratégia de negócio seja a base para contratos que protegem e
              impulsionam seu crescimento.
            </p>
            <div className="animate-fadeInUp-delay-2">
              <Button variant="hero" size="xl" asChild className="group">
                <Link href="/contato">
                  Agendar Diagnóstico Estratégico
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-fadeInUp">
              <div className="flex items-center justify-center mb-3">
                <Award className="h-8 w-8 text-accent mr-2" />
                <NumberTicker
                  value={12}
                  className="text-5xl md:text-6xl font-bold text-primary"
                />
              </div>
              <p className="text-lg font-medium text-muted-foreground">
                Anos de Experiência
              </p>
            </div>

            <div className="text-center animate-fadeInUp-delay-1">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-accent mr-2" />
                <NumberTicker
                  value={500}
                  className="text-5xl md:text-6xl font-bold text-primary"
                />
                <span className="text-5xl md:text-6xl font-bold text-primary">+</span>
              </div>
              <p className="text-lg font-medium text-muted-foreground">
                Clientes Atendidos
              </p>
            </div>

            <div className="text-center animate-fadeInUp-delay-2">
              <div className="flex items-center justify-center mb-3">
                <Target className="h-8 w-8 text-accent mr-2" />
                <NumberTicker
                  value={95}
                  className="text-5xl md:text-6xl font-bold text-primary"
                />
                <span className="text-5xl md:text-6xl font-bold text-primary">%</span>
              </div>
              <p className="text-lg font-medium text-muted-foreground">
                Taxa de Sucesso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Estratégia Antes da Minuta
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              O trabalho jurídico não começa na redação de um documento. Ele
              começa na estratégia do negócio, na negociação, na análise de
              risco e na compreensão profunda do que você realmente precisa para
              prosperar com segurança.
            </p>
            <p className="text-lg text-muted-foreground">
              Não vendemos documentos. Vendemos clareza, proteção e visão de
              longo prazo. A advocacia estratégica combina rigor técnico com o
              entendimento real de fluxo de caixa, operação e manejo de negócios.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - Bento Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Áreas de Atuação Estratégica
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluções jurídicas focadas em resultados concretos para o seu
              negócio
            </p>
          </div>
          <BentoGrid>
            <BentoGridItem
              icon={<Scale className="h-10 w-10" />}
              title="Negociações e Contratos que Geram Lucratividade"
              description="Acompanhamento estratégico em negociações. Contratos elaborados com foco em proteger seus interesses e maximizar resultados financeiros."
              featured={true}
            />
            <BentoGridItem
              icon={<FileText className="h-8 w-8" />}
              title="Estruturação Societária para Evitar Conflitos"
              description="Definição clara de papéis, direitos e deveres dos sócios. Prevenção de impasses e alinhamento de visões para o futuro da empresa."
            />
            <BentoGridItem
              icon={<ShieldCheck className="h-8 w-8" />}
              title="Due Diligence para Aquisições Seguras"
              description="Análise minuciosa de riscos antes de compras ou fusões. Identificação de passivos ocultos e garantia de decisões embasadas."
            />
            <BentoGridItem
              icon={<Users className="h-8 w-8" />}
              title="Blindagem Trabalhista com Procedimentos Claros"
              description="Criação de POPs, Regimentos e Manuais de Conduta. Redução de riscos trabalhistas através da documentação adequada."
            />
          </BentoGrid>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Para Quem Eu Trabalho
            </h2>
            <div className="bg-card p-8 rounded-lg shadow-elegant border border-border">
              <p className="text-lg mb-6">
                Você domina seu produto. Você conhece cada detalhe da sua
                operação. Mas quando chega a hora de negociar, de revisar um
                contrato complexo ou de estruturar uma sociedade, você se sente
                vulnerável?
              </p>
              <p className="text-lg mb-6">
                Eu entendo perfeitamente. Não é falta de inteligência ou
                competência. É que o direito empresarial exige anos de estudo e
                prática. E você precisa focar no que faz melhor: fazer sua
                empresa crescer.
              </p>
              <p className="text-lg font-semibold text-accent">
                Meu trabalho é ser sua parceira estratégica nessa mesa. Traduzir
                o "juridiquês" em linguagem de negócios e garantir que cada
                decisão seja tomada com total clareza e segurança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Marquee */}
      <section className="py-20 bg-secondary/50 overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center animate-fadeInUp">
            O Que Meus Clientes Dizem
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
            Confiança construída através de resultados concretos
          </p>
        </div>

        {/* Row 1 - Direction: Left to Right */}
        <Marquee pauseOnHover className="[--duration:40s] mb-6">
          {testimonials1.map((testimonial, index) => (
            <TestimonialCard key={`testimonial1-${index}`} {...testimonial} />
          ))}
        </Marquee>

        {/* Row 2 - Direction: Right to Left */}
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {testimonials2.map((testimonial, index) => (
            <TestimonialCard key={`testimonial2-${index}`} {...testimonial} />
          ))}
        </Marquee>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Da Minha Mesa
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights práticos sobre direito empresarial e estratégia de
              negócios
            </p>
          </div>
          {blogPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <Link href="/conteudo">Ver todos os artigos</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Novos artigos em breve. Fique atento!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vamos construir juntos as bases seguras para o futuro da sua empresa?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            Agende uma Sessão de Diagnóstico Estratégico e descubra como
            transformar seus contratos em ferramentas de crescimento.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link href="/contato">Fale Comigo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
