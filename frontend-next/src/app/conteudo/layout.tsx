import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Da Minha Mesa | Jennifer Barreto Advocacia',
  description: 'Artigos práticos sobre contratos empresariais, societário, due diligence e estratégias jurídicas para empresários. Conteúdo baseado em casos reais.',
  keywords: ['blog jurídico', 'direito empresarial', 'artigos advocacia', 'insights jurídicos', 'contratos empresariais'],
  alternates: {
    canonical: 'https://jbadvocacia.roilabs.com.br/conteudo',
  },
  openGraph: {
    title: 'Blog - Da Minha Mesa | Jennifer Barreto Advocacia',
    description: 'Insights práticos sobre direito empresarial, negociações e estratégia de negócios.',
    type: 'website',
    url: 'https://jbadvocacia.roilabs.com.br/conteudo',
  },
};

export default function ConteudoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
