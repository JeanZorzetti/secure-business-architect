interface JsonLdProps {
  data: object | object[];
}

/**
 * Component to inject JSON-LD structured data into the page
 * Usage: <JsonLd data={schemaObject} />
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, process.env.NODE_ENV === 'development' ? 2 : 0),
      }}
    />
  );
}
