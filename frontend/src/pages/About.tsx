import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Target, Heart } from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Minha Jornada na Advocacia Empresarial
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Sou Jennifer Barreto, advogada com 12 anos de experiência no campo
              de batalha dos negócios empresariais. Filha de professores, cresci
              entendendo o valor do conhecimento profundo e do estudo rigoroso.
            </p>
            <p className="text-lg text-muted-foreground">
              Mas também aprendi, na prática do mercado, que a teoria precisa
              andar de mãos dadas com o "jogo de cintura" e o entendimento real
              de como os negócios funcionam.
            </p>
          </div>
          <div className="relative">
            <img
              src={aboutImage}
              alt="Jennifer Barreto em reunião profissional"
              className="rounded-lg shadow-elegant w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-secondary py-16 mb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-bold text-center mb-8 text-accent">
              "Não há contrato bom que salve um negócio ruim"
            </blockquote>
            <p className="text-lg text-muted-foreground text-center">
              Esta é a verdade que guia todo o meu trabalho. Por isso, minha
              atuação começa muito antes da minuta do contrato. Ela começa na
              estratégia do negócio, na negociação, na análise de risco e na
              compreensão profunda do que você realmente precisa para prosperar
              com segurança.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Meus Valores e Abordagem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card p-8 rounded-lg shadow-elegant border border-border">
            <Target className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              Estratégia Antes da Burocracia
            </h3>
            <p className="text-muted-foreground">
              O contrato é a consequência de um negócio bem estruturado, não o
              ponto de partida. Foco na negociação, na análise de risco (due
              diligence) e nos procedimentos internos que dão vida real a cada
              cláusula.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-elegant border border-border">
            <BookOpen className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-4">Clareza e Objetividade</h3>
            <p className="text-muted-foreground">
              Acredito que "o óbvio precisa ser dito". Traduzo o "juridiquês" em
              linguagem de negócios, garantindo que você tenha total domínio
              sobre as decisões que toma. Meu papel é educar e empoderar.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-elegant border border-border">
            <Award className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-4">Visão de Longo Prazo</h3>
            <p className="text-muted-foreground">
              Empreender exige pensar nos próximos meses, anos e gerações.
              Construo pontes seguras para o futuro, não apenas fecho acordos
              para o presente. Cada decisão considera as implicações de longo
              prazo.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-elegant border border-border">
            <Heart className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-4">Parceria Verdadeira</h3>
            <p className="text-muted-foreground">
              Não vendo documentos, vendo clareza, proteção e confiança. Sou a
              profissional que se senta ao seu lado na mesa de negociação,
              entende seu fluxo de caixa e aplica a técnica jurídica com
              inteligência prática.
            </p>
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
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
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
              className="bg-card p-6 rounded-lg shadow-elegant border border-border text-center"
            >
              <p className="font-semibold">{area}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-secondary p-12 rounded-lg text-center shadow-elegant">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vamos Conversar Sobre Seu Negócio?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Agende uma Sessão de Diagnóstico Estratégico e descubra como posso
            ajudar a proteger e impulsionar o crescimento da sua empresa.
          </p>
          <Button variant="cta" size="xl" asChild>
            <Link to="/contato">Agendar Sessão</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
