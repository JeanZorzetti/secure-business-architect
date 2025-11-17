import JsonLd from '@/components/seo/json-ld';
import { getPersonSchema, getBreadcrumbSchema } from '@/lib/structured-data';

export default function SobrePage() {
  const personSchema = getPersonSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://jbadvocacia.roilabs.com.br' },
    { name: 'Sobre' },
  ]);

  return (
    <>
      <JsonLd data={[personSchema, breadcrumbSchema]} />
      {/* Resto do conteúdo da página */}
    </>
  );
}
