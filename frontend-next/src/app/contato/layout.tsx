import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato - Agende sua Consultoria | Jennifer Barreto Advocacia',
  description: 'Entre em contato para agendar uma consultoria jurídica empresarial estratégica. Atendimento personalizado para empresas.',
  keywords: 'contato advocacia empresarial, consultoria jurídica, agendar advogado, atendimento empresarial',
  alternates: {
    canonical: 'https://jbadvocacia.roilabs.com.br/contato',
  },
  openGraph: {
    title: 'Contato - Agende sua Consultoria | Jennifer Barreto Advocacia',
    description: 'Entre em contato para agendar uma consultoria jurídica empresarial estratégica.',
    type: 'website',
    url: 'https://jbadvocacia.roilabs.com.br/contato',
    siteName: 'Jennifer Barreto Advocacia',
    locale: 'pt_BR',
    images: [
      {
        url: 'https://jbadvocacia.roilabs.com.br/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contato - Jennifer Barreto Advocacia',
      },
    ],
  },
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
