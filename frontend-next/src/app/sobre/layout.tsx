import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Jennifer Barreto | Advocacia Empresarial Estratégica',
  description: '12 anos de experiência em direito empresarial. Especialista em contratos estratégicos e assessoria para negócios complexos.',
  keywords: 'jennifer barreto advogada, advocacia empresarial, experiência direito empresarial, especialista contratos',
  alternates: {
    canonical: 'https://jbadvocacia.roilabs.com.br/sobre',
  },
  openGraph: {
    title: 'Sobre Jennifer Barreto | Advocacia Empresarial Estratégica',
    description: '12 anos de experiência em direito empresarial. Especialista em contratos estratégicos e assessoria para negócios complexos.',
    type: 'profile',
    url: 'https://jbadvocacia.roilabs.com.br/sobre',
    siteName: 'Jennifer Barreto Advocacia',
    locale: 'pt_BR',
    images: [
      {
        url: 'https://jbadvocacia.roilabs.com.br/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jennifer Barreto - Advocacia Empresarial Estratégica',
      },
    ],
  },
};

export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
