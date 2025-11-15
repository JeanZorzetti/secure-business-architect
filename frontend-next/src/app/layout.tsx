import type { Metadata } from 'next';
import { Inter, Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import GoogleAnalytics from '@/components/google-analytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ['latin'], variable: '--font-lato' });

export const metadata: Metadata = {
  metadataBase: new URL('https://jbadvocacia.roilabs.com.br'),
  title: {
    default: 'Jennifer Barreto - Advocacia Empresarial Estratégica',
    template: '%s | Jennifer Barreto Advocacia',
  },
  description: 'Consultoria jurídica estratégica para empresas. Especializada em contratos, M&A, LGPD e gestão de riscos corporativos.',
  keywords: ['advocacia empresarial', 'consultoria jurídica', 'contratos', 'M&A', 'LGPD', 'compliance'],
  authors: [{ name: 'Jennifer Barreto' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://jbadvocacia.roilabs.com.br',
    title: 'Jennifer Barreto - Advocacia Empresarial Estratégica',
    description: 'Consultoria jurídica estratégica para empresas. Especializada em contratos, M&A, LGPD e gestão de riscos corporativos.',
    siteName: 'JB Advocacia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jennifer Barreto - Advocacia Empresarial Estratégica',
    description: 'Consultoria jurídica estratégica para empresas.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0A0F1C" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${lato.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
