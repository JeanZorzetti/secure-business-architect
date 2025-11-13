import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Target, Heart, Briefcase, GraduationCap, TrendingUp, Users2 } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { SEO, AttorneySchema, BreadcrumbSchema } from "@/components/SEO";
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  const careerTimeline = [
    {
      title: "Início da Carreira (2013-2016)",
      description:
        "Formação em Direito e primeiros passos na advocacia empresarial. Aprendizado intensivo em contratos e direito societário trabalhando com empresas de médio porte.",
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      title: "Especialização em Negócios (2017-2019)",
      description:
        "Foco em negociações estratégicas e due diligence. Participação em mais de 50 operações de M&A e estruturação de sociedades complexas.",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "Expansão para Agronegócio (2020-2022)",
      description:
        "Desenvolvimento de expertise em contratos do agronegócio, especialmente avicultura e suinocultura. Criação de modelos contratuais inovadores para parcerias pecuárias.",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: "Advocacia Estratégica (2023-Presente)",
      description:
        "Consolidação da abordagem 'Estratégia Antes da Minuta'. Foco em consultoria preventiva e gestão do ciclo de vida contratual. Mais de 500 clientes atendidos.",
      icon: <Users2 className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <SEO
        title="Sobre Jennifer Barreto"
        description="Conheça Jennifer Barreto: 12 anos de experiência em direito empresarial, especialista em contratos estratégicos e assessoria para negócios complexos."
        keywords="jennifer barreto advogada, advocacia empresarial são paulo, especialista contratos, due diligence, direito societário"
        url="https://jbadvocacia.roilabs.com.br/sobre"
      />
      <AttorneySchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://jbadvocacia.roilabs.com.br/" },
          { name: "Sobre", url: "https://jbadvocacia.roilabs.com.br/sobre" },
        ]}
      />

      <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Minha Jornada na
              <span className="text-gradient block">Advocacia Empresarial</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Sou Jennifer Barreto, advogada com 12 anos de experiência no campo
              de batalha dos negócios empresariais. Filha de professores, cresci
              entendendo o valor do conhecimento profundo e do estudo rigoroso.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mas também aprendi, na prática do mercado, que a teoria precisa
              andar de mãos dadas com o "jogo de cintura" e o entendimento real
              de como os negócios funcionam.
            </p>
          </div>
          <div className="relative group animate-fadeInUp-delay-1">
            {/* Photo with advanced hover effects */}
            <div className="relative overflow-hidden rounded-2xl shadow-elegant transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
              <img
                src={aboutImage}
                alt="Jennifer Barreto em reunião profissional"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Decorative Border */}
              <div className="absolute inset-0 border-4 border-accent/0 group-hover:border-accent/30 transition-colors duration-500 rounded-2xl" />
            </div>
            {/* Decorative Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-secondary/50 py-16 mb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <blockquote className="relative text-2xl md:text-3xl font-bold text-center mb-8 text-accent animate-fadeInUp">
              <span className="text-6xl absolute -top-4 -left-4 opacity-20">"</span>
              Não há contrato bom que salve um negócio ruim
              <span className="text-6xl absolute -bottom-8 -right-4 opacity-20">"</span>
            </blockquote>
            <p className="text-lg text-muted-foreground text-center leading-relaxed animate-fadeInUp-delay-1">
              Esta é a verdade que guia todo o meu trabalho. Por isso, minha
              atuação começa muito antes da minuta do contrato. Ela começa na
              estratégia do negócio, na negociação, na análise de risco e na
              compreensão profunda do que você realmente precisa para prosperar
              com segurança.
            </p>
          </div>
        </div>
      </section>

      {/* Career Timeline Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeInUp">
            Minha Trajetória Profissional
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fadeInUp-delay-1">
            12 anos de experiência construindo soluções jurídicas estratégicas
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Timeline items={careerTimeline} />
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-secondary/30 py-20 mb-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-fadeInUp">
            Meus Valores e Abordagem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="group relative bg-card p-8 rounded-2xl shadow-elegant border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-accent/50 animate-fadeInUp">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Target className="h-12 w-12 text-accent mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                  Estratégia Antes da Burocracia
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  O contrato é a consequência de um negócio bem estruturado, não o
                  ponto de partida. Foco na negociação, na análise de risco (due
                  diligence) e nos procedimentos internos que dão vida real a cada
                  cláusula.
                </p>
              </div>
            </div>

            <div className="group relative bg-card p-8 rounded-2xl shadow-elegant border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-accent/50 animate-fadeInUp-delay-1">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <BookOpen className="h-12 w-12 text-accent mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                  Clareza e Objetividade
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Acredito que "o óbvio precisa ser dito". Traduzo o "juridiquês" em
                  linguagem de negócios, garantindo que você tenha total domínio
                  sobre as decisões que toma. Meu papel é educar e empoderar.
                </p>
              </div>
            </div>

            <div className="group relative bg-card p-8 rounded-2xl shadow-elegant border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-accent/50 animate-fadeInUp-delay-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Award className="h-12 w-12 text-accent mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                  Visão de Longo Prazo
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Empreender exige pensar nos próximos meses, anos e gerações.
                  Construo pontes seguras para o futuro, não apenas fecho acordos
                  para o presente. Cada decisão considera as implicações de longo
                  prazo.
                </p>
              </div>
            </div>

            <div className="group relative bg-card p-8 rounded-2xl shadow-elegant border border-border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-accent/50 animate-fadeInUp-delay-3">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Heart className="h-12 w-12 text-accent mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                  Parceria Verdadeira
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Não vendo documentos, vendo clareza, proteção e confiança. Sou a
                  profissional que se senta ao seu lado na mesa de negociação,
                  entende seu fluxo de caixa e aplica a técnica jurídica com
                  inteligência prática.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Story Section */}
      <section className="bg-primary text-primary-foreground py-16 mb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Por Que Escolhi Este Caminho
            </h2>
            <div className="space-y-6 text-lg">
              <p>
                Cresci em uma família de educadores. Meus pais sempre me
                ensinaram que o conhecimento é a base de qualquer realização
                sólida. Essa crença me levou ao Direito, e dentro dele, ao
                fascinante mundo dos contratos e das relações empresariais.
              </p>
              <p>
                Durante 12 anos, trabalhei com empresas de diversos portes e
                setores. Vi negócios brilhantes quase destruídos por contratos
                mal feitos. Vi empreendedores talentosos paralisados por
                sociedades mal estruturadas. E vi, principalmente, a frustração
                de quem sente que o jurídico é um obstáculo, não uma ferramenta.
              </p>
              <p>
                Foi então que decidi criar uma abordagem diferente. Uma advocacia
                que fala a língua do empresário. Que entende que cada cláusula
                precisa ter sentido prático, não apenas técnico. Que sabe que um
                bom contrato nasce de uma boa negociação, e uma boa negociação
                nasce do entendimento profundo do negócio.
              </p>
              <p className="font-semibold">
                Hoje, minha missão é clara: ser a arquiteta de negócios seguros
                para empresários que querem crescer com inteligência e proteção.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-fadeInUp">
          Áreas de Especialização
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            "Direito Societário e Contratos Empresariais",
            "Negociações Estratégicas",
            "Due Diligence para Aquisições",
            "Gestão do Ciclo de Vida Contratual",
            "Consultoria Trabalhista Preventiva",
            "Agronegócio (Avicultura e Suinocultura)",
          ].map((area, index) => (
            <div
              key={index}
              className="group relative bg-card p-6 rounded-xl shadow-elegant border border-border text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-accent/50 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="relative z-10 font-semibold group-hover:text-accent transition-colors duration-300">
                {area}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="relative group hero-gradient text-primary-foreground p-12 rounded-2xl text-center shadow-elegant transition-all duration-500 hover:shadow-2xl overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeInUp">
              Vamos Conversar Sobre Seu Negócio?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/90 animate-fadeInUp-delay-1">
              Agende uma Sessão de Diagnóstico Estratégico e descubra como posso
              ajudar a proteger e impulsionar o crescimento da sua empresa.
            </p>
            <div className="animate-fadeInUp-delay-2">
              <Button
                variant="hero"
                size="xl"
                asChild
                className="group/btn transition-all duration-300 hover:scale-105"
              >
                <Link to="/contato">
                  Agendar Sessão
                  <span className="ml-2 inline-block transition-transform group-hover/btn:translate-x-1">
                    →
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Decorative Glow */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        </div>
      </section>
      </div>
    </>
  );
};

export default About;
