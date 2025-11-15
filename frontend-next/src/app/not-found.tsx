import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Página Não Encontrada
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="hero" size="xl" asChild>
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link href="/contato">
              Entre em Contato
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
