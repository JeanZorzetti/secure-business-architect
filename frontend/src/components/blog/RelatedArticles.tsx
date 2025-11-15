import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { calculateReadingTime } from '@/components/ReadingProgress';
import styles from './RelatedArticles.module.css';

/**
 * RelatedArticles - Recomendações de artigos relacionados
 *
 * Design: Grid de 3 cards com imagem, título, excerpt e meta
 * Objetivo: Aumentar tempo no site e engajamento
 * Posição: Final do artigo, antes do CTA de contato
 *
 * Features:
 * - Grid responsivo (3 cols desktop → 2 cols tablet → 1 col mobile)
 * - Cards com hover effect (lift + shadow gold)
 * - Imagem cover com overlay gradient
 * - Badge de categoria com cor gold
 * - Meta info: data + tempo de leitura
 * - Arrow icon no link "Ler artigo"
 *
 * @example
 * <RelatedArticles articles={relatedPosts} />
 */

export interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  publishedAt: string;
  content: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  currentSlug?: string;
}

export function RelatedArticles({ articles, currentSlug }: RelatedArticlesProps) {
  // Filter out current article
  const filteredArticles = articles.filter(article => article.slug !== currentSlug).slice(0, 3);

  if (filteredArticles.length === 0) {
    return null;
  }

  return (
    <section className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Artigos Relacionados</h2>
        <p className={styles.subtitle}>
          Continue aprofundando seus conhecimentos em direito empresarial
        </p>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filteredArticles.map((article) => {
          const readingTime = calculateReadingTime(article.content);
          const publishDate = new Date(article.publishedAt).toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });

          return (
            <article key={article.slug} className={styles.card}>
              {/* Image */}
              {article.coverImage && (
                <Link to={`/conteudo/${article.slug}`} className={styles.imageLink}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className={styles.image}
                      loading="lazy"
                    />
                    <div className={styles.imageOverlay} />
                  </div>
                </Link>
              )}

              {/* Content */}
              <div className={styles.content}>
                {/* Category Badge */}
                <span className={styles.badge}>{article.category}</span>

                {/* Title */}
                <h3 className={styles.cardTitle}>
                  <Link to={`/conteudo/${article.slug}`} className={styles.titleLink}>
                    {article.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className={styles.excerpt}>{article.excerpt}</p>

                {/* Meta */}
                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <Calendar size={14} className={styles.metaIcon} />
                    <time dateTime={article.publishedAt} className={styles.metaText}>
                      {publishDate}
                    </time>
                  </div>
                  <span className={styles.metaDivider}>•</span>
                  <div className={styles.metaItem}>
                    <Clock size={14} className={styles.metaIcon} />
                    <span className={styles.metaText}>{readingTime} min</span>
                  </div>
                </div>

                {/* Link */}
                <Link to={`/conteudo/${article.slug}`} className={styles.link}>
                  Ler artigo
                  <ArrowRight size={16} className={styles.linkIcon} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
