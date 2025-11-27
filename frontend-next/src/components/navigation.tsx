'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/servicos', label: 'Serviços' },
    { path: '/conteudo', label: 'Insights' },
    { path: '/calculadora', label: 'Calculadora' },
    { path: '/como-funciona', label: 'Como Funciona' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50
                    bg-background/80 backdrop-blur-lg
                    border-b border-border/50
                    shadow-elegant transition-all duration-300
                    hover:shadow-xl"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center space-x-2"
            aria-label="JB Advocacia - Página inicial"
          >
            <h1 className="text-2xl font-bold text-primary">JB Advocacia</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8" role="menubar" aria-label="Menu principal">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-smooth relative group ${isActive(link.path)
                  ? 'text-accent'
                  : 'text-foreground hover:text-accent'
                  }`}
                role="menuitem"
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  aria-hidden="true"
                ></span>
              </Link>
            ))}

            <Button variant="default" size="sm" asChild className="group">
              <Link href="/contato">
                Agende uma Sessão
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="md:hidden flex items-center gap-2">

            {/* Mobile Menu Button */}
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 space-y-4"
            role="menu"
            aria-label="Menu mobile"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block py-2 text-base font-medium transition-smooth ${isActive(link.path)
                  ? 'text-accent'
                  : 'text-foreground hover:text-accent'
                  }`}
                onClick={() => setIsOpen(false)}
                role="menuitem"
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="default" className="w-full" asChild>
              <Link href="/contato" onClick={() => setIsOpen(false)}>
                Agende uma Sessão
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
