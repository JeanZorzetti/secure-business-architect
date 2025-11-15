/**
 * Google Analytics 4 - Event Tracking
 * Fase 8: Analytics e Testes
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

/**
 * Track custom events in Google Analytics 4
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  } else {
    // Fallback: log to console in development
    if (import.meta.env.DEV) {
      console.log('[Analytics Event]', eventName, eventParams);
    }
  }
};

/**
 * Track page view
 */
export const trackPageView = (url: string, title: string) => {
  trackEvent('page_view', {
    page_title: title,
    page_location: url,
    page_path: new URL(url).pathname,
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    scroll_depth: depth,
    engagement_time_msec: Math.round(performance.now()),
  });
};

/**
 * Track CTA clicks
 */
export const trackCTAClick = (
  ctaName: string,
  ctaLocation: 'inline' | 'footer' | 'header'
) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
};

/**
 * Track article share
 */
export const trackShare = (
  platform: 'whatsapp' | 'facebook' | 'twitter' | 'linkedin' | 'copy' | 'native',
  articleSlug: string
) => {
  trackEvent('share', {
    method: platform,
    content_type: 'article',
    item_id: articleSlug,
  });
};

/**
 * Track article feedback
 */
export const trackArticleFeedback = (
  articleSlug: string,
  helpful: boolean,
  comment?: string
) => {
  trackEvent('article_feedback', {
    article_slug: articleSlug,
    helpful: helpful,
    has_comment: !!comment,
  });
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (timeSeconds: number, articleSlug: string) => {
  trackEvent('time_on_page', {
    article_slug: articleSlug,
    time_seconds: timeSeconds,
    engagement_type: timeSeconds > 60 ? 'engaged' : 'bounced',
  });
};

/**
 * Track TOC navigation
 */
export const trackTOCClick = (sectionId: string, sectionTitle: string) => {
  trackEvent('toc_navigation', {
    section_id: sectionId,
    section_title: sectionTitle,
  });
};

/**
 * Track Related Article clicks
 */
export const trackRelatedArticleClick = (
  fromSlug: string,
  toSlug: string,
  position: number
) => {
  trackEvent('related_article_click', {
    from_article: fromSlug,
    to_article: toSlug,
    position: position,
  });
};
