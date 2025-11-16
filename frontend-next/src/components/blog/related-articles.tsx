import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/api';

interface RelatedArticlesProps {
  articles: BlogPost[];
  currentSlug?: string;
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  // Filter out current article and limit to 3
  const filteredArticles = articles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, 3);

  if (filteredArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-16 border-t border-border">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3">Artigos Relacionados</h2>
        <p className="text-muted-foreground">
          Continue aprofundando seus conhecimentos em direito empresarial
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const readingTime = calculateReadingTime(article.content);
          const publishDate = article.publishedAt
            ? new Date(article.publishedAt).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })
            : 'Data não disponível';

          return (
            <article
              key={article.slug}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-elegant hover:border-accent/50 transition-all duration-300"
            >
              {/* Image */}
              {article.coverImage && (
                <Link
                  href={`/conteudo/${article.slug}`}
                  className="block relative overflow-hidden"
                >
                  <div className="aspect-video relative">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  </div>
                </Link>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3">
                  {article.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  <Link href={`/conteudo/${article.slug}`}>{article.title}</Link>
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time>{publishDate}</time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{readingTime} min</span>
                  </div>
                </div>

                {/* Link */}
                <Link
                  href={`/conteudo/${article.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
                >
                  Ler artigo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
