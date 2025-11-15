'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, Users, Building2, TrendingUp } from "lucide-react";

export default function Calculadora() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [complexity, setComplexity] = useState<string>("medium");
  const [urgency, setUrgency] = useState<string>("normal");
  const [showResult, setShowResult] = useState(false);

  const services = [
    { id: "contract", name: "Elaboração de Contratos", icon: FileText, basePrice: 3000 },
    { id: "corporate", name: "Direito Societário", icon: Building2, basePrice: 5000 },
    { id: "ma", name: "Fusões e Aquisições", icon: TrendingUp, basePrice: 15000 },
    { id: "labor", name: "Direito do Trabalho", icon: Users, basePrice: 4000 },
  ];

  const complexityMultipliers = {
    low: { label: "Baixa", multiplier: 0.8 },
    medium: { label: "Média", multiplier: 1.0 },
    high: { label: "Alta", multiplier: 1.3 },
  };

  const urgencyMultipliers = {
    normal: { label: "Normal (30 dias)", multiplier: 1.0 },
    urgent: { label: "Urgente (15 dias)", multiplier: 1.25 },
  };

  const calculateFee = () => {
    if (!selectedService) return 0;
    const service = services.find((s) => s.id === selectedService);
    if (!service) return 0;

    const complexityMult = complexityMultipliers[complexity as keyof typeof complexityMultipliers].multiplier;
    const urgencyMult = urgencyMultipliers[urgency as keyof typeof urgencyMultipliers].multiplier;

    return Math.round(service.basePrice * complexityMult * urgencyMult);
  };

  const handleCalculate = () => {
    if (selectedService) {
      setShowResult(true);
    }
  };

  const estimatedFee = calculateFee();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-elegant">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-bold">Calculadora de Honorários</h1>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Serviço</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service.id);
                      setShowResult(false);
                    }}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      selectedService === service.id
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <service.icon className="h-5 w-5 mb-2" />
                    <div className="font-semibold">{service.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Complexidade</label>
              <select
                value={complexity}
                onChange={(e) => {
                  setComplexity(e.target.value);
                  setShowResult(false);
                }}
                className="w-full p-3 border border-border rounded-lg bg-background"
              >
                {Object.entries(complexityMultipliers).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Urgência</label>
              <select
                value={urgency}
                onChange={(e) => {
                  setUrgency(e.target.value);
                  setShowResult(false);
                }}
                className="w-full p-3 border border-border rounded-lg bg-background"
              >
                {Object.entries(urgencyMultipliers).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleCalculate}
              variant="hero"
              size="xl"
              className="w-full"
              disabled={!selectedService}
            >
              Calcular Honorários
            </Button>

            {showResult && (
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Estimativa de Honorários</p>
                <p className="text-4xl font-bold text-accent mb-4">
                  R$ {estimatedFee.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-muted-foreground">
                  * Valor aproximado. Consulte para proposta detalhada.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
