import { BlogPost } from './api';

interface ScoredArticle extends BlogPost {
  score: number;
}

export function getRelatedArticles(
  currentArticle: BlogPost,
  allArticles: BlogPost[],
  maxResults: number = 3
): BlogPost[] {
  // Filter out current article and non-published posts
  const candidates = allArticles.filter(
    (article) =>
      article.slug !== currentArticle.slug &&
      article.status === 'PUBLISHED'
  );

  if (candidates.length === 0) {
    return [];
  }

  // Calculate score for each candidate
  const scoredArticles: ScoredArticle[] = candidates.map((article) => {
    let score = 0;

    // Same category: +10 points
    if (article.category === currentArticle.category) {
      score += 10;
    }

    // Common tags: +3 points per tag
    if (article.tags && currentArticle.tags) {
      const commonTags = article.tags.filter((tag) =>
        currentArticle.tags.includes(tag)
      );
      score += commonTags.length * 3;
    }

    // Recency bonus (newer articles are slightly preferred)
    if (article.publishedAt) {
      const publishDate = new Date(article.publishedAt);
      const now = new Date();
      const daysSincePublish = Math.floor(
        (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSincePublish < 30) {
        score += 2; // Very recent
      } else if (daysSincePublish < 90) {
        score += 1; // Recent
      }
    }

    return { ...article, score };
  });

  // Sort by score (descending) and return top results
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(({ score, ...article }) => article);
}
