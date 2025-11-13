import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "@/components/BlogCard";
import { Search, Filter, Calendar, Tag, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Reveal } from "@/components/ui/reveal";
import blogService from "@/services/blogService";

const ContentAPI = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 12;

  // Fetch posts from API
  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ['blog-posts', selectedCategory, searchQuery, page],
    queryFn: () => {
      if (searchQuery.trim()) {
        return blogService.searchPosts(searchQuery, {
          category: selectedCategory || undefined,
          page,
          limit,
        });
      }
      return blogService.getPosts({
        category: selectedCategory || undefined,
        page,
        limit,
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Fetch categories
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ['blog-categories'],
    queryFn: blogService.getCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });

  const posts = Array.isArray(postsData?.posts) ? postsData.posts : [];
  const categories = Array.isArray(categoriesData)
    ? categoriesData.filter(cat => cat.isActive)
    : [];
  const totalPages = postsData?.totalPages || 1;

  // Transform API data to component format
  const transformedPosts = posts.map((post) => ({
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : 'Sem data',
    dateSort: post.publishedAt || post.createdAt,
    slug: post.slug,
    category: post.category,
    tags: post.tags,
  }));

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page on category change
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPage(1);
  };

  // Loading state
  if (postsLoading && !posts.length) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <SEO
          title="Blog - Da Minha Mesa"
          description="Insights práticos sobre direito empresarial, negociações e estratégia de negócios."
          keywords="blog jurídico, direito empresarial, artigos advocacia"
          type="website"
        />
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-accent" />
            <p className="text-muted-foreground">Carregando artigos...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (postsError) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <SEO title="Blog - Da Minha Mesa" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h2 className="text-2xl font-bold">Erro ao carregar artigos</h2>
            <p className="text-muted-foreground">
              Não foi possível conectar ao servidor. Tente novamente mais tarde.
            </p>
            <Button onClick={() => window.location.reload()}>
              Tentar Novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const featuredPost = transformedPosts[0];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title="Blog - Da Minha Mesa"
        description="Artigos práticos sobre contratos empresariais, societário, due diligence e estratégias jurídicas para empresários. Conteúdo baseado em casos reais."
        keywords="blog jurídico, direito empresarial, artigos advocacia, insights jurídicos, contratos empresariais"
        url="https://jbadvocacia.roilabs.com.br/conteudo"
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
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-smooth"
                />
              </div>
              <Button
                variant="outline"
                className="md:w-auto"
                onClick={handleClearFilters}
                disabled={!searchQuery && !selectedCategory}
              >
                <Filter className="h-4 w-4 mr-2" />
                Limpar Filtros
              </Button>
            </div>

            {/* Category Pills */}
            {!categoriesLoading && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(null)}
                  className="rounded-full"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  Todas
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.slug ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      handleCategoryChange(category.slug === selectedCategory ? null : category.slug)
                    }
                    className="rounded-full"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            )}

            {/* Results Counter */}
            <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {postsData?.total || 0}{" "}
                {postsData?.total === 1 ? "artigo encontrado" : "artigos encontrados"}
              </span>
              {postsLoading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container mx-auto px-4 mb-12">
          <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg shadow-elegant">
            <div className="max-w-3xl">
              <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                Artigo em Destaque
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-lg mb-6 text-primary-foreground/90">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
                <time>{featuredPost.date}</time>
                <span>•</span>
                <span>8 min de leitura</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {selectedCategory
              ? `Artigos de ${categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}`
              : "Todos os Artigos"}
          </h2>
        </Reveal>

        {transformedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transformedPosts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.1}>
                  <BlogCard {...post} />
                </Reveal>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1 || postsLoading}
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {page} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || postsLoading}
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhum artigo encontrado</h3>
            <p className="text-muted-foreground mb-6">
              Tente ajustar seus filtros ou termos de busca
            </p>
            <Button onClick={handleClearFilters}>
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

export default ContentAPI;
