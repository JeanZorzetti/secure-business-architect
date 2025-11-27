import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/services';
import { Button } from '@/components/ui/button';

interface RelatedServicesProps {
    tags: string[];
}

export function RelatedServices({ tags }: RelatedServicesProps) {
    // Normalize tags for comparison
    const normalizedTags = tags.map(t => t.toLowerCase());

    // Define keywords for each service
    const serviceKeywords: Record<string, string[]> = {
        'contratos-empresariais': ['contrato', 'contratos', 'negociação', 'cláusula', 'jurídico'],
        'estruturacao-societaria': ['sócio', 'sócios', 'sociedade', 'acordo', 'holding', 'sucessão'],
        'due-diligence': ['due diligence', 'm&a', 'fusão', 'aquisição', 'compra', 'investimento', 'auditoria'],
        'consultoria-trabalhista': ['trabalhista', 'empregado', 'funcionário', 'rh', 'compliance', 'regimento'],
        'direito-agronegocio': ['agro', 'agronegócio', 'rural', 'fazenda', 'parceria', 'arrendamento'],
    };

    // Find relevant services
    const relevantServices = services.filter(service => {
        const keywords = serviceKeywords[service.slug] || [];
        return keywords.some(keyword =>
            normalizedTags.some(tag => tag.includes(keyword))
        );
    });

    // If no specific match, show a default service (e.g., Contratos or generic)
    // Or show nothing. Let's show nothing to be safe, or maybe the first one if we want to push services.
    // Better to show nothing if not relevant to avoid noise.
    if (relevantServices.length === 0) return null;

    // Limit to 2 services
    const displayServices = relevantServices.slice(0, 2);

    return (
        <section className="my-12 p-8 bg-secondary/20 rounded-xl border border-primary/10">
            <h3 className="text-2xl font-bold mb-6 text-primary">
                Como Posso Ajudar Sua Empresa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayServices.map((service) => (
                    <div key={service.slug} className="bg-card p-6 rounded-lg shadow-sm border border-border flex flex-col">
                        <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                        <p className="text-muted-foreground mb-4 flex-grow text-sm">
                            {service.description.slice(0, 100)}...
                        </p>
                        <Button variant="outline" className="w-full mt-auto group" asChild>
                            <Link href={`/servicos/${service.slug}`}>
                                Saiba Mais
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
        </section>
    );
}
