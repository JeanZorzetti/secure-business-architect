import { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Link2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import styles from './MobileShareButtons.module.css';

/**
 * MobileShareButtons - Botões de compartilhamento otimizados para mobile
 *
 * Features:
 * - Native Share API quando disponível (iOS/Android)
 * - Fallback para botões tradicionais
 * - WhatsApp compartilhamento direto
 * - Sticky button que aparece após scroll
 * - Drawer expansível com todas as opções
 * - Responsivo e touch-friendly
 *
 * @example
 * <MobileShareButtons url={url} title={title} description={description} />
 */

interface MobileShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function MobileShareButtons({ url, title, description = '' }: MobileShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  // Check if Native Share API is available
  const hasNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;

  // Handle native share
  const handleNativeShare = async () => {
    if (!hasNativeShare) return;

    try {
      await navigator.share({
        title,
        text: description,
        url,
      });
    } catch (error: unknown) {
      // User cancelled or error occurred
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Share failed:', error);
      }
    }
  };

  // Share URLs
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Link copiado!',
        description: 'O link foi copiado para a área de transferência.',
      });
      setIsOpen(false);
    } catch (err) {
      toast({
        title: 'Erro ao copiar',
        description: 'Não foi possível copiar o link.',
        variant: 'destructive',
      });
    }
  };

  // Open share window
  const openShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  // Show button after scrolling 300px
  useState(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  if (!isVisible) return null;

  return (
    <>
      {/* Sticky Share Button (Mobile Only) */}
      <button
        onClick={hasNativeShare ? handleNativeShare : () => setIsOpen(true)}
        className={styles.stickyButton}
        aria-label="Compartilhar artigo"
      >
        <Share2 size={20} />
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />

          <div className={styles.drawer}>
            {/* Header */}
            <div className={styles.header}>
              <h3 className={styles.title}>Compartilhar</h3>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
            </div>

            {/* Share Options */}
            <div className={styles.options}>
              {/* WhatsApp */}
              <button
                onClick={() => openShare(shareLinks.whatsapp)}
                className={styles.option}
              >
                <div className={`${styles.iconWrapper} ${styles.whatsapp}`}>
                  <MessageCircle size={24} />
                </div>
                <span className={styles.optionLabel}>WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => openShare(shareLinks.facebook)}
                className={styles.option}
              >
                <div className={`${styles.iconWrapper} ${styles.facebook}`}>
                  <Facebook size={24} />
                </div>
                <span className={styles.optionLabel}>Facebook</span>
              </button>

              {/* Twitter */}
              <button
                onClick={() => openShare(shareLinks.twitter)}
                className={styles.option}
              >
                <div className={`${styles.iconWrapper} ${styles.twitter}`}>
                  <Twitter size={24} />
                </div>
                <span className={styles.optionLabel}>Twitter</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => openShare(shareLinks.linkedin)}
                className={styles.option}
              >
                <div className={`${styles.iconWrapper} ${styles.linkedin}`}>
                  <Linkedin size={24} />
                </div>
                <span className={styles.optionLabel}>LinkedIn</span>
              </button>

              {/* Copy Link */}
              <button onClick={copyToClipboard} className={styles.option}>
                <div className={`${styles.iconWrapper} ${styles.copy}`}>
                  <Link2 size={24} />
                </div>
                <span className={styles.optionLabel}>Copiar Link</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
