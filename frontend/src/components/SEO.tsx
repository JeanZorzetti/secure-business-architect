import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const defaultSEO = {
  title: "Jennifer Barreto - Advocacia Empresarial Estratégica",
  description:
    "Assessoria jurídica estratégica para empresários que dominam seu produto mas precisam de segurança em contratos e negociações. 12 anos de experiência em direito empresarial.",
  keywords:
    "advogada de negócios empresariais, assessoria de contratos, consultoria jurídica para empresários, direito societário, gestão de contratos empresariais",
  image: "https://jbadvocacia.roilabs.com.br/og-image.png",
  url: "https://jbadvocacia.roilabs.com.br/",
  type: "website" as const,
};

export const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  article,
}: SEOProps) => {
  const seo = {
    title: title
      ? `${title} | Jennifer Barreto Advocacia`
      : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    image: image || defaultSEO.image,
    url: url, // Remove fallback - cada página deve passar sua URL
    type,
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      <meta
        property="og:site_name"
        content="Jennifer Barreto - Advocacia Empresarial"
      />

      {/* Article specific meta tags */}
      {article && type === "article" && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags &&
            article.tags.map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
        </>
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {seo.url && <meta name="twitter:url" content={seo.url} />}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Canonical URL - Only if URL is provided */}
      {seo.url && <link rel="canonical" href={seo.url} />}
    </Helmet>
  );
};

// Schema.org JSON-LD structured data
interface SchemaOrgProps {
  type: "Organization" | "Attorney" | "LegalService" | "Service" | "Article" | "BreadcrumbList";
  data: Record<string, any>;
}

export const SchemaOrg = ({ type, data }: SchemaOrgProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// Default organization schema
export const OrganizationSchema = () => (
  <SchemaOrg
    type="Organization"
    data={{
      name: "Jennifer Barreto Advocacia",
      description:
        "Advocacia empresarial estratégica especializada em contratos e negociações para empresários.",
      url: "https://jbadvocacia.roilabs.com.br",
      logo: "https://jbadvocacia.roilabs.com.br/logo.png",
      image: "https://jbadvocacia.roilabs.com.br/og-image.png",
      telephone: "+55-11-99999-9999",
      email: "contato@jenniferbarreto.adv.br",
      address: {
        "@type": "PostalAddress",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      sameAs: [
        "https://linkedin.com/in/jenniferbarreto",
      ],
      priceRange: "$$",
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
    }}
  />
);

// Attorney schema
export const AttorneySchema = () => (
  <SchemaOrg
    type="Attorney"
    data={{
      name: "Jennifer Barreto",
      jobTitle: "Advogada Empresarial",
      description:
        "Advogada especializada em direito empresarial com 12 anos de experiência em contratos e negociações estratégicas.",
      url: "https://jbadvocacia.roilabs.com.br/sobre",
      image: "https://jbadvocacia.roilabs.com.br/about-image.jpg",
      knowsAbout: [
        "Direito Empresarial",
        "Contratos Comerciais",
        "Direito Societário",
        "Due Diligence",
        "Compliance Empresarial",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Universidade [Nome]",
      },
    }}
  />
);

// Legal Service schema
export const LegalServiceSchema = () => (
  <SchemaOrg
    type="LegalService"
    data={{
      name: "Assessoria Jurídica Empresarial Estratégica",
      description:
        "Consultoria jurídica completa para empresários, desde a análise de negócios até a execução de contratos.",
      provider: {
        "@type": "Attorney",
        name: "Jennifer Barreto",
      },
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
      serviceType: [
        "Consultoria Jurídica Empresarial",
        "Elaboração de Contratos",
        "Due Diligence",
        "Compliance",
        "Direito Societário",
      ],
    }}
  />
);

// Service Schema - For individual service pages
interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}

export const ServiceSchema = ({ name, description, url, serviceType }: ServiceSchemaProps) => (
  <SchemaOrg
    type="Service"
    data={{
      name,
      description,
      provider: {
        "@type": "LegalService",
        name: "Jennifer Barreto Advocacia",
        url: "https://jbadvocacia.roilabs.com.br",
      },
      areaServed: {
        "@type": "Country",
        name: "Brasil",
      },
      serviceType: serviceType || name,
      url,
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
    }}
  />
);

// Article Schema - For blog posts
interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  category?: string;
}

export const ArticleSchema = ({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = "Jennifer Barreto",
  category
}: ArticleSchemaProps) => (
  <SchemaOrg
    type="Article"
    data={{
      headline,
      description,
      image: image || "https://jbadvocacia.roilabs.com.br/og-image.png",
      author: {
        "@type": "Person",
        name: author,
        url: "https://jbadvocacia.roilabs.com.br/sobre",
      },
      publisher: {
        "@type": "Organization",
        name: "Jennifer Barreto Advocacia",
        logo: {
          "@type": "ImageObject",
          url: "https://jbadvocacia.roilabs.com.br/logo.png",
        },
      },
      datePublished,
      dateModified: dateModified || datePublished,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
      ...(category && { articleSection: category }),
    }}
  />
);

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => (
  <SchemaOrg
    type="BreadcrumbList"
    data={{
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }}
  />
);
