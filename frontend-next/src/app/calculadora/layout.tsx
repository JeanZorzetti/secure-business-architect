import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora de Honorários | Jennifer Barreto Advocacia',
  description: 'Calcule uma estimativa de honorários advocatícios para seu projeto empresarial. Ferramenta interativa para obter valores estimados de forma rápida e transparente.',
  keywords: 'calculadora honorários advocacia, custo serviços jurídicos, orçamento advocacia, honorários advocatícios',
  alternates: {
    canonical: 'https://jbadvocacia.roilabs.com.br/calculadora',
  },
  openGraph: {
    title: 'Calculadora de Honorários | Jennifer Barreto Advocacia',
    description: 'Calcule uma estimativa de honorários advocatícios para seu projeto empresarial de forma rápida e transparente.',
    type: 'website',
    url: 'https://jbadvocacia.roilabs.com.br/calculadora',
    siteName: 'Jennifer Barreto Advocacia',
    locale: 'pt_BR',
    images: [
      {
        url: 'https://jbadvocacia.roilabs.com.br/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadora de Honorários - Jennifer Barreto Advocacia',
      },
    ],
  },
};

export default function CalculadoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
