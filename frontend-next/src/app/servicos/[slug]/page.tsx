import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/lib/services';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {
    FileText,
    Scale,
    ShieldCheck,
    Users,
    TrendingUp,
    CheckCircle,
    ArrowLeft,
} from "lucide-react";
import JsonLd from '@/components/seo/json-ld';
import { getServiceSchema, getBreadcrumbSchema, getFAQSchema, getReviewSchema } from '@/lib/structured-data';

// Map icon names to components
const iconMap = {
    FileText: <FileText className="h-16 w-16" />,
    Scale: <Scale className="h-16 w-16" />,
    ShieldCheck: <ShieldCheck className="h-16 w-16" />,
    Users: <Users className="h-16 w-16" />,
    TrendingUp: <TrendingUp className="h-16 w-16" />,
};

// Generate static params for all services
export async function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

// Generate metadata for each service
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const service = services.find((s) => s.slug === resolvedParams.slug);

    if (!service) {
        return {
            title: 'Serviço não encontrado',
        };
    }

    return {
        title: `${service.title} | Jennifer Barreto Advocacia`,
        description: service.description,
        keywords: [service.title, 'advocacia empresarial', 'serviços jurídicos', ...service.benefits],
        alternates: {
            canonical: `https://jbadvocacia.roilabs.com.br/servicos/${service.slug}`,
        },
        openGraph: {
            title: service.title,
            description: service.description,
            url: `https://jbadvocacia.roilabs.com.br/servicos/${service.slug}`,
            siteName: 'Jennifer Barreto Advocacia',
            locale: 'pt_BR',
            type: 'website',
        },
    };
}

export default async function ServicePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const service = services.find((s) => s.slug === resolvedParams.slug);

    if (!service) {
        notFound();
    }

    const Icon = iconMap[service.iconName];

    // Structured Data
    const serviceUrl = `https://jbadvocacia.roilabs.com.br/servicos/${service.slug}`;
    const serviceSchema = getServiceSchema(service, serviceUrl);
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: 'Home', url: 'https://jbadvocacia.roilabs.com.br' },
        { name: 'Serviços', url: 'https://jbadvocacia.roilabs.com.br/servicos' },
        { name: service.title },
    ]);
    const faqSchema = getFAQSchema(service.faq);
    const reviewSchema = getReviewSchema(service.reviews);

    return (
        <>
            <JsonLd data={[serviceSchema, breadcrumbSchema, faqSchema, reviewSchema]} />

            <div className="min-h-screen pt-24 pb-20">
                {/* Breadcrumb / Back Link */}
                <div className="container mx-auto px-4 mb-8">
                    <Link
                        href="/servicos"
                        className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Voltar para Serviços
                    </Link>
                </div>

                {/* Hero Section */}
                <section className="container mx-auto px-4 mb-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6 text-primary">
                            {Icon}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">
                            {service.title}
                        </h1>
                        <p className="text-xl text-accent font-medium mb-6 animate-fadeInUp-delay-1">
                            {service.subtitle}
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed animate-fadeInUp-delay-2">
                            {service.description}
                        </p>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bg-secondary/30 py-16 mb-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            O Que Está Incluído
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {service.benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-card p-6 rounded-lg border border-border flex items-start shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
                                    <p className="text-lg">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Results Section */}
                <section className="container mx-auto px-4 mb-16">
                    <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/20 p-8 rounded-xl text-center">
                        <h3 className="text-2xl font-bold mb-4 text-primary">
                            Impacto no Seu Negócio
                        </h3>
                        <p className="text-lg font-medium">
                            {service.results}
                        </p>
                    </div>
                </section>

                {/* FAQ Section - AI Overviews Optimization */}
                <section className="container mx-auto px-4 mb-16">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            Perguntas Frequentes
                        </h2>
                        <div className="space-y-6">
                            {service.faq.map((item, index) => (
                                <div key={index} className="bg-card border border-border rounded-lg p-6">
                                    <h3 className="text-xl font-semibold mb-3 text-primary">
                                        {item.question}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Reviews Section - Social Proof */}
                <section className="bg-secondary/30 py-16 mb-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            O Que Nossos Clientes Dizem
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {service.reviews.map((review, index) => (
                                <div key={index} className="bg-card p-6 rounded-lg border border-border shadow-sm">
                                    <div className="flex items-center mb-4">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                                    <p className="font-semibold text-primary">{review.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Vamos Conversar Sobre Sua Empresa?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Agende um diagnóstico estratégico para entendermos como este serviço se aplica à sua realidade.
                    </p>
                    <Button variant="hero" size="xl" asChild>
                        <Link href="/contato">
                            Fale Comigo
                        </Link>
                    </Button>
                </section>
            </div>
        </>
    );
}
