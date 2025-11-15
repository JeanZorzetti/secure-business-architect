import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, X, Shield, TrendingUp, Users, FileCheck, AlertTriangle, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ParceriaRural() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    propriedade: '',
    mensagem: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio do formulário
    setTimeout(() => {
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        propriedade: '',
        mensagem: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Contrato de Parceria Rural - Solução Legal para Produtores | JB Advocacia</title>
        <meta
          name="description"
          content="Viabilize mão-de-obra qualificada sem custos CLT. Estruture contratos de parceria rural com segurança jurídica para avicultura e suinocultura."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-black via-dark-300 to-black py-20 lg:py-32">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b46d0c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center rounded-full border border-gold-700 bg-gold-700/10 px-4 py-2 backdrop-blur-sm">
                <Shield className="mr-2 h-4 w-4 text-gold-400" />
                <span className="text-sm font-medium text-gold-400">Solução 100% Legal e Segura</span>
              </div>

              {/* Headline */}
              <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground lg:text-6xl">
                Precisa de Mão-de-Obra, mas{' '}
                <span className="text-gold-shine">Não Pode Ter CLT</span>?
              </h1>

              {/* Subheadline */}
              <p className="mb-8 text-xl text-muted-foreground lg:text-2xl">
                Descubra como estruturar contratos de parceria rural com segurança jurídica
                e viabilizar sua operação sem os custos trabalhistas que inviabilizam seu negócio.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="#contato">
                  <Button size="lg" className="group gold-metallic hover:opacity-90 transition-opacity text-white font-semibold px-8 py-6 text-lg">
                    Quero Estruturar Meu Contrato
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
                <a href="#solucao">
                  <Button size="lg" variant="outline" className="border-gold-600 text-gold-400 hover:bg-gold-700/10 px-8 py-6 text-lg">
                    Ver Como Funciona
                  </Button>
                </a>
              </div>

              {/* Social Proof */}
              <div className="mt-12 flex flex-col items-center justify-center gap-8 border-t border-border pt-8 sm:flex-row">
                <div className="text-center">
                  <div className="text-gold-metallic mb-1 text-3xl font-bold">15+</div>
                  <div className="text-sm text-muted-foreground">Anos de Experiência</div>
                </div>
                <div className="hidden h-12 w-px bg-border sm:block" />
                <div className="text-center">
                  <div className="text-gold-metallic mb-1 text-3xl font-bold">200+</div>
                  <div className="text-sm text-muted-foreground">Produtores Atendidos</div>
                </div>
                <div className="hidden h-12 w-px bg-border sm:block" />
                <div className="text-center">
                  <div className="text-gold-metallic mb-1 text-3xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">Segurança Jurídica</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problema Section */}
        <section className="py-20 bg-dark-300">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                  Você Reconhece Esse{' '}
                  <span className="text-gold-shine">Problema</span>?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Produtores rurais enfrentam um dilema impossível
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Problema 1 */}
                <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:border-gold-700 hover:shadow-glow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                    <X className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Custos CLT Inviabilizam a Operação
                  </h3>
                  <p className="text-muted-foreground">
                    Contratar 3 funcionários CLT para turnos de alojamento custa mais que a margem de lucro.
                    13º, férias, FGTS, INSS, rescisão... O custo é desproporcional ao faturamento.
                  </p>
                </div>

                {/* Problema 2 */}
                <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:border-gold-700 hover:shadow-glow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                    <X className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Escassez de Mão-de-Obra Qualificada
                  </h3>
                  <p className="text-muted-foreground">
                    Não basta contratar "braços". Precisa de conhecimento em manejo sanitário, biossegurança,
                    controle ambiental. Trabalhadores qualificados querem autonomia, não CLT.
                  </p>
                </div>

                {/* Problema 3 */}
                <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:border-gold-700 hover:shadow-glow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                    <X className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Riscos Trabalhistas Altíssimos
                  </h3>
                  <p className="text-muted-foreground">
                    Operar na informalidade gera passivos que podem quebrar sua produção.
                    Ações trabalhistas retroativas, multas, bloqueios judiciais.
                  </p>
                </div>

                {/* Problema 4 */}
                <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:border-gold-700 hover:shadow-glow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                    <X className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    CLT Não se Adapta à Realidade Rural
                  </h3>
                  <p className="text-muted-foreground">
                    Jornadas irregulares, produção sazonal, compartilhamento de riscos.
                    A rigidez da CLT foi feita para fábrica, não para o campo.
                  </p>
                </div>
              </div>

              {/* Alert Box */}
              <div className="mt-12 rounded-xl border border-destructive/20 bg-destructive/5 p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 shrink-0 text-destructive" />
                  <div>
                    <h4 className="mb-2 font-semibold text-foreground">O Resultado?</h4>
                    <p className="text-muted-foreground">
                      Produtores operando na informalidade com riscos altíssimos, deixando de expandir
                      por falta de mão-de-obra, ou simplesmente desistindo da atividade por inviabilidade econômica.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solução Section */}
        <section id="solucao" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-gold-700 bg-gold-700/10 px-4 py-2">
                  <Shield className="mr-2 h-4 w-4 text-gold-400" />
                  <span className="text-sm font-medium text-gold-400">A Solução Legal</span>
                </div>
                <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                  Contrato de{' '}
                  <span className="text-gold-shine">Parceria Rural</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Alternativa 100% legal prevista no Código Civil e na legislação agrária
                </p>
              </div>

              {/* Como Funciona */}
              <div className="mb-16 grid gap-8 lg:grid-cols-3">
                <div className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full gold-metallic">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Compartilhamento de Riscos
                  </h3>
                  <p className="text-muted-foreground">
                    Ambos assumem riscos reais da produção. Se o lote vai mal, ambos perdem.
                    Se vai bem, ambos ganham.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full gold-metallic">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Divisão de Resultados
                  </h3>
                  <p className="text-muted-foreground">
                    Remuneração proporcional aos lucros (não salário fixo).
                    Ex: 70% produtor, 30% parceiro.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full gold-metallic">
                    <FileCheck className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">
                    Sem Encargos Trabalhistas
                  </h3>
                  <p className="text-muted-foreground">
                    Relação civil, não trabalhista. Sem CLT, FGTS, INSS patronal, férias, 13º.
                  </p>
                </div>
              </div>

              {/* Comparação */}
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="grid lg:grid-cols-2">
                  {/* CLT */}
                  <div className="border-r border-border p-8">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                        <X className="h-5 w-5 text-destructive" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Contrato CLT</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <X className="mt-1 h-5 w-5 shrink-0 text-destructive" />
                        <span className="text-muted-foreground">Subordinação e ordens constantes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="mt-1 h-5 w-5 shrink-0 text-destructive" />
                        <span className="text-muted-foreground">Salário fixo independente dos resultados</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="mt-1 h-5 w-5 shrink-0 text-destructive" />
                        <span className="text-muted-foreground">Todos os riscos são do empregador</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="mt-1 h-5 w-5 shrink-0 text-destructive" />
                        <span className="text-muted-foreground">Custos: FGTS, INSS, férias, 13º, rescisão</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="mt-1 h-5 w-5 shrink-0 text-destructive" />
                        <span className="text-muted-foreground">Rigidez de horários e jornada</span>
                      </li>
                    </ul>
                  </div>

                  {/* Parceria */}
                  <div className="p-8 bg-gold-700/5">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg gold-metallic">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Parceria Rural</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-gold-400" />
                        <span className="text-foreground">Empreendimento conjunto, sem subordinação</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-gold-400" />
                        <span className="text-foreground">Divisão proporcional aos lucros/prejuízos</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-gold-400" />
                        <span className="text-foreground">Riscos compartilhados entre as partes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-gold-400" />
                        <span className="text-foreground">Sem encargos trabalhistas (relação civil)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-gold-400" />
                        <span className="text-foreground">Autonomia para organizar o trabalho</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios Section */}
        <section className="py-20 bg-dark-300">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                  Por Que Estruturar um{' '}
                  <span className="text-gold-shine">Contrato de Parceria</span>?
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-gold-700 hover:shadow-glow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-700/10">
                    <TrendingUp className="h-6 w-6 text-gold-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Viabilidade Econômica</h3>
                  <p className="text-sm text-muted-foreground">
                    Elimine custos fixos de CLT e pague apenas conforme os resultados da produção.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-gold-700 hover:shadow-glow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-700/10">
                    <Users className="h-6 w-6 text-gold-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Atração de Talentos</h3>
                  <p className="text-sm text-muted-foreground">
                    Profissionais qualificados preferem autonomia e participação nos resultados.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-gold-700 hover:shadow-glow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-700/10">
                    <Shield className="h-6 w-6 text-gold-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Segurança Jurídica</h3>
                  <p className="text-sm text-muted-foreground">
                    Evite passivos trabalhistas com contratos estruturados por especialistas.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-gold-700 hover:shadow-glow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-700/10">
                    <FileCheck className="h-6 w-6 text-gold-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Flexibilidade Operacional</h3>
                  <p className="text-sm text-muted-foreground">
                    Adapte a mão-de-obra conforme a sazonalidade sem rigidez da CLT.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-gold-700 hover:shadow-glow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-700/10">
                    <Check className="h-6 w-6 text-gold-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Alinhamento de Interesses</h3>
                  <p className="text-sm text-muted-foreground">
                    Quando o parceiro ganha com bons resultados, ele se dedica mais à operação.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-gold-700 hover:shadow-glow">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-700/10">
                    <TrendingUp className="h-6 w-6 text-gold-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Escalabilidade</h3>
                  <p className="text-sm text-muted-foreground">
                    Expanda sua produção sem os custos fixos que limitam o crescimento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Checklist Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                  Checklist: Contrato de Parceria{' '}
                  <span className="text-gold-shine">Seguro</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  8 pontos essenciais para garantir validade jurídica
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Divisão clara de contribuições',
                    desc: 'O que cada parte fornece está bem definido? (infraestrutura vs. trabalho)',
                  },
                  {
                    title: 'Compartilhamento real de riscos',
                    desc: 'O parceiro assume riscos reais da produção? (mortalidade, conversão, preços)',
                  },
                  {
                    title: 'Remuneração variável',
                    desc: 'A divisão de resultados é proporcional aos lucros? (não é salário fixo)',
                  },
                  {
                    title: 'Ausência de subordinação',
                    desc: 'O parceiro tem autonomia para organizar o trabalho? (sem ordens como empregado)',
                  },
                  {
                    title: 'Prazo determinado',
                    desc: 'O contrato tem início e fim claros? (geralmente por safra/lote)',
                  },
                  {
                    title: 'Prestação de contas',
                    desc: 'Está definido como será apurado e dividido o resultado? (planilhas, comprovantes)',
                  },
                  {
                    title: 'Cláusulas de rescisão',
                    desc: 'Está claro como encerrar a parceria se necessário? (com ou sem justa causa)',
                  },
                  {
                    title: 'Assessoria jurídica especializada',
                    desc: 'O contrato foi revisado por advogado especialista em agronegócio?',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-gold-700"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full gold-metallic text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contato" className="py-20 bg-gradient-to-br from-dark-300 via-black to-dark-300">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                  Estruture Seu Contrato de Parceria{' '}
                  <span className="text-gold-shine">com Segurança Jurídica</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fale com especialistas em direito do agronegócio e viabilize sua operação legalmente
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Formulário */}
                <div className="rounded-xl border border-border bg-card p-8">
                  <h3 className="mb-6 text-xl font-semibold text-foreground">
                    Solicite uma Consulta
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="nome" className="mb-2 block text-sm font-medium text-foreground">
                        Nome Completo
                      </label>
                      <Input
                        id="nome"
                        name="nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        className="bg-input border-border"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                        E-mail
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className="bg-input border-border"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefone" className="mb-2 block text-sm font-medium text-foreground">
                        Telefone/WhatsApp
                      </label>
                      <Input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        required
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        className="bg-input border-border"
                      />
                    </div>

                    <div>
                      <label htmlFor="propriedade" className="mb-2 block text-sm font-medium text-foreground">
                        Tipo de Produção
                      </label>
                      <Input
                        id="propriedade"
                        name="propriedade"
                        type="text"
                        required
                        value={formData.propriedade}
                        onChange={handleChange}
                        placeholder="Ex: Avicultura, Suinocultura..."
                        className="bg-input border-border"
                      />
                    </div>

                    <div>
                      <label htmlFor="mensagem" className="mb-2 block text-sm font-medium text-foreground">
                        Mensagem
                      </label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        rows={4}
                        value={formData.mensagem}
                        onChange={handleChange}
                        placeholder="Conte-nos sobre sua situação..."
                        className="bg-input border-border resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full gold-metallic hover:opacity-90 transition-opacity text-white font-semibold py-6"
                    >
                      {isSubmitting ? 'Enviando...' : 'Solicitar Consulta'}
                    </Button>
                  </form>
                </div>

                {/* Contato */}
                <div>
                  <div className="mb-6 rounded-xl border border-border bg-card p-8">
                    <h3 className="mb-4 text-xl font-semibold text-foreground">
                      Outras Formas de Contato
                    </h3>

                    <div className="space-y-4">
                      <a
                        href="tel:+5511999999999"
                        className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-gold-400"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-700/10">
                          <Phone className="h-5 w-5 text-gold-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">Telefone</div>
                          <div className="text-sm">(11) 99999-9999</div>
                        </div>
                      </a>

                      <a
                        href="mailto:contato@jbadvocacia.com.br"
                        className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-gold-400"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-700/10">
                          <Mail className="h-5 w-5 text-gold-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">E-mail</div>
                          <div className="text-sm">contato@jbadvocacia.com.br</div>
                        </div>
                      </a>

                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-700/10">
                          <MapPin className="h-5 w-5 text-gold-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">Endereço</div>
                          <div className="text-sm">São Paulo, SP</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-gold-700/30 bg-gold-700/5 p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="h-6 w-6 shrink-0 text-gold-400" />
                      <div>
                        <h4 className="mb-2 font-semibold text-foreground">Garantia de Sigilo</h4>
                        <p className="text-sm text-muted-foreground">
                          Todas as informações compartilhadas são protegidas pelo sigilo profissional
                          e serão tratadas com total confidencialidade.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
                  Perguntas{' '}
                  <span className="text-gold-shine">Frequentes</span>
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: 'Contrato de parceria pode virar vínculo empregatício?',
                    a: 'Sim, se não for estruturado corretamente. A Justiça do Trabalho reconhece vínculo se houver subordinação, salário fixo disfarçado, horário rígido ou ausência de risco real. Por isso é essencial ter um contrato bem elaborado por especialista.',
                  },
                  {
                    q: 'Qual a diferença entre parceria e prestação de serviços?',
                    a: 'Na prestação de serviços, você paga por tarefa executada (ex: R$ por hectare). Na parceria, há compartilhamento de riscos e divisão de resultados. O parceiro ganha conforme o lucro da produção, não por tarefa.',
                  },
                  {
                    q: 'Como funciona a divisão de resultados na prática?',
                    a: 'Geralmente o produtor fica com 60-70% (pois fornece infraestrutura e assume mais riscos) e o parceiro com 30-40%. Mas isso varia conforme a contribuição de cada um e pode ser negociado.',
                  },
                  {
                    q: 'Preciso registrar o contrato em algum lugar?',
                    a: 'Não é obrigatório, mas é altamente recomendável registrar em cartório para dar mais segurança jurídica e evitar contestações futuras.',
                  },
                  {
                    q: 'E se o parceiro quiser sair no meio do lote?',
                    a: 'O contrato deve prever cláusulas de rescisão, inclusive com penalidades. Uma cláusula de sinal (arras) pode garantir que quem desistir sem justa causa pague uma indenização.',
                  },
                  {
                    q: 'Vale para outras atividades além de avicultura e suinocultura?',
                    a: 'Sim! Parceria rural vale para qualquer atividade agropecuária: bovinocultura, agricultura, horticultura, piscicultura, etc. O importante é estruturar o contrato conforme a realidade da sua produção.',
                  },
                ].map((item, index) => (
                  <details
                    key={index}
                    className="group rounded-xl border border-border bg-card transition-all hover:border-gold-700"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-foreground">
                      {item.q}
                      <ArrowRight className="h-5 w-5 shrink-0 text-gold-400 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="border-t border-border px-6 pb-6 pt-4 text-muted-foreground">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
