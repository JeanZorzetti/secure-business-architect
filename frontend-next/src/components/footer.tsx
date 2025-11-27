import Link from 'next/link';
import { Mail, Phone, Linkedin, Instagram } from 'lucide-react';

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
              OAB/RS 85.296
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

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:juridico@jbnegociosempresariais.com.br" className="hover:text-primary transition-colors">
                  juridico@jbnegociosempresariais.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="https://wa.me/555497023784" className="hover:text-primary transition-colors">
                  (54) 9702-3784
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <a
                  href="https://www.linkedin.com/company/jb-advocacia-de-neg%C3%B3cios-e-contratos-empresariais/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                <a
                  href="https://www.instagram.com/jbadv.contratos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Instagram
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
