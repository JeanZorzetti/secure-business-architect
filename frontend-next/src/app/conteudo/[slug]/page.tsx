import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '@/lib/api';
import ArticleContent from '@/components/blog/article-content';

// ISR: Revalidate every hour
export const revalidate = 3600;

// Generate static params for all published posts (SSG)
export async function generateStaticParams() {
  try {
    const data = await getPosts({ limit: 100 });
    console.log(`[Build] Generating static params for ${data.posts.length} blog posts`);
    return data.posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('[Build] CRITICAL: Failed to generate static params for blog posts:', error);
    // In production build, we need these pages, so log prominently
    if (process.env.NODE_ENV === 'production') {
      console.error('[Build] This will result in 404s for all blog posts!');
    }
    return [];
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
