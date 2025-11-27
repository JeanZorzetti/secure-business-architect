'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/api';
import { extractExecutiveSummary } from '@/lib/extract-executive-summary';
import { extractTableOfContents, addIdsToHeadings } from '@/lib/extract-toc';
import { trackPageView, trackTimeOnPage } from '@/lib/analytics';
import ExecutiveSummary from './executive-summary';
import EnhancedArticleContent from './enhanced-article-content';
import { TableOfContents } from './table-of-contents';
import InlineCTA from './inline-cta';
import MobileShareButtons from './mobile-share-buttons';
import ArticleFeedback from './article-feedback';
import { RelatedArticles } from './related-articles';
import { AuthorBio } from './author-bio';

interface ArticleContentProps {
  post: BlogPost;
  relatedArticles?: BlogPost[];
}

// Calculate reading time (simple estimation: 200 words per minute)
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export default function ArticleContent({ post, relatedArticles = [] }: ArticleContentProps) {
  const readingTime = calculateReadingTime(post.content);
  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    : 'Data não disponível';

  // Extract executive summary from HTML content
  const summaryData = useMemo(() => {
    return extractExecutiveSummary(post.content);
  }, [post.content]);

  // Add IDs to headings and extract TOC
  const { contentWithIds, tocItems } = useMemo(() => {
    const htmlWithIds = addIdsToHeadings(summaryData.htmlWithoutSummary);
    const items = extractTableOfContents(htmlWithIds);
    return { contentWithIds: htmlWithIds, tocItems: items };
  }, [summaryData.htmlWithoutSummary]);

  // Track page view and time on page
  useEffect(() => {
    const startTime = Date.now();

    trackPageView(window.location.href, post.title);

    return () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackTimeOnPage(timeSpent, post.slug);
    };
  }, [post.slug, post.title]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <article className="max-w-4xl">
            {/* Header */}
            <header className="mb-12">
              {/* Category */}
              <div className="mb-4">
                <span className="inline-block bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border py-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <Link href="/sobre" className="hover:text-primary transition-colors hover:underline">
                    {post.author}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time>{publishDate}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min de leitura</span>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>
            )}

            {/* Executive Summary */}
            <ExecutiveSummary
              readingTime={summaryData.readingTime}
              learningPoints={summaryData.learningPoints}
              outcome={summaryData.outcome}
            />

            {/* Enhanced Article Content (HTML Parser) */}
            <EnhancedArticleContent content={contentWithIds} title={post.title} />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tags:</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Inline CTA */}
            <InlineCTA />

            {/* Author Bio - E-E-A-T */}
            <AuthorBio />

            {/* Article Feedback */}
            <ArticleFeedback articleSlug={post.slug} />

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <RelatedArticles articles={relatedArticles} currentSlug={post.slug} />
            )}
          </article>

          {/* Desktop Table of Contents (Sticky Sidebar) */}
          <aside className="hidden xl:block">
            <TableOfContents items={tocItems} />
          </aside>
        </div>
      </div>

      {/* Mobile Table of Contents (Floating Button + Drawer) */}
      <div className="xl:hidden">
        <TableOfContents items={tocItems} />
      </div>

      {/* Mobile Share Buttons */}
      <MobileShareButtons
        url={typeof window !== 'undefined' ? window.location.href : ''}
        title={post.title}
        description={post.excerpt}
      />
    </div>
  );
}
