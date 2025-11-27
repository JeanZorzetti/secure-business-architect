import { BlogPost } from './api';

const SITE_URL = 'https://jbadvocacia.roilabs.com.br';
const SITE_NAME = 'Jennifer Barreto Advocacia';

/**
 * Organization Schema for homepage and sitewide
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: SITE_NAME,
    description:
      'Advocacia empresarial com foco em estratégia, não apenas documentos. Contratos, societário, due diligence e agronegócio.',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
    },
    priceRange: '$$',
    founder: {
      '@type': 'Person',
      name: 'Jennifer Barreto',
    },
  };
}

/**
 * Person Schema for /sobre page
 */
export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jennifer Barreto',
    jobTitle: 'Advogada Empresarial',
    description:
      '12 anos de experiência em direito empresarial. Especialista em contratos estratégicos e assessoria para negócios complexos.',
    url: `${SITE_URL}/sobre`,
    image: `${SITE_URL}/og-image.png`,
    worksFor: {
      '@type': 'LegalService',
      name: SITE_NAME,
    },
  };
}

/**
 * Article Schema for blog posts
 */
export function getArticleSchema(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || `${SITE_URL}/og-image-blog.png`,
    author: {
      '@type': 'Person',
      name: post.author || 'Jennifer Barreto',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
}

/**
 * WebSite Schema with search action
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/conteudo?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Blog Posting (for blog listing page)
 */
export function getBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Da Minha Mesa - Blog Jennifer Barreto Advocacia',
    description:
      'Insights práticos sobre direito empresarial, negociações e estratégia de negócios.',
    url: `${SITE_URL}/conteudo`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}

/**
 * Service Schema for individual service pages
 */
export function getServiceSchema(service: any, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    provider: {
      '@type': 'LegalService',
      name: SITE_NAME,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    description: service.description,
    url: url,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'BRL',
      price: '0', // Consult for price
      priceValidUntil: '2025-12-31',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Benefícios',
      itemListElement: service.benefits.map((benefit: string) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: benefit,
        },
      })),
    },
  };
}

/**
 * FAQ Schema for service pages
 */
export function getFAQSchema(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Review Schema for service pages (merges with Service schema via @id)
 */
export function getReviewSchema(reviews: { author: string; rating: number; text: string }[], url?: string) {
  if (!reviews || reviews.length === 0) return null;

  const ratingValue = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': url, // Merge with main Service node
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue,
      reviewCount: reviews.length,
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
      },
      reviewBody: review.text,
    })),
  };
}
