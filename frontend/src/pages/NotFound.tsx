import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Página Não Encontrada - 404"
        description="A página que você procura não existe ou foi movida."
        url={`https://jbadvocacia.roilabs.com.br${location.pathname}`}
      />
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="text-8xl md:text-9xl font-bold text-accent mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Página Não Encontrada</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" asChild>
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Voltar ao Início
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
