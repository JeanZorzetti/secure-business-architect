import { useState, useMemo } from "react";
import BlogCard from "@/components/BlogCard";
import { Search, Filter, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/ui/reveal";

const Content = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "relevance">("date");

  const blogPosts = [
    {
      title: "Por que a gestão de contratos é crucial para a lucratividade da sua empresa?",
      excerpt:
        "Um contrato bem gerenciado pode ser a diferença entre o sucesso e o fracasso de uma operação comercial. Entenda como o ciclo de vida contratual impacta diretamente seu resultado financeiro e como evitar as armadilhas mais comuns que drenam recursos.",
      date: "15 de Março, 2024",
      dateSort: "2024-03-15",
      slug: "gestao-contratos-lucratividade",
      category: "Contratos",
      tags: ["gestão", "contratos", "lucratividade", "compliance"],
    },
    {
      title: "Sociedade 50/50: Por que essa pode não ser a melhor escolha para você",
      excerpt:
        "A divisão igualitária parece justa, mas pode se tornar um pesadelo operacional. Analisamos os riscos de uma sociedade 50/50 e apresentamos alternativas mais inteligentes para estruturar sua empresa sem criar impasses que paralisam decisões estratégicas.",
      date: "10 de Março, 2024",
      dateSort: "2024-03-10",
      slug: "sociedade-50-50-riscos",
      category: "Societário",
      tags: ["sociedade", "governança", "sócios", "estrutura"],
    },
    {
      title: "Contrato de Parceria: Uma solução para a mão-de-obra no agronegócio",
      excerpt:
        "O contrato de parceria no agronegócio oferece flexibilidade e compartilhamento de riscos. Descubra como estruturar parcerias que protegem ambas as partes, garantem a continuidade operacional e se adaptam às peculiaridades do setor rural.",
      date: "5 de Março, 2024",
      dateSort: "2024-03-05",
      slug: "contrato-parceria-agronegocio",
      category: "Agronegócio",
      tags: ["agronegócio", "parceria", "contratos", "rural"],
    },
    {
      title: "Contrato Social vs. Acordo de Sócios: Entenda a diferença crucial",
      excerpt:
        "Muitos empresários confundem esses dois documentos ou ignoram a importância do Acordo de Sócios. Explicamos quando usar cada um e por que o Acordo de Sócios pode ser o documento mais estratégico da sua empresa.",
      date: "28 de Fevereiro, 2024",
      dateSort: "2024-02-28",
      slug: "contrato-social-acordo-socios",
      category: "Societário",
      tags: ["contrato social", "acordo de sócios", "governança", "documentação"],
    },
    {
      title: "Due Diligence: O que avaliar antes de comprar uma empresa",
      excerpt:
        "Comprar uma empresa sem uma due diligence adequada é como dirigir vendado. Conheça os 7 pontos críticos que devem ser avaliados antes de qualquer aquisição e como evitar surpresas que podem custar milhões.",
      date: "20 de Fevereiro, 2024",
      dateSort: "2024-02-20",
      slug: "due-diligence-checklist",
      category: "M&A",
      tags: ["due diligence", "aquisição", "fusão", "avaliação"],
    },
    {
      title: "3 Cláusulas que todo contrato empresarial precisa ter",
      excerpt:
        "Existem cláusulas que são verdadeiras 'vacinas jurídicas' para sua empresa. Descubra as três mais importantes que protegem seus interesses e evitam litígios caros e demorados.",
      date: "12 de Fevereiro, 2024",
      dateSort: "2024-02-12",
      slug: "clausulas-essenciais-contratos",
      category: "Contratos",
      tags: ["cláusulas", "contratos", "proteção", "litígios"],
    },
    {
      title: "Como negociar contratos sem deixar dinheiro na mesa",
      excerpt:
        "Negociar é mais sobre equilíbrio do que sobre vitória. Aprenda as estratégias que uso para garantir que meus clientes fechem acordos vantajosos sem comprometer relações comerciais importantes.",
      date: "5 de Fevereiro, 2024",
      dateSort: "2024-02-05",
      slug: "negociacao-estrategica-contratos",
      category: "Negociação",
      tags: ["negociação", "estratégia", "contratos", "acordos"],
    },
    {
      title: "Passivos trabalhistas ocultos: Como identificar e prevenir",
      excerpt:
        "Muitas empresas descobrem passivos trabalhistas milionários tarde demais. Saiba quais são os sinais de alerta e como implementar uma cultura de compliance que protege sua empresa desde já.",
      date: "28 de Janeiro, 2024",
      dateSort: "2024-01-28",
      slug: "passivos-trabalhistas-prevencao",
      category: "Trabalhista",
      tags: ["trabalhista", "compliance", "passivos", "prevenção"],
    },
    {
      title: "O óbvio precisa ser dito: A importância dos POPs no ambiente corporativo",
      excerpt:
        "Procedimentos Operacionais Padrão não são apenas documentos burocráticos. São ferramentas poderosas de gestão e proteção legal. Veja como transformar expectativas implícitas em regras explícitas.",
      date: "20 de Janeiro, 2024",
      dateSort: "2024-01-20",
      slug: "pops-ambiente-corporativo",
      category: "Compliance",
      tags: ["POPs", "procedimentos", "compliance", "gestão"],
    },
    {
      title: "Contratos Empresariais: Cláusulas Essenciais para Proteger seu Negócio",
      excerpt:
        "Descubra as cláusulas indispensáveis que todo contrato empresarial deve conter para garantir segurança jurídica e evitar litígios. Um guia prático para empresários que querem proteger seus interesses.",
      date: "15 de Dezembro, 2023",
      dateSort: "2023-12-15",
      slug: "contratos-empresariais-clausulas-essenciais",
      category: "Contratos",
      tags: ["contratos", "cláusulas", "segurança", "empresarial"],
    },
    {
      title: "A Importância da Due Diligence em Fusões e Aquisições",
      excerpt:
        "Due diligence é o processo que pode salvar ou arruinar uma operação de M&A. Entenda por que esse procedimento é crítico antes de qualquer aquisição ou fusão empresarial e quais são os principais pontos de atenção.",
      date: "10 de Dezembro, 2023",
      dateSort: "2023-12-10",
      slug: "importancia-due-diligence-ma",
      category: "M&A",
      tags: ["due diligence", "M&A", "fusão", "aquisição"],
    },
  ];

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map((post) => post.category)));
    return cats.sort();
  }, []);

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts];

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          post.category.toLowerCase().includes(query)
      );
    }

    // Sort posts
    if (sortBy === "date") {
      filtered.sort((a, b) => b.dateSort.localeCompare(a.dateSort));
    }

    return filtered;
  }, [blogPosts, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title="Blog - Da Minha Mesa"
        description="Insights práticos sobre direito empresarial, negociações e estratégia de negócios. Conteúdos baseados em 12 anos de experiência."
        keywords="blog jurídico, direito empresarial, artigos advocacia, insights jurídicos"
        type="website"
      />

      {/* Hero Section */}
      <section className="bg-secondary py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Da Minha Mesa
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights práticos sobre direito empresarial, negociações e estratégia
              de negócios. Conteúdos baseados em 12 anos de experiência no campo de
              batalha dos negócios empresariais.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 mb-8">
        <Reveal>
          <div className="bg-background border border-border rounded-lg p-6 shadow-sm">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por título, conteúdo ou tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth"
                />
              </div>
              <Button
                variant="outline"
                className="md:w-auto"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Limpar Filtros
              </Button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                <Tag className="h-3 w-3 mr-1" />
                Todas
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setSelectedCategory(category === selectedCategory ? null : category)
                  }
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Results Counter */}
            <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {filteredPosts.length} {filteredPosts.length === 1 ? "artigo encontrado" : "artigos encontrados"}
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Featured Post */}
      <section className="container mx-auto px-4 mb-12">
        <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg shadow-elegant">
          <div className="max-w-3xl">
            <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Artigo em Destaque
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {blogPosts[0].title}
            </h2>
            <p className="text-lg mb-6 text-primary-foreground/90">
              {blogPosts[0].excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
              <time>{blogPosts[0].date}</time>
              <span>•</span>
              <span>8 min de leitura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {selectedCategory ? `Artigos de ${selectedCategory}` : "Todos os Artigos"}
          </h2>
        </Reveal>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <BlogCard {...post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhum artigo encontrado</h3>
            <p className="text-muted-foreground mb-6">
              Tente ajustar seus filtros ou termos de busca
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 mt-20">
        <div className="bg-accent text-accent-foreground p-12 rounded-lg text-center shadow-elegant max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Receba Insights Estratégicos
          </h2>
          <p className="text-lg mb-6 text-accent-foreground/90">
            Assine minha newsletter e receba artigos exclusivos sobre direito
            empresarial e estratégia de negócios diretamente no seu email.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-md text-foreground bg-background border border-border"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-smooth"
            >
              Assinar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Content;
