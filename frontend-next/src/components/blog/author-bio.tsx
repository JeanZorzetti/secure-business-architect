import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';

export function AuthorBio() {
    return (
        <div className="bg-card border border-border rounded-xl p-8 my-12 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                    src="/assets/about-image.jpg"
                    alt="Jennifer Barreto"
                    fill
                    className="object-cover rounded-full border-4 border-secondary"
                />
            </div>
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2 text-primary">Sobre a Autora</h3>
                <p className="text-lg font-semibold mb-2">Jennifer Barreto</p>
                <p className="text-muted-foreground mb-4">
                    Advogada especialista em Direito Empresarial e Estratégia de Negócios.
                    Com mais de 12 anos de experiência, atua na proteção jurídica e alavancagem de resultados para empresas de diversos setores.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/sobre">
                            Conheça Minha Trajetória
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="https://www.linkedin.com/company/jb-advocacia-de-neg%C3%B3cios-e-contratos-empresariais/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
