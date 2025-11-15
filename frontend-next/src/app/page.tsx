import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Início',
  description: 'Advocacia Empresarial Estratégica - Consultoria jurídica especializada',
  alternates: {
    canonical: 'https://jbadvocacia.roilabs.com.br',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Jennifer Barreto Advocacia</h1>
        <p className="text-xl text-muted-foreground">Next.js SSR - Em desenvolvimento</p>
        <div className="mt-8 space-y-2">
          <p className="text-sm">✅ TypeScript configurado</p>
          <p className="text-sm">✅ Tailwind CSS configurado</p>
          <p className="text-sm">✅ SEO Metadata API configurado</p>
          <p className="text-sm">✅ Google Analytics configurado</p>
          <p className="text-sm">✅ Canonical URL no HTML estático</p>
        </div>
      </div>
    </main>
  );
}
