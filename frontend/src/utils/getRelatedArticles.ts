/**
 * getRelatedArticles - Lógica de recomendação de artigos
 *
 * Algoritmo:
 * 1. Prioriza artigos da mesma categoria
 * 2. Depois artigos com tags em comum
 * 3. Ordena por score (quanto mais tags em comum, maior o score)
 * 4. Remove o artigo atual
 * 5. Retorna os top 3
 *
 * @param currentArticle - Artigo atual sendo visualizado
 * @param allArticles - Todos os artigos disponíveis
 * @param maxResults - Número máximo de resultados (padrão: 3)
 * @returns Array de artigos relacionados ordenados por relevância
 */

interface Article {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  publishedAt: string;
  status: string;
}

interface ScoredArticle extends Article {
  score: number;
}

export function getRelatedArticles(
  currentArticle: Article,
  allArticles: Article[],
  maxResults: number = 3
): Article[] {
  // Safety check: ensure allArticles is an array
  if (!Array.isArray(allArticles) || allArticles.length === 0) {
    return [];
  }

  // Filter: apenas artigos publicados e diferentes do atual
  const candidates = allArticles.filter(
    (article) =>
      article.slug !== currentArticle.slug &&
      article.status === 'PUBLISHED'
  );

  // Score each article
  const scoredArticles: ScoredArticle[] = candidates.map((article) => {
    let score = 0;

    // Same category: +10 points
    if (article.category === currentArticle.category) {
      score += 10;
    }

    // Common tags: +3 points per tag (with safety checks)
    const articleTags = Array.isArray(article.tags) ? article.tags : [];
    const currentTags = Array.isArray(currentArticle.tags) ? currentArticle.tags : [];
    const commonTags = articleTags.filter((tag) => currentTags.includes(tag));
    score += commonTags.length * 3;

    // Recency bonus: newer articles get slight boost
    const daysSincePublish = Math.floor(
      (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSincePublish < 30) {
      score += 2; // Published in last 30 days
    } else if (daysSincePublish < 90) {
      score += 1; // Published in last 90 days
    }

    return { ...article, score };
  });

  // Sort by score (descending)
  scoredArticles.sort((a, b) => b.score - a.score);

  // Return top N results
  return scoredArticles.slice(0, maxResults);
}

/**
 * Shuffle array randomly (Fisher-Yates algorithm)
 * Used as fallback when no scored matches exist
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
