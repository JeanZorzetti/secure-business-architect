'use client';

import { Scale, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function InlineCTA() {
  return (
    <div className="my-16">
      <div className="relative bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 rounded-xl p-8 md:p-12 shadow-2xl border-2 border-accent overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-6 p-4 bg-accent rounded-full shadow-lg">
            <Scale className="h-12 w-12 text-accent-foreground" />
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-bold text-background mb-4">
            Precisa de Consultoria Jurídica Estratégica?
          </h3>

          {/* Description */}
          <p className="text-base md:text-lg text-background/90 mb-8 max-w-2xl leading-relaxed">
            Com mais de 12 anos de experiência em direito empresarial,
            ajudo empresários e gestores a estruturar negócios,
            mitigar riscos e tomar decisões jurídicas estratégicas com segurança.
          </p>

          {/* CTA Button */}
          <Button
            variant="secondary"
            size="lg"
            asChild
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-8 py-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Link href="/contato" className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Agendar Diagnóstico Estratégico
            </Link>
          </Button>

          {/* Subtext */}
          <p className="mt-4 text-sm text-background/70">
            Primeira consulta: análise completa do seu cenário jurídico
          </p>
        </div>

        {/* Decorative Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-accent via-accent/70 to-accent" />
      </div>
    </div>
  );
}
