import { FeeCalculator } from "@/components/FeeCalculator";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/ui/reveal";
import { Calculator as CalculatorIcon, Check } from "lucide-react";

const Calculator = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title="Calculadora de Honorários"
        description="Calcule uma estimativa de honorários advocatícios para seu projeto empresarial. Ferramenta interativa para obter valores estimados de forma rápida e transparente."
        keywords="calculadora honorários advocacia, custo serviços jurídicos, orçamento advocacia, honorários advocatícios"
        url="https://jbadvocacia.roilabs.com.br/calculadora"
        type="website"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
                <CalculatorIcon className="h-8 w-8 text-accent" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Calculadora de Honorários
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Obtenha uma estimativa transparente e personalizada dos honorários
                advocatícios para seu projeto empresarial em poucos cliques.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <FeeCalculator />
          </Reveal>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-secondary rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Como Funciona a Precificação
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent" />
                    Fatores Considerados
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Tipo e natureza do serviço solicitado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Complexidade técnica e jurídica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Prazo de entrega necessário</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Porte e estrutura da empresa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Volume de documentação envolvida</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Check className="h-5 w-5 text-accent" />
                    Vantagens da Estimativa
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Transparência total nos custos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Planejamento financeiro facilitado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Sem surpresas no orçamento final</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Alinhamento de expectativas desde o início</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Agilidade no processo de contratação</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-accent/10 rounded-md border border-accent/20">
                <p className="text-sm text-center">
                  <strong className="text-accent">Nota:</strong> A estimativa fornecida pela calculadora
                  é uma referência inicial. O valor final será definido após reunião de diagnóstico,
                  onde analisaremos todos os detalhes do seu caso específico.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-8 text-center border border-accent/30">
              <h2 className="text-2xl font-bold mb-4">
                Próximos Passos
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Gostou da estimativa? Agende uma reunião de diagnóstico gratuita para
                discutirmos seu caso em detalhes e recebermos uma proposta formal personalizada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contato"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground rounded-md font-semibold hover:bg-accent/90 transition-smooth"
                >
                  Agendar Reunião Gratuita
                </a>
                <a
                  href="/servicos"
                  className="inline-flex items-center justify-center px-6 py-3 bg-background border border-border text-foreground rounded-md font-semibold hover:bg-secondary transition-smooth"
                >
                  Conhecer Nossos Serviços
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
