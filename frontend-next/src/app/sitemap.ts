import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://jbadvocacia.roilabs.com.br';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/calculadora`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/conteudo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic blog posts
  let blogPosts: MetadataRoute.Sitemap = [];

  try {
    const data = await getPosts({ limit: 100 });
    blogPosts = data.posts.map((post) => ({
      url: `${baseUrl}/conteudo/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Failed to fetch posts for sitemap:', error);
  }

  return [...staticPages, ...blogPosts];
}
