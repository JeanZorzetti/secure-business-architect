import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Início" },
    { path: "/sobre", label: "Sobre" },
    { path: "/servicos", label: "Serviços" },
    { path: "/conteudo", label: "Insights" },
    { path: "/contato", label: "Contato" },
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
            to="/"
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
                to={link.path}
                className={`text-sm font-medium transition-smooth relative group ${
                  isActive(link.path)
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
                role="menuitem"
                aria-current={isActive(link.path) ? "page" : undefined}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform ${
                    isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  aria-hidden="true"
                ></span>
              </Link>
            ))}
            <Button variant="cta" size="sm" asChild className="group">
              <Link to="/contato">
                Agende uma Sessão
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
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
                to={link.path}
                className={`block py-2 text-base font-medium transition-smooth ${
                  isActive(link.path)
                    ? "text-accent"
                    : "text-foreground hover:text-accent"
                }`}
                onClick={() => setIsOpen(false)}
                role="menuitem"
                aria-current={isActive(link.path) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="cta" className="w-full" asChild>
              <Link to="/contato" onClick={() => setIsOpen(false)}>
                Agende uma Sessão
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
