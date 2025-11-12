import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollProgress, ScrollToTop } from "@/components/ui/scroll-progress";
import Layout from "./pages/Layout";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Content = lazy(() => import("./pages/ContentAPI")); // ✅ API real ativada
const BlogPost = lazy(() => import("./pages/BlogPostAPI")); // ✅ API real ativada
const Contact = lazy(() => import("./pages/Contact"));
const Calculator = lazy(() => import("./pages/Calculator"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      <p className="mt-4 text-muted-foreground">Carregando...</p>
    </div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollProgress />
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="sobre" element={<About />} />
                <Route path="servicos" element={<Services />} />
                <Route path="conteudo" element={<Content />} />
                <Route path="conteudo/:slug" element={<BlogPost />} />
                <Route path="contato" element={<Contact />} />
                <Route path="calculadora" element={<Calculator />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
