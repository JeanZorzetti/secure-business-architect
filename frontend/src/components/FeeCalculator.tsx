import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, TrendingUp, FileText, Users, Building2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface ServiceType {
  id: string;
  name: string;
  icon: React.ReactNode;
  basePrice: number;
  description: string;
}

const serviceTypes: ServiceType[] = [
  {
    id: "contract",
    name: "Elaboração de Contratos",
    icon: <FileText className="h-5 w-5" />,
    basePrice: 3000,
    description: "Contratos empresariais personalizados",
  },
  {
    id: "corporate",
    name: "Direito Societário",
    icon: <Building2 className="h-5 w-5" />,
    basePrice: 5000,
    description: "Estruturação e governança corporativa",
  },
  {
    id: "ma",
    name: "Fusões e Aquisições",
    icon: <TrendingUp className="h-5 w-5" />,
    basePrice: 15000,
    description: "Due diligence e operações de M&A",
  },
  {
    id: "labor",
    name: "Direito do Trabalho",
    icon: <Users className="h-5 w-5" />,
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

export const FeeCalculator = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [complexity, setComplexity] = useState<keyof typeof complexityMultipliers>("medium");
  const [urgency, setUrgency] = useState<keyof typeof urgencyMultipliers>("normal");
  const [companySize, setCompanySize] = useState<"small" | "medium" | "large">("small");
  const [showResult, setShowResult] = useState(false);

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
    }
  };

  const estimatedFee = calculateFee();
  const minRange = Math.round(estimatedFee * 0.85);
  const maxRange = Math.round(estimatedFee * 1.15);

  return (
    <div className="bg-background border border-border rounded-lg p-6 md:p-8 shadow-sm">
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
          {serviceTypes.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                setSelectedService(service.id);
                setShowResult(false);
              }}
              className={`p-4 rounded-lg border-2 transition-all text-left hover:border-accent ${
                selectedService === service.id
                  ? "border-accent bg-accent/5"
                  : "border-border bg-background"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-accent/10 text-accent">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{service.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {service.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
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
              key={key}
              onClick={() => {
                setComplexity(key as keyof typeof complexityMultipliers);
                setShowResult(false);
              }}
              className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${
                complexity === key
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
              key={key}
              onClick={() => {
                setUrgency(key as keyof typeof urgencyMultipliers);
                setShowResult(false);
              }}
              className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${
                urgency === key
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
            onClick={() => {
              setCompanySize("small");
              setShowResult(false);
            }}
            className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${
              companySize === "small"
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent/20"
            }`}
          >
            Pequeno Porte
          </button>
          <button
            onClick={() => {
              setCompanySize("medium");
              setShowResult(false);
            }}
            className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${
              companySize === "medium"
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent/20"
            }`}
          >
            Médio Porte
          </button>
          <button
            onClick={() => {
              setCompanySize("large");
              setShowResult(false);
            }}
            className={`px-4 py-3 rounded-md text-sm font-medium transition-all ${
              companySize === "large"
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
        onClick={handleCalculate}
        disabled={!selectedService}
        className="w-full mb-6"
        size="lg"
      >
        <DollarSign className="h-5 w-5 mr-2" />
        Calcular Honorários
      </Button>

      {/* Result Display */}
      {showResult && selectedService && (
        <Reveal>
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-lg p-6">
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
              <Button variant="default" className="flex-1">
                Solicitar Proposta Formal
              </Button>
              <Button variant="outline" className="flex-1">
                Agendar Consulta
              </Button>
            </div>
          </div>
        </Reveal>
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
  );
};
