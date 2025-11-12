import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, FileText, Users, ShieldCheck, CheckCircle, Award, TrendingUp, Target } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import BlogCard from "@/components/BlogCard";
import NumberTicker from "@/components/ui/number-ticker";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const services = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Estruturação Societária para Evitar Conflitos",
      description:
        "Definição clara de papéis, direitos e deveres dos sócios. Prevenção de impasses e alinhamento de visões para o futuro da empresa.",
    },
    {
      icon: <Scale className="h-8 w-8" />,
      title: "Negociações e Contratos que Geram Lucratividade",
      description:
        "Acompanhamento estratégico em negociações. Contratos elaborados com foco em proteger seus interesses e maximizar resultados.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Due Diligence para Aquisições Seguras",
      description:
        "Análise minuciosa de riscos antes de compras ou fusões. Identificação de passivos ocultos e garantia de decisões embasadas.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Blindagem Trabalhista com Procedimentos Claros",
      description:
        "Criação de POPs, Regimentos e Manuais de Conduta. Redução de riscos trabalhistas através da documentação adequada.",
    },
  ];

  const blogPosts = [
    {
      title: "Por que a gestão de contratos é crucial para a lucratividade?",
      excerpt:
        "Entenda como um contrato bem gerenciado pode ser a diferença entre o sucesso e o fracasso de uma operação comercial.",
      date: "15 de Março, 2024",
      slug: "gestao-contratos-lucratividade",
    },
    {
      title: "Sociedade 50/50: Por que pode não ser a melhor escolha",
      excerpt:
        "Analisamos os riscos de uma divisão igualitária e como estruturar melhor sua sociedade para evitar impasses futuros.",
      date: "10 de Março, 2024",
      slug: "sociedade-50-50-riscos",
    },
    {
      title: "Contrato de Parceria no Agronegócio: Uma solução estratégica",
      excerpt:
        "Como estruturar contratos de parceria que protegem ambas as partes e garantem a continuidade da operação.",
      date: "5 de Março, 2024",
      slug: "contrato-parceria-agronegocio",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient text-primary-foreground pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 animate-pulse-slow">
          <img
            src={heroImage}
            alt="Jennifer Barreto - Advocacia Empresarial"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fadeInUp">
              Seus contratos são a
              <span className="text-gradient"> fortaleza </span>
              ou o ponto fraco do seu negócio?
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 animate-fadeInUp-delay-1">
              Com 12 anos de experiência, aprendi que não há contrato bom que
              salve um negócio ruim. Minha missão é garantir que a sua
              estratégia de negócio seja a base para contratos que protegem e
              impulsionam seu crescimento.
            </p>
            <div className="animate-fadeInUp-delay-2">
              <Button variant="hero" size="xl" asChild className="group">
                <Link to="/contato">
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

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            O Que Meus Clientes Dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg shadow-elegant border border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle
                    key={i}
                    className="h-5 w-5 text-accent fill-accent"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Jennifer não apenas elaborou nossos contratos, ela nos ajudou a
                entender os riscos do negócio antes mesmo de começarmos a
                negociar. Isso mudou completamente nossa forma de operar."
              </p>
              <p className="font-semibold">Marcos Silva</p>
              <p className="text-sm text-muted-foreground">
                CEO, Empresa de Tecnologia
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-elegant border border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle
                    key={i}
                    className="h-5 w-5 text-accent fill-accent"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Finalmente encontrei uma advogada que fala a língua do
                empresário. A clareza dela em explicar questões complexas me deu
                a confiança que eu precisava para tomar decisões importantes."
              </p>
              <p className="font-semibold">Ana Paula Costa</p>
              <p className="text-sm text-muted-foreground">
                Proprietária, Empresa do Agronegócio
              </p>
            </div>
          </div>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/conteudo">Ver todos os artigos</Link>
            </Button>
          </div>
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
            <Link to="/contato">Fale Comigo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
