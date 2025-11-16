'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Linkedin, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  // Validation functions
  const validateEmail = (email: string): string => {
    if (!email) return "Email é obrigatório";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email inválido";
    return "";
  };

  const validatePhone = (phone: string): string => {
    if (!phone) return "";
    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) return "Telefone inválido";
    return "";
  };

  const validateName = (name: string): string => {
    if (!name) return "Nome é obrigatório";
    if (name.length < 3) return "Nome deve ter pelo menos 3 caracteres";
    return "";
  };

  const validateMessage = (message: string): string => {
    if (!message) return "Mensagem é obrigatória";
    if (message.length < 10) return "Mensagem deve ter pelo menos 10 caracteres";
    return "";
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });

    let error = "";
    switch (field) {
      case "name":
        error = validateName(formData.name);
        break;
      case "email":
        error = validateEmail(formData.email);
        break;
      case "phone":
        error = validatePhone(formData.phone);
        break;
      case "message":
        error = validateMessage(formData.message);
        break;
    }
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const messageError = validateMessage(formData.message);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
      message: messageError,
    });

    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });

    if (nameError || emailError || phoneError || messageError) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      setShowSuccess(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        setTouched({
          name: false,
          email: false,
          phone: false,
          message: false,
        });
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation for touched fields
    if (touched[name as keyof typeof touched]) {
      let error = "";
      switch (name) {
        case "name":
          error = validateName(value);
          break;
        case "email":
          error = validateEmail(value);
          break;
        case "phone":
          error = validatePhone(value);
          break;
        case "message":
          error = validateMessage(value);
          break;
      }
      setErrors({ ...errors, [name]: error });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-secondary py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Agende Sua Sessão de
            <span className="block bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent mt-2">
              Diagnóstico Estratégico
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Esta não é uma simples consulta jurídica. É uma imersão de negócios
            para identificar riscos, oportunidades e construir a blindagem
            jurídica que sua empresa precisa para crescer com segurança.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group bg-card p-8 rounded-2xl shadow-elegant border-2 border-border transition-all duration-500 hover:shadow-2xl hover:border-accent/30">
              {/* Animated border glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6">Vamos Conversar</h2>

                {/* Success Animation */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 flex items-center justify-center bg-card/95 backdrop-blur-sm rounded-2xl z-20"
                    >
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle2 className="h-24 w-24 text-accent mx-auto mb-4" />
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-2xl font-bold text-accent mb-2"
                        >
                          Mensagem Enviada!
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="text-muted-foreground"
                        >
                          Entrarei em contato em breve
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        required
                        className={`mt-1 transition-all duration-300 ${
                          touched.name && errors.name
                            ? "border-red-500 focus:border-red-500"
                            : touched.name && !errors.name
                            ? "border-green-500 focus:border-green-500"
                            : ""
                        }`}
                      />
                      {touched.name && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5">
                          {errors.name ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {touched.name && errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        required
                        className={`mt-1 transition-all duration-300 ${
                          touched.email && errors.email
                            ? "border-red-500 focus:border-red-500"
                            : touched.email && !errors.email
                            ? "border-green-500 focus:border-green-500"
                            : ""
                        }`}
                      />
                      {touched.email && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5">
                          {errors.email ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {touched.email && errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={() => handleBlur("phone")}
                        className={`mt-1 transition-all duration-300 ${
                          touched.phone && errors.phone
                            ? "border-red-500 focus:border-red-500"
                            : touched.phone && formData.phone && !errors.phone
                            ? "border-green-500 focus:border-green-500"
                            : ""
                        }`}
                      />
                      {touched.phone && formData.phone && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5">
                          {errors.phone ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {touched.phone && errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </div>

                  {/* Company Field */}
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

                  {/* Message Field */}
                  <div>
                    <Label htmlFor="message">Mensagem *</Label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur("message")}
                        required
                        className={`mt-1 transition-all duration-300 ${
                          touched.message && errors.message
                            ? "border-red-500 focus:border-red-500"
                            : touched.message && !errors.message
                            ? "border-green-500 focus:border-green-500"
                            : ""
                        }`}
                        placeholder="Conte-me um pouco sobre seu negócio e o que você precisa..."
                      />
                      {touched.message && (
                        <div className="absolute right-3 top-4">
                          {errors.message ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      )}
                    </div>
                    {touched.message && errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Button with Ripple Effect */}
                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full relative overflow-hidden group/btn transition-all duration-300 hover:scale-[1.02]"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                    </span>
                    {/* Ripple effect */}
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Respondo pessoalmente todas as mensagens em até 24 horas úteis.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* O Que Acontece Depois? */}
            <div className="relative group bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-accent-foreground p-8 rounded-2xl shadow-elegant transition-all duration-500 hover:shadow-2xl overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6">
                  O Que Acontece Depois?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-background text-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Primeira Conversa</h3>
                      <p className="text-accent-foreground/90 text-sm">
                        Entenderemos seu negócio, desafios e objetivos em uma
                        conversa inicial de 30 minutos.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-background text-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Diagnóstico Profundo</h3>
                      <p className="text-accent-foreground/90 text-sm">
                        Análise detalhada dos seus contratos, estrutura societária
                        e pontos de vulnerabilidade jurídica.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-background text-foreground w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Plano de Ação</h3>
                      <p className="text-accent-foreground/90 text-sm">
                        Apresentação de um plano estratégico personalizado com
                        prioridades e investimento necessário.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Contact Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card p-6 rounded-xl shadow-elegant border border-border transition-all duration-300 hover:shadow-2xl hover:border-accent/30 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:contato@jbadvocacia.com.br"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      contato@jbadvocacia.com.br
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card p-6 rounded-xl shadow-elegant border border-border transition-all duration-300 hover:shadow-2xl hover:border-accent/30 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telefone</h3>
                    <a
                      href="tel:+5511999999999"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      (11) 99999-9999
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card p-6 rounded-xl shadow-elegant border border-border transition-all duration-300 hover:shadow-2xl hover:border-accent/30 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Horário de Atendimento</h3>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 9h às 18h
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-card p-6 rounded-xl shadow-elegant border border-border transition-all duration-300 hover:shadow-2xl hover:border-accent/30 hover:-translate-y-1"
              >
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-card p-6 rounded-xl shadow-elegant border border-border transition-all duration-300 hover:shadow-2xl hover:border-accent/30 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <Linkedin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">LinkedIn</h3>
                    <a
                      href="https://linkedin.com/in/jennifer-barreto"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      Conecte-se no LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Additional CTA */}
      <section className="container mx-auto px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative group bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-background p-12 rounded-2xl text-center shadow-elegant max-w-3xl mx-auto transition-all duration-500 hover:shadow-2xl overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Não Tem Certeza Por Onde Começar?</h2>
            <p className="text-lg text-background/80 mb-6">
              Se você não sabe exatamente qual serviço precisa, não se preocupe. Na
              nossa primeira conversa, vou fazer as perguntas certas para entender
              suas necessidades e propor o caminho mais estratégico.
            </p>
            <p className="text-background/90 font-medium">
              Lembre-se: não há contrato bom que salve um negócio ruim. Por isso,
              começamos pela estratégia.
            </p>
          </div>

          {/* Decorative Glow */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        </motion.div>
      </section>
    </div>
  );
}
