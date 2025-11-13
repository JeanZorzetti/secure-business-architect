import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Scale,
  ShieldCheck,
  Users,
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Target,
  Rocket,
  HeartHandshake,
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { SEO } from "@/components/SEO";
import { Timeline } from "@/components/ui/timeline";
import ServiceDetail from "@/components/ServiceDetail";

const Services = () => {
  const services = [
    {
      icon: <FileText className="h-12 w-12" />,
      title: "Assessoria de Negócios e Contratos",
      subtitle: "Acompanhamento Estratégico Contínuo",
      description:
        "Não oferecemos apenas a elaboração de contratos. Oferecemos gestão completa do ciclo de vida contratual e suporte para decisões estratégicas que impactam diretamente seus resultados.",
      benefits: [
        "Gestão proativa de contratos empresariais",
        "Suporte em negociações complexas",
        "Revisão e análise de riscos contratuais",
        "Acompanhamento de prazos e renovações",
        "Consultoria para tomada de decisão estratégica",
      ],
      results:
        "Resultado: Redução de litígios, economia em renegociações e contratos que realmente protegem seus interesses.",
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Estruturação Societária",
      subtitle: "Previna Conflitos Desde o Início",
      description:
        "A diferença entre Contrato Social e Acordo de Sócios pode determinar o futuro da sua empresa. Estruturamos sociedades pensando em prevenir impasses e alinhar visões de longo prazo.",
      benefits: [
        "Elaboração de Contrato Social estratégico",
        "Acordo de Sócios detalhado e personalizado",
        "Definição clara de papéis e responsabilidades",
        "Cláusulas de resolução de conflitos",
        "Planejamento sucessório empresarial",
      ],
      results:
        "Resultado: Sociedades equilibradas, decisões ágeis e proteção contra impasses que paralisam o crescimento.",
    },
    {
      icon: <ShieldCheck className="h-12 w-12" />,
      title: "Due Diligence",
      subtitle: "Compre com Segurança e Inteligência",
      description:
        "Antes de qualquer aquisição ou fusão, é crucial uma análise minuciosa. Nossa due diligence identifica passivos ocultos e garante que sua decisão seja embasada em dados reais.",
      benefits: [
        "Análise jurídica completa da empresa-alvo",
        "Identificação de passivos trabalhistas e fiscais",
        "Avaliação de contratos e obrigações existentes",
        "Análise de compliance e riscos regulatórios",
        "Relatório executivo com recomendações estratégicas",
      ],
      results:
        "Resultado: Investimentos seguros e valuation preciso baseado na realidade jurídica da empresa.",
    },
    {
      icon: <Scale className="h-12 w-12" />,
      title: "Consultoria Trabalhista Preventiva",
      subtitle: "O Óbvio Precisa Ser Dito",
      description:
        "Muitos passivos trabalhistas nascem da falta de procedimentos claros e documentados. Criamos POPs, Regimentos Internos e Manuais de Conduta que transformam expectativas implícitas em regras explícitas.",
      benefits: [
        "Elaboração de Procedimentos Operacionais Padrão (POPs)",
        "Criação de Regimento Interno",
        "Manual de Conduta e Código de Ética",
        "Políticas de compliance trabalhista",
        "Treinamento e capacitação de gestores",
      ],
      results:
        "Resultado: Redução drástica de ações trabalhistas e ambiente de trabalho profissional e transparente.",
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: "Contratos de Parceria no Agronegócio",
      subtitle: "Soluções Personalizadas para o Campo",
      description:
        "O agronegócio tem peculiaridades que exigem contratos específicos. Estruturamos parcerias que equilibram interesses, protegem investimentos e garantem a continuidade operacional.",
      benefits: [
        "Contratos de parceria pecuária",
        "Contratos de arrendamento e comodato rural",
        "Acordos de fornecimento e distribuição",
        "Contratos de prestação de serviços agrícolas",
        "Análise de riscos específicos do setor",
      ],
      results:
        "Resultado: Operações agrícolas seguras, com relações contratuais claras e proteção contra inadimplência.",
    },
  ];

  const processSteps = [
    {
      title: "Diagnóstico Estratégico",
      description:
        "Entendemos profundamente seu negócio, desafios atuais e objetivos de crescimento. Analisamos vulnerabilidades jurídicas e oportunidades de blindagem.",
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      title: "Planejamento Customizado",
      description:
        "Desenhamos a solução jurídica alinhada aos seus resultados de negócio. Nenhum modelo pronto - apenas estratégias personalizadas.",
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "Execução com Excelência",
      description:
        "Implementamos com rigor técnico e clareza comunicacional. Você entende cada decisão e sabe exatamente o que está sendo protegido.",
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      title: "Acompanhamento Contínuo",
      description:
        "Monitoramos e ajustamos conforme seu negócio evolui. Gestão proativa de prazos, renovações e novas oportunidades de otimização.",
      icon: <HeartHandshake className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <SEO
        title="Serviços Jurídicos Empresariais"
        description="Serviços jurídicos especializados: consultoria estratégica, due diligence, estruturação societária, gestão de contratos e direito do agronegócio."
        keywords="serviços jurídicos empresariais, due diligence, consultoria jurídica, contratos empresariais, direito societário, agronegócio"
        url="https://jbadvocacia.roilabs.com.br/servicos"
      />

      <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16 mb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp">
            Como Posso Ajudar Sua Empresa
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fadeInUp-delay-1">
            Serviços jurídicos focados em resultados de negócio. Cada solução é
            desenhada para transformar complexidade jurídica em decisões claras e
            estratégicas.
          </p>
        </div>
      </section>

      {/* Quick Overview - Bento Grid */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeInUp">
            Áreas de Atuação
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fadeInUp-delay-1">
            Soluções especializadas para cada etapa do seu negócio
          </p>
        </div>
        <BentoGrid>
          <BentoGridItem
            icon={<Scale className="h-10 w-10" />}
            title="Contratos Estratégicos"
            description="Gestão completa do ciclo de vida contratual. Da negociação à execução, garantindo que cada cláusula proteja seus interesses."
            featured={true}
          />
          <BentoGridItem
            icon={<Users className="h-8 w-8" />}
            title="Estruturação Societária"
            description="Sociedades equilibradas que previnem conflitos e alinham visões de longo prazo."
          />
          <BentoGridItem
            icon={<ShieldCheck className="h-8 w-8" />}
            title="Due Diligence"
            description="Análise minuciosa antes de aquisições. Identifique riscos ocultos e tome decisões embasadas."
          />
          <BentoGridItem
            icon={<FileText className="h-8 w-8" />}
            title="Consultoria Trabalhista"
            description="POPs, Regimentos e Manuais que transformam expectativas implícitas em regras claras."
          />
          <BentoGridItem
            icon={<TrendingUp className="h-8 w-8" />}
            title="Agronegócio"
            description="Contratos especializados para parcerias pecuárias, arrendamentos e operações agrícolas."
          />
        </BentoGrid>
      </section>

      {/* Detailed Services Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Serviços Detalhados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entenda como cada serviço pode transformar a segurança jurídica do
            seu negócio
          </p>
        </div>
        <div className="space-y-20">
          {services.map((service, index) => (
            <ServiceDetail
              key={index}
              icon={service.icon}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              benefits={service.benefits}
              results={service.results}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeInUp">
              Como Funciona Nossa Parceria
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fadeInUp-delay-1">
              Um processo estruturado que garante resultados consistentes
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Timeline items={processSteps} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mt-20">
        <div className="relative group hero-gradient text-primary-foreground p-12 rounded-2xl text-center shadow-elegant transition-all duration-500 hover:shadow-2xl overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeInUp">
              Pronto Para Proteger e Impulsionar Seu Negócio?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/90 animate-fadeInUp-delay-1">
              Agende uma Sessão de Diagnóstico Estratégico. Vamos identificar
              juntos os pontos vulneráveis e as oportunidades de blindagem
              jurídica da sua empresa.
            </p>
            <div className="animate-fadeInUp-delay-2">
              <Button
                variant="hero"
                size="xl"
                asChild
                className="group/btn transition-all duration-300 hover:scale-105"
              >
                <Link to="/contato">
                  Agendar Diagnóstico Estratégico
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

export default Services;
