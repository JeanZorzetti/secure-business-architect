import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/api';
import ArticleContent from '@/components/blog/article-content';

// ISR: Revalidate every hour
export const revalidate = 3600;

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

  try {
    const data = await getPosts({ limit: 100 });
    console.log(`[Build] Successfully generated static params for ${data.posts.length} blog posts from API`);
    return data.posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('[Build] CRITICAL: Failed to fetch from API during build:', error);
    console.warn('[Build] Using fallback slugs to ensure pages are generated');

    // Use fallback slugs so pages are at least generated
    // ISR will update them with real data after first request
    return fallbackSlugs.map(slug => ({ slug }));
  }
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);

    return {
      title: `${post.title} | Blog JB Advocacia`,
      description: post.excerpt,
      keywords: post.tags.join(', '),
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.publishedAt || undefined,
        authors: [post.author],
        tags: post.tags,
        images: post.coverImage ? [post.coverImage] : [],
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
  params: { slug: string };
}) {
  let post;

  try {
    post = await getPostBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  // Only show published posts
  if (post.status !== 'PUBLISHED') {
    notFound();
  }

  return <ArticleContent post={post} />;
}
