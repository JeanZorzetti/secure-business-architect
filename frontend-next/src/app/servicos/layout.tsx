import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Serviços Jurídicos Empresariais | Jennifer Barreto Advocacia',
  description: 'Consultoria estratégica, due diligence, estruturação societária e gestão de contratos empresariais. Soluções jurídicas personalizadas para empresas.',
  keywords: 'serviços jurídicos empresariais, consultoria advocacia, due diligence, contratos empresariais, direito societário',
  alternates: {
    canonical: 'https://jbadvocacia.roilabs.com.br/servicos',
  },
  openGraph: {
    title: 'Serviços Jurídicos Empresariais | Jennifer Barreto Advocacia',
    description: 'Consultoria estratégica, due diligence, estruturação societária e gestão de contratos empresariais.',
    type: 'website',
    url: 'https://jbadvocacia.roilabs.com.br/servicos',
    siteName: 'Jennifer Barreto Advocacia',
    locale: 'pt_BR',
    images: [
      {
        url: 'https://jbadvocacia.roilabs.com.br/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Serviços Jurídicos Empresariais - Jennifer Barreto Advocacia',
      },
    ],
  },
};

export default function ServicosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
