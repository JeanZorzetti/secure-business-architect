import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Linkedin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || 'https://backjennifer.roilabs.com.br/api';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entrarei em contato em breve para agendarmos nossa sessão estratégica.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Agende Sua Sessão de Diagnóstico Estratégico
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Esta não é uma simples consulta jurídica. É uma imersão de negócios
            para identificar riscos, oportunidades e construir a blindagem
            jurídica que sua empresa precisa para crescer com segurança.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <div className="bg-card p-8 rounded-lg shadow-elegant border border-border">
              <h2 className="text-2xl font-bold mb-6">Vamos Conversar</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Conte-me um pouco sobre seu negócio e o que você precisa..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Respondo pessoalmente todas as mensagens em até 24 horas úteis.
                </p>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-primary text-primary-foreground p-8 rounded-lg shadow-elegant">
              <h2 className="text-2xl font-bold mb-6">
                O Que Acontece Depois?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Primeira Conversa</h3>
                    <p className="text-primary-foreground/90">
                      Entenderemos seu negócio, desafios e objetivos em uma
                      conversa inicial de 30 minutos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Diagnóstico Profundo</h3>
                    <p className="text-primary-foreground/90">
                      Análise detalhada dos seus contratos, estrutura societária
                      e pontos de vulnerabilidade jurídica.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Plano de Ação</h3>
                    <p className="text-primary-foreground/90">
                      Apresentação de um plano estratégico personalizado com
                      prioridades e investimento necessário.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card p-6 rounded-lg shadow-elegant border border-border">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:contato@jenniferbarreto.adv.br"
                      className="text-muted-foreground hover:text-accent transition-smooth"
                    >
                      contato@jenniferbarreto.adv.br
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-elegant border border-border">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telefone</h3>
                    <a
                      href="tel:+5511999999999"
                      className="text-muted-foreground hover:text-accent transition-smooth"
                    >
                      (11) 99999-9999
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-elegant border border-border">
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Horário de Atendimento</h3>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 9h às 18h
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-elegant border border-border">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Localização</h3>
                    <p className="text-muted-foreground">
                      Atendimento presencial e online
                      <br />
                      São Paulo, Brasil
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-elegant border border-border">
                <div className="flex items-start gap-4">
                  <Linkedin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">LinkedIn</h3>
                    <a
                      href="https://linkedin.com/in/jenniferbarreto"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-smooth"
                    >
                      Conecte-se no LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional CTA */}
      <section className="container mx-auto px-4 mt-20">
        <div className="bg-secondary p-12 rounded-lg text-center shadow-elegant max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Não Tem Certeza Por Onde Começar?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Se você não sabe exatamente qual serviço precisa, não se preocupe. Na
            nossa primeira conversa, vou fazer as perguntas certas para entender
            suas necessidades e propor o caminho mais estratégico.
          </p>
          <p className="text-muted-foreground">
            Lembre-se: não há contrato bom que salve um negócio ruim. Por isso,
            começamos pela estratégia.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
