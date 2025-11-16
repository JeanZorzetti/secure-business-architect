'use client';

import { Quote as QuoteIcon } from 'lucide-react';

interface QuoteHighlightProps {
  quote: string;
  author?: string;
  source?: string;
}

export default function QuoteHighlight({ quote, author, source }: QuoteHighlightProps) {
  return (
    <div className="my-10 relative">
      <div className="bg-gradient-to-br from-accent/5 to-background border-l-4 border-accent rounded-r-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Decorative Quote Icon */}
        <div className="absolute -top-3 -left-3 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
          <QuoteIcon className="h-6 w-6 text-accent-foreground" />
        </div>

        {/* Quote Text */}
        <blockquote className="font-serif text-xl md:text-2xl italic text-foreground leading-relaxed mb-4">
          "{quote}"
        </blockquote>

        {/* Author & Source */}
        {(author || source) && (
          <footer className="pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {author && (
                <cite className="not-italic font-semibold text-foreground">
                  {author}
                </cite>
              )}
              {author && source && <span>•</span>}
              {source && <span>{source}</span>}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
