'use client';

import { generateStructuredData, type SEOConfig } from '@/lib/seo';

interface StructuredDataProps {
  config: SEOConfig;
}

export function StructuredData({ config }: StructuredDataProps) {
  const structuredData = generateStructuredData(config);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.website),
        }}
      />
      {structuredData.content && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.content),
          }}
        />
      )}
    </>
  );
}

