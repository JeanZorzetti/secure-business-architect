import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ArrowLeft, Clock, Loader2, AlertCircle } from "lucide-react";
import { SEO, AttorneySchema, ArticleSchema } from "@/components/SEO";
import { ReadingProgress, calculateReadingTime } from "@/components/ReadingProgress";
import { SocialShare } from "@/components/SocialShare";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { ExecutiveSummary } from "@/components/blog/ExecutiveSummary";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { extractExecutiveSummary } from "@/utils/extractExecutiveSummary";
import { extractTableOfContents, addIdsToHeadings } from "@/utils/extractTableOfContents";
import blogService from "@/services/blogService";
import { useEffect, useMemo } from "react";

const BlogPostAPI = () => {
  const { slug } = useParams<{ slug: string }>();

  // Fetch post from API
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => blogService.getPostBySlug(slug!),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  // Track view
  useEffect(() => {
    if (post && slug) {
      blogService.incrementViews(slug);
    }
  }, [post, slug]);

  // Extrair resumo executivo e conteúdo limpo (antes dos early returns)
  const summaryData = useMemo(() => {
    if (!post) return { htmlWithoutSummary: '', learningPoints: [], readingTime: '8 minutos', result: '' };
    return extractExecutiveSummary(post.content);
  }, [post]);

  // Extrair table of contents e adicionar IDs aos headings
  const tocItems = useMemo(() => {
    return extractTableOfContents(summaryData.htmlWithoutSummary);
  }, [summaryData.htmlWithoutSummary]);

  const contentWithIds = useMemo(() => {
    return addIdsToHeadings(summaryData.htmlWithoutSummary, tocItems);
  }, [summaryData.htmlWithoutSummary, tocItems]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-accent" />
            <p className="text-muted-foreground">Carregando artigo...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h2 className="text-2xl font-bold">Artigo não encontrado</h2>
            <p className="text-muted-foreground">
              O artigo que você procura não existe ou foi removido.
            </p>
            <Link
              to="/conteudo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md font-semibold hover:bg-accent/90 transition-smooth"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Not published
  if (post.status !== 'PUBLISHED') {
    return <Navigate to="/conteudo" replace />;
  }

  const readingTime = calculateReadingTime(post.content);
  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : '';

  const currentUrl = `${window.location.origin}/conteudo/${post.slug}`;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        image={post.coverImage || undefined}
        url={currentUrl}
        type="article"
        article={{
          publishedTime: post.publishedAt || undefined,
          modifiedTime: post.updatedAt,
          author: post.author,
          section: post.category,
          tags: post.tags,
        }}
      />
      <AttorneySchema />
      <ArticleSchema
        headline={post.title}
        description={post.excerpt}
        url={currentUrl}
        image={post.coverImage || undefined}
        datePublished={post.publishedAt || post.createdAt}
        dateModified={post.updatedAt}
        author={post.author}
        category={post.category}
      />
      <ReadingProgress />

      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto mb-8">
          <Link
            to="/conteudo"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-smooth"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o blog
          </Link>
        </div>

        {/* Layout: Article + TOC Sidebar (Desktop) */}
        <div className="max-w-7xl mx-auto xl:grid xl:grid-cols-[1fr_280px] xl:gap-12">
          {/* Main Article */}
          <article className="max-w-4xl"  >

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-elegant">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-12">
          {/* Category Badge */}
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-6">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt || undefined}>{publishDate}</time>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min de leitura</span>
            </div>
            <span>•</span>
            <span>Por {post.author}</span>
          </div>
        </header>

        {/* Executive Summary */}
        {summaryData.learningPoints.length > 0 && (
          <ExecutiveSummary
            readingTime={summaryData.readingTime}
            learningPoints={summaryData.learningPoints}
            result={summaryData.result}
          />
        )}

        {/* Content */}
        <ArticleContent htmlContent={contentWithIds} />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-8 pb-8 border-b border-border">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Social Share */}
        <div className="mb-12">
          <SocialShare
            url={currentUrl}
            title={post.title}
            description={post.excerpt}
          />
        </div>

        {/* Author Info */}
        <div className="bg-secondary p-8 rounded-lg mb-12">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-2xl">
                {post.author.charAt(0)}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Sobre {post.author}</h3>
              <p className="text-muted-foreground">
                Advogada especializada em direito empresarial com mais de 12 anos de experiência.
                Atua estrategicamente com empresas que buscam segurança jurídica e crescimento sustentável.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-accent/20 to-accent/5 p-8 rounded-lg text-center border border-accent/30">
          <h3 className="text-2xl font-bold mb-4">
            Precisa de Consultoria Jurídica?
          </h3>
          <p className="text-muted-foreground mb-6">
            Agende uma reunião estratégica para discutir como posso ajudar sua empresa.
          </p>
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md font-semibold hover:bg-accent/90 transition-smooth"
          >
            Agendar Consulta
          </Link>
        </div>
          </article>

          {/* Table of Contents Sidebar (Desktop) */}
          <aside className="hidden xl:block">
            <TableOfContents items={tocItems} />
          </aside>
        </div>

        {/* Table of Contents Mobile (Floating + Drawer) */}
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
};

export default BlogPostAPI;
