'use client';

import { Calendar, Clock, User, Tag, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/lib/api';

interface ArticleContentProps {
  post: BlogPost;
}

// Calculate reading time (simple estimation: 200 words per minute)
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export default function ArticleContent({ post }: ArticleContentProps) {
  const readingTime = calculateReadingTime(post.content);
  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Data não disponível';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <article className="container mx-auto px-4 max-w-4xl">
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
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time>{publishDate}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min de leitura</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 hover:text-accent transition-colors ml-auto"
            >
              <Share2 className="h-4 w-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg prose-neutral dark:prose-invert max-w-none
                     prose-headings:font-bold prose-headings:tracking-tight
                     prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                     prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                     prose-p:leading-relaxed prose-p:mb-6
                     prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-foreground prose-strong:font-bold
                     prose-ul:my-6 prose-li:my-2
                     prose-blockquote:border-l-accent prose-blockquote:bg-accent/5 prose-blockquote:py-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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

        {/* CTA */}
        <div className="mt-16 bg-accent/10 border border-accent/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Precisa de Consultoria Jurídica Estratégica?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Agende uma conversa para discutir como posso ajudar sua empresa a
            crescer de forma segura e estruturada.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link href="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
