import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts, BlogPost } from '@/lib/api';
import { getRelatedArticles } from '@/lib/get-related-articles';
import ArticleContent from '@/components/blog/article-content';
import { RelatedServices } from '@/components/blog/related-services';
import JsonLd from '@/components/seo/json-ld';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/structured-data';
import { markdownToHtml } from '@/lib/markdown';

// ISR: Revalidate every hour
export const revalidate = 3600;

// Allow dynamic params beyond those in generateStaticParams
// This enables ISR for new posts added after build
export const dynamicParams = true;

// Generate static params for all published posts (SSG)
export async function generateStaticParams() {
  // Fallback slugs in case API is unreachable during build
  const fallbackSlugs = [
    'contratos-empresariais-clausulas-essenciais',
    'importancia-due-diligence-ma',
    'gestao-contratos-lucratividade',
    'sociedade-50-50-riscos',
    'contrato-parceria-agronegocio',
    'contrato-social-acordo-socios',
    'due-diligence-checklist',
    'clausulas-essenciais-contratos',
    'negociacao-estrategica-contratos',
    'passivos-trabalhistas-prevencao',
    'pops-ambiente-corporativo',
  ];

  // TEMPORARY: Always use fallback to ensure pages are generated
  // Will investigate API accessibility from Vercel build environment
  console.log('[Build] Using fallback slugs for initial generation');
  return fallbackSlugs.map(slug => ({ slug }));
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const post = await getPostBySlug(resolvedParams.slug);

    return {
      title: post.title,
      description: post.excerpt,
      keywords: post.tags.join(', '),
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        url: `https://jbadvocacia.roilabs.com.br/conteudo/${post.slug}`,
        siteName: 'Jennifer Barreto Advocacia',
        locale: 'pt_BR',
        publishedTime: post.publishedAt || undefined,
        authors: [post.author],
        tags: post.tags,
        images: post.coverImage
          ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
          : [
            {
              url: 'https://jbadvocacia.roilabs.com.br/og-image-blog.png',
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
      },
      alternates: {
        canonical: `https://jbadvocacia.roilabs.com.br/conteudo/${post.slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Artigo não encontrado',
      description: 'O artigo que você procura não foi encontrado.',
    };
  }
}



export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  let post;

  try {
    post = await getPostBySlug(resolvedParams.slug);

    // Convert Markdown to HTML if needed
    // We assume content starting with headers (#) or containing markdown syntax is markdown
    // Or we just run it through marked, which handles HTML gracefully too (usually)
    if (post.content) {
      post.content = await markdownToHtml(post.content);
    }

    // Only show published posts
    if (post.status !== 'PUBLISHED') {
      console.warn(`[Page] Post ${resolvedParams.slug} is not published (status: ${post.status})`);
      notFound();
    }
  } catch (error) {
    console.error(`[Page] Failed to load post ${resolvedParams.slug}:`, error);
    notFound();
  }

  // Fetch all posts to find related articles
  let relatedArticles: BlogPost[] = [];
  try {
    const allPosts = await getPosts({ limit: 100 });
    relatedArticles = getRelatedArticles(post, allPosts.posts, 3);
  } catch (error) {
    console.error('[Page] Failed to fetch related articles:', error);
    // Continue without related articles
  }

  // Structured Data
  const articleUrl = `https://jbadvocacia.roilabs.com.br/conteudo/${post.slug}`;
  const articleSchema = getArticleSchema(post, articleUrl);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://jbadvocacia.roilabs.com.br' },
    { name: 'Blog', url: 'https://jbadvocacia.roilabs.com.br/conteudo' },
    { name: post.title },
  ]);

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <ArticleContent post={post} relatedArticles={relatedArticles} />
      <div className="container mx-auto px-4 max-w-4xl">
        <RelatedServices tags={post.tags || []} />
      </div>
    </>
  );
}
