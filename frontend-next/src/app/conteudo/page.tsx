'use client';

import { useState, useEffect } from "react";
import BlogCard from "@/components/blog-card";
import { Search, Filter, Calendar, Tag, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPosts, getCategories, type BlogPost, type BlogCategory } from "@/lib/api";

export default function ConteudoPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 12;

  // Fetch categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data.filter(cat => cat.isActive));
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    loadCategories();
  }, []);

  // Fetch posts when filters change
  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getPosts({
          category: selectedCategory || undefined,
          search: searchQuery.trim() || undefined,
          page,
          limit,
        });

        setPosts(data.posts);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Não foi possível carregar os artigos. Tente novamente mais tarde.');
        console.error('Failed to load posts:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, [selectedCategory, searchQuery, page]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPage(1);
  };

  // Transform posts for BlogCard
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
    slug: post.slug,
    category: post.category,
    tags: post.tags,
  }));

  // Loading state
  if (isLoading && posts.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20">
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
  if (error && posts.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h2 className="text-2xl font-bold">Erro ao carregar artigos</h2>
            <p className="text-muted-foreground">{error}</p>
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
      {/* Hero Section */}
      <section className="bg-secondary py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Da Minha Mesa
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights práticos sobre direito empresarial, negociações e estratégia
            de negócios. Conteúdos baseados em 12 anos de experiência no campo de
            batalha dos negócios empresariais.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 mb-8">
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

          {/* Results Counter */}
          <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {total}{" "}
              {total === 1 ? "artigo encontrado" : "artigos encontrados"}
            </span>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
          </div>
        </div>
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
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          {selectedCategory
            ? `Artigos de ${categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}`
            : "Todos os Artigos"}
        </h2>

        {transformedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transformedPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1 || isLoading}
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {page} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || isLoading}
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
}
