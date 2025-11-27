import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";
import {
    Lightbulb,
    Target,
    Rocket,
    HeartHandshake,
} from "lucide-react";

export const metadata: Metadata = {
    title: 'Como Funciona Nossa Parceria | Jennifer Barreto Advocacia',
    description: 'Entenda nosso processo de trabalho: do diagnóstico estratégico à execução e acompanhamento contínuo.',
    alternates: {
        canonical: 'https://jbadvocacia.roilabs.com.br/como-funciona',
    },
    openGraph: {
        title: 'Como Funciona Nossa Parceria | Jennifer Barreto',
        description: 'Um processo estruturado para transformar segurança jurídica em resultados.',
        url: 'https://jbadvocacia.roilabs.com.br/como-funciona',
        siteName: 'Jennifer Barreto Advocacia',
        locale: 'pt_BR',
        type: 'website',
    },
};

export default function HowItWorksPage() {
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
        <div className="min-h-screen pt-24 pb-20">
            {/* Hero Section */}
            <section className="bg-secondary py-16 mb-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp">
                        Como Funciona Nossa Parceria
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fadeInUp-delay-1">
                        Um processo estruturado, transparente e focado em resultados.
                        Transformamos a complexidade jurídica em um plano de ação claro para o seu negócio.
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="container mx-auto px-4 mb-20">
                <div className="max-w-4xl mx-auto">
                    <Timeline items={processSteps} />
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 mt-20">
                <div className="relative group hero-gradient text-primary-foreground p-12 rounded-2xl text-center shadow-elegant transition-all duration-500 hover:shadow-2xl overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeInUp">
                            Vamos Começar?
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-foreground/90 animate-fadeInUp-delay-1">
                            O primeiro passo é agendar um diagnóstico. Vamos entender sua realidade e traçar o melhor caminho.
                        </p>
                        <div className="animate-fadeInUp-delay-2">
                            <Button
                                variant="hero"
                                size="xl"
                                asChild
                                className="group/btn transition-all duration-300 hover:scale-105"
                            >
                                <Link href="/contato">
                                    Agendar Diagnóstico
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
    );
}
