import Link from 'next/link';
import { Mail, Phone, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Jennifer Barreto</h3>
            <p className="text-sm text-primary-foreground/80">
              Advocacia Empresarial Estratégica
            </p>
            <p className="text-sm text-primary-foreground/80 mt-2">
              OAB/XX 123456
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/conteudo"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:contato@jenniferbarreto.adv.br"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  contato@jenniferbarreto.adv.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a
                  href="tel:+5511999999999"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <a
                  href="https://linkedin.com/in/jenniferbarreto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-smooth"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Jennifer Barreto. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
