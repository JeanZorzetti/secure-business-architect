'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Send, Heart } from 'lucide-react';
import { trackArticleFeedback } from '@/lib/analytics';
import { cn } from '@/lib/utils';

interface ArticleFeedbackProps {
  articleSlug: string;
}

type FeedbackState = 'initial' | 'positive' | 'negative' | 'comment' | 'submitted';

export default function ArticleFeedback({ articleSlug }: ArticleFeedbackProps) {
  const [state, setState] = useState<FeedbackState>('initial');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedback = (helpful: boolean) => {
    trackArticleFeedback(articleSlug, helpful);

    if (helpful) {
      setState('positive');
      // Auto-close positive feedback after 3 seconds
      setTimeout(() => {
        setState('initial');
      }, 3000);
    } else {
      setState('negative');
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);

    // Track feedback with comment
    trackArticleFeedback(articleSlug, false, comment);

    // Simulate API call (replace with real endpoint if needed)
    await new Promise(resolve => setTimeout(resolve, 500));

    setState('submitted');
    setIsSubmitting(false);

    // Reset after 5 seconds
    setTimeout(() => {
      setState('initial');
      setComment('');
    }, 5000);
  };

  return (
    <div className="my-16 p-8 bg-gradient-to-br from-accent/5 to-background rounded-lg border border-accent/20 shadow-md print:hidden">
      {state === 'initial' && (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Este artigo foi útil?</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Seu feedback nos ajuda a criar conteúdo melhor
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => handleFeedback(true)}
              className="group flex flex-col items-center gap-2 px-8 py-4 rounded-lg border-2 border-border hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950/20 transition-all duration-200"
            >
              <ThumbsUp className="h-8 w-8 text-muted-foreground group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
              <span className="text-sm font-medium">Sim, ajudou!</span>
            </button>

            <button
              onClick={() => handleFeedback(false)}
              className="group flex flex-col items-center gap-2 px-8 py-4 rounded-lg border-2 border-border hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all duration-200"
            >
              <ThumbsDown className="h-8 w-8 text-muted-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
              <span className="text-sm font-medium">Pode melhorar</span>
            </button>
          </div>
        </div>
      )}

      {state === 'positive' && (
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full mb-4">
            <Heart className="h-8 w-8 text-green-600 dark:text-green-400 fill-current" />
          </div>
          <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
            Obrigado pelo feedback!
          </h3>
          <p className="text-sm text-muted-foreground">
            Ficamos felizes em ajudar. Continue explorando nossos artigos!
          </p>
        </div>
      )}

      {state === 'negative' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start gap-3 mb-4">
            <MessageSquare className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">
                Como podemos melhorar?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Seu comentário é muito importante para nós (opcional)
              </p>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Compartilhe suas sugestões..."
                className="w-full min-h-[100px] p-3 rounded-lg border border-border bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                maxLength={500}
              />

              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">
                  {comment.length}/500 caracteres
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => setState('initial')}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmitComment}
                    disabled={isSubmitting || !comment.trim()}
                    className={cn(
                      'flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm transition-all',
                      comment.trim()
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                    )}
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {state === 'submitted' && (
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
            <MessageSquare className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-bold mb-2">Feedback recebido!</h3>
          <p className="text-sm text-muted-foreground">
            Obrigado por compartilhar suas sugestões. Vamos trabalhar para melhorar!
          </p>
        </div>
      )}
    </div>
  );
}
