import { type ReactNode } from 'react';
import { Quote as QuoteIcon } from 'lucide-react';
import styles from './Quote.module.css';

interface QuoteProps {
  children: ReactNode;
  author?: string;
  source?: string;
}

export function Quote({ children, author, source }: QuoteProps) {
  return (
    <div className={styles.container}>
      <QuoteIcon className={styles.icon} size={32} />
      <blockquote className={styles.quote}>
        <div className={styles.text}>{children}</div>
        {(author || source) && (
          <footer className={styles.footer}>
            {author && <cite className={styles.author}>{author}</cite>}
            {author && source && <span className={styles.separator}>•</span>}
            {source && <span className={styles.source}>{source}</span>}
          </footer>
        )}
      </blockquote>
    </div>
  );
}
