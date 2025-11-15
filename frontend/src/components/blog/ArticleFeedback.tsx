/**
 * ArticleFeedback - Widget de feedback do artigo
 * Fase 8: Analytics e Testes
 */

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, CheckCircle2 } from 'lucide-react';
import { trackArticleFeedback } from '@/utils/analytics';
import styles from './ArticleFeedback.module.css';

interface ArticleFeedbackProps {
  articleSlug: string;
}

export function ArticleFeedback({ articleSlug }: ArticleFeedbackProps) {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (helpful: boolean) => {
    setFeedback(helpful ? 'helpful' : 'not-helpful');
    setShowComment(!helpful); // Show comment box only if not helpful
    trackArticleFeedback(articleSlug, helpful);
  };

  const handleSubmitComment = () => {
    if (comment.trim()) {
      trackArticleFeedback(articleSlug, false, comment);
      // TODO: Send to backend API for storage
      console.log('[Feedback]', { articleSlug, helpful: false, comment });
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <CheckCircle2 className={styles.successIcon} size={48} />
          <h3 className={styles.successTitle}>Obrigada pelo feedback!</h3>
          <p className={styles.successText}>
            Sua opinião nos ajuda a melhorar continuamente o conteúdo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Question */}
        <div className={styles.header}>
          <MessageSquare className={styles.headerIcon} size={24} />
          <h3 className={styles.title}>Este artigo foi útil?</h3>
        </div>

        {/* Feedback Buttons */}
        {!feedback && (
          <div className={styles.actions}>
            <button
              onClick={() => handleFeedback(true)}
              className={`${styles.button} ${styles.buttonPositive}`}
              aria-label="Sim, foi útil"
            >
              <ThumbsUp size={20} />
              Sim, ajudou!
            </button>
            <button
              onClick={() => handleFeedback(false)}
              className={`${styles.button} ${styles.buttonNegative}`}
              aria-label="Não foi útil"
            >
              <ThumbsDown size={20} />
              Não muito
            </button>
          </div>
        )}

        {/* Thank You Message - Positive */}
        {feedback === 'helpful' && (
          <div className={styles.thankYou}>
            <CheckCircle2 className={styles.checkIcon} size={20} />
            <p>
              Ótimo! Ficamos felizes que o conteúdo foi útil para você.
            </p>
          </div>
        )}

        {/* Comment Box - Negative */}
        {feedback === 'not-helpful' && showComment && (
          <div className={styles.commentBox}>
            <label htmlFor="feedback-comment" className={styles.commentLabel}>
              O que podemos melhorar? (Opcional)
            </label>
            <textarea
              id="feedback-comment"
              className={styles.textarea}
              placeholder="Compartilhe suas sugestões..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={500}
            />
            <div className={styles.commentActions}>
              <button
                onClick={() => setShowComment(false)}
                className={styles.skipButton}
              >
                Pular
              </button>
              <button
                onClick={handleSubmitComment}
                className={styles.submitButton}
                disabled={!comment.trim()}
              >
                Enviar Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
