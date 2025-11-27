import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backjennifer.roilabs.com.br',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects for old URLs with accents to new slugs without accents
  async redirects() {
    return [
      {
        source: '/conteudo/importância-de-diligência-ma',
        destination: '/conteudo/importancia-due-diligence-ma',
        permanent: true,
      },
      // Redirect old /insights/ blog path to /conteudo/
      {
        source: '/insights',
        destination: '/conteudo',
        permanent: true,
      },
      {
        source: '/insights/:slug*',
        destination: '/conteudo/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
