import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Scale,
  ShieldCheck,
  Users,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

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

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16 mb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Como Posso Ajudar Sua Empresa
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Serviços jurídicos focados em resultados de negócio. Cada solução é
            desenhada para transformar complexidade jurídica em decisões claras e
            estratégicas.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="bg-card p-8 rounded-lg shadow-elegant border border-border h-full">
                  <div className="text-accent mb-4">{service.icon}</div>
                  <h2 className="text-3xl font-bold mb-2">{service.title}</h2>
                  <p className="text-lg text-accent mb-4">{service.subtitle}</p>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                    <p className="font-semibold text-accent">{service.results}</p>
                  </div>
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-primary text-primary-foreground p-8 rounded-lg shadow-elegant">
                  <h3 className="text-xl font-bold mb-6">O Que Está Incluído:</h3>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-secondary py-16 mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Como Funciona Nossa Parceria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-accent text-accent-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold mb-2">Diagnóstico</h3>
              <p className="text-sm text-muted-foreground">
                Entendemos seu negócio, desafios e objetivos
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-accent-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold mb-2">Estratégia</h3>
              <p className="text-sm text-muted-foreground">
                Desenhamos a solução jurídica alinhada aos seus resultados
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-accent-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold mb-2">Execução</h3>
              <p className="text-sm text-muted-foreground">
                Implementamos com rigor técnico e clareza comunicacional
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-accent-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold mb-2">Acompanhamento</h3>
              <p className="text-sm text-muted-foreground">
                Monitoramos e ajustamos conforme seu negócio evolui
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 mt-20">
        <div className="hero-gradient text-primary-foreground p-12 rounded-lg text-center shadow-elegant">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto Para Proteger e Impulsionar Seu Negócio?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            Agende uma Sessão de Diagnóstico Estratégico. Vamos identificar
            juntos os pontos vulneráveis e as oportunidades de blindagem jurídica
            da sua empresa.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contato">Agendar Diagnóstico Estratégico</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
