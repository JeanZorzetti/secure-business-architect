'use client';

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  FileText,
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Check
} from "lucide-react";
import Link from "next/link";

interface ServiceType {
  id: string;
  name: string;
  icon: any;
  basePrice: number;
  description: string;
}

const serviceTypes: ServiceType[] = [
  {
    id: "contract",
    name: "Elaboração de Contratos",
    icon: FileText,
    basePrice: 3000,
    description: "Contratos empresariais personalizados",
  },
  {
    id: "corporate",
    name: "Direito Societário",
    icon: Building2,
    basePrice: 5000,
    description: "Estruturação e governança corporativa",
  },
  {
    id: "ma",
    name: "Fusões e Aquisições",
    icon: TrendingUp,
    basePrice: 15000,
    description: "Due diligence e operações de M&A",
  },
  {
    id: "labor",
    name: "Direito do Trabalho",
    icon: Users,
    basePrice: 4000,
    description: "Consultoria trabalhista preventiva",
  },
];

const complexityMultipliers = {
  low: { label: "Baixa", multiplier: 0.8 },
  medium: { label: "Média", multiplier: 1.0 },
  high: { label: "Alta", multiplier: 1.3 },
  veryHigh: { label: "Muito Alta", multiplier: 1.6 },
};

const urgencyMultipliers = {
  normal: { label: "Normal (30 dias)", multiplier: 1.0 },
  urgent: { label: "Urgente (15 dias)", multiplier: 1.25 },
  veryUrgent: { label: "Muito Urgente (7 dias)", multiplier: 1.5 },
};

export default function Calculadora() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [complexity, setComplexity] = useState<keyof typeof complexityMultipliers>("medium");
  const [urgency, setUrgency] = useState<keyof typeof urgencyMultipliers>("normal");
  const [companySize, setCompanySize] = useState<"small" | "medium" | "large">("small");
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculateFee = () => {
    if (!selectedService) return 0;

    const service = serviceTypes.find((s) => s.id === selectedService);
    if (!service) return 0;

    const complexityMult = complexityMultipliers[complexity].multiplier;
    const urgencyMult = urgencyMultipliers[urgency].multiplier;

    const companySizeMult =
      companySize === "small" ? 1.0 :
        companySize === "medium" ? 1.2 :
          1.5;

    const total = service.basePrice * complexityMult * urgencyMult * companySizeMult;
    return Math.round(total);
  };

  const handleCalculate = () => {
    if (selectedService) {
      setShowResult(true);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  const estimatedFee = calculateFee();
  const minRange = Math.round(estimatedFee * 0.85);
  const maxRange = Math.round(estimatedFee * 1.15);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/5 via-accent/3 to-background py-16 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6 animate-in zoom-in duration-500">
              <Calculator className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Calculadora de Honorários
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Obtenha uma estimativa transparente e personalizada dos honorários
              advocatícios para seu projeto empresarial em poucos cliques.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background border border-border rounded-lg p-6 md:p-8 shadow-elegant animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-accent/10">
                <Calculator className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Calculadora de Honorários</h2>
                <p className="text-sm text-muted-foreground">
                  Obtenha uma estimativa personalizada dos honorários advocatícios
                </p>
              </div>
            </div>

            {/* Service Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                Tipo de Serviço <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceTypes.map((service) => {
                  const Icon = service.icon;
                  return (
                    <button
                      type="button"
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service.id);
                        setShowResult(false);
                      }}
                      className={`p-4 rounded-lg border-2 transition-all text-left hover:border-accent ${selectedService === service.id
                        ? "border-accent bg-accent/5"
                        : "border-border bg-background"
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{service.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Complexity Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                Complexidade do Caso <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(complexityMultipliers).map(([key, { label }]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => {
                      setComplexity(key as keyof typeof complexityMultipliers);
                      setShowResult(false);
                    }}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${complexity === key
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                Prazo de Entrega <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {Object.entries(urgencyMultipliers).map(([key, { label }]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => {
                      setUrgency(key as keyof typeof urgencyMultipliers);
                      setShowResult(false);
                    }}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${urgency === key
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Company Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                Porte da Empresa <span className="text-destructive">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCompanySize("small");
                    setShowResult(false);
                  }}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${companySize === "small"
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                    }`}
                >
                  Pequeno Porte
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCompanySize("medium");
                    setShowResult(false);
                  }}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${companySize === "medium"
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                    }`}
                >
                  Médio Porte
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCompanySize("large");
                    setShowResult(false);
                  }}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${companySize === "large"
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent/20"
                    }`}
                >
                  Grande Porte
                </button>
              </div>
            </div>

            {/* Calculate Button */}
            <Button
              type="button"
              onClick={handleCalculate}
              disabled={!selectedService}
              variant="hero"
              size="xl"
              className="w-full mb-6"
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Calcular Honorários
            </Button>

            {/* Result Display */}
            {showResult && selectedService && (
              <div ref={resultRef} className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-lg p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Estimativa de Honorários
                  </p>
                  <div className="text-4xl font-bold text-accent mb-1">
                    R$ {estimatedFee.toLocaleString("pt-BR")}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Faixa: R$ {minRange.toLocaleString("pt-BR")} - R$ {maxRange.toLocaleString("pt-BR")}
                  </p>
                </div>

                <div className="border-t border-accent/30 pt-4 mt-4">
                  <h4 className="font-semibold mb-3 text-sm">Detalhamento:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Serviço:</span>
                      <span className="font-medium">
                        {serviceTypes.find((s) => s.id === selectedService)?.name}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Complexidade:</span>
                      <span className="font-medium">{complexityMultipliers[complexity].label}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Prazo:</span>
                      <span className="font-medium">{urgencyMultipliers[urgency].label}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Porte:</span>
                      <span className="font-medium">
                        {companySize === "small" ? "Pequeno" : companySize === "medium" ? "Médio" : "Grande"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-background/50 rounded-md border border-accent/20">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Importante:</strong> Esta é uma estimativa automatizada baseada nos dados fornecidos.
                    O valor final dos honorários pode variar após análise detalhada do caso e reunião inicial.
                    Entre em contato para receber uma proposta personalizada.
                  </p>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Button variant="default" size="lg" asChild className="flex-1">
                    <Link href="/contato">Solicitar Proposta Formal</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="flex-1">
                    <Link href="/contato">Agendar Consulta</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-muted/50 rounded-md border border-border">
              <p className="text-xs text-muted-foreground leading-relaxed">
                💡 <strong>Sobre a calculadora:</strong> Esta ferramenta fornece uma estimativa inicial baseada
                em parâmetros gerais. Cada caso é único e requer análise personalizada. Os valores apresentados
                não constituem proposta formal de honorários. Para orçamento definitivo, agende uma reunião
                de diagnóstico gratuita.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary rounded-lg p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
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
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg p-8 text-center border border-accent/30 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            <h2 className="text-2xl font-bold mb-4">
              Próximos Passos
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Gostou da estimativa? Agende uma reunião de diagnóstico gratuita para
              discutirmos seu caso em detalhes e receber uma proposta formal personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link href="/contato">
                  Agendar Reunião Gratuita
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/servicos">
                  Conhecer Nossos Serviços
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
