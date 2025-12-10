import { Metadata } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || 'https://nebulax-aac9e.web.app';
const SITE_NAME = 'NebulaX Research & Technologies';
const DEFAULT_AUTHOR = 'NebulaX';
const DEFAULT_DESCRIPTION =
  'NebulaX - The Best IT Company in Nepal. Transform your vision into digital reality with cutting-edge software solutions, web development, mobile apps, and digital marketing services.';

export interface SEOConfig {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service' | 'job';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
}

/**
 * Generate full URL from path
 */
export function getFullUrl(path: string): string {
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Normalize image URL to absolute URL
 */
export function normalizeImageUrl(url?: string): string {
  if (!url || !url.trim()) {
    return `${BASE_URL}/nebulax.png`;
  }

  url = url.trim();
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${BASE_URL}${url}`;
  return `${BASE_URL}/${url}`;
}

/**
 * Optimize description for SEO
 */
export function optimizeDescription(
  description?: string,
  maxLength: number = 160
): string {
  if (!description) return DEFAULT_DESCRIPTION;

  description = description.trim().replace(/\s+/g, ' ');
  if (description.length <= maxLength) return description;

  // Try to cut at sentence boundary
  const cutAt = description.lastIndexOf('.', maxLength - 3);
  if (cutAt > maxLength * 0.7) {
    return description.substring(0, cutAt + 1);
  }

  return description.substring(0, maxLength - 3) + '...';
}

/**
 * Generate comprehensive metadata for Next.js
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    author = DEFAULT_AUTHOR,
    publishedTime,
    modifiedTime,
    section,
    tags,
    noindex = false,
  } = config;

  const fullTitle = title.includes('NebulaX')
    ? title
    : `${title} | ${SITE_NAME}`;
  const optimizedDescription = optimizeDescription(description);
  const fullUrl = url ? getFullUrl(url) : BASE_URL;
  const fullImageUrl = normalizeImageUrl(image);

  const metadata: Metadata = {
    title: fullTitle,
    description: optimizedDescription,
    keywords: keywords?.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: SITE_NAME,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type:
        type === 'article' || type === 'service' || type === 'job'
          ? 'article'
          : 'website',
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description: optimizedDescription,
      siteName: SITE_NAME,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags && tags.length > 0 && { tags }),
    },
    twitter: {
      card: type === 'service' ? 'summary' : 'summary_large_image',
      title: fullTitle,
      description: optimizedDescription,
      images: [fullImageUrl],
      creator: '@nebulax',
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

/**
 * Generate structured data (JSON-LD) for different content types
 */
export function generateStructuredData(config: SEOConfig): object {
  const {
    title,
    description,
    image,
    url,
    type = 'website',
    author = DEFAULT_AUTHOR,
    publishedTime,
    modifiedTime,
    section,
    tags,
  } = config;

  const fullUrl = url ? getFullUrl(url) : BASE_URL;
  const fullImageUrl = normalizeImageUrl(image);
  const optimizedDescription = optimizeDescription(description);

  // Base website structured data
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/nebulax.png`,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+977-9709098343',
        contactType: 'Customer Service',
        areaServed: 'NP',
        availableLanguage: 'en',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://www.facebook.com/nebulax',
      'https://www.linkedin.com/company/nebulax',
    ],
  };

  // Content-specific structured data
  let contentData: any = null;

  if (type === 'article') {
    contentData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: optimizedDescription,
      image: fullImageUrl,
      author: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/nebulax.png`,
        },
      },
      datePublished: publishedTime || new Date().toISOString(),
      dateModified: modifiedTime || publishedTime || new Date().toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
      ...(section && { articleSection: section }),
      ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
    };
  } else if (type === 'service') {
    contentData = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description: optimizedDescription,
      image: fullImageUrl,
      url: fullUrl,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/nebulax.png`,
        },
      },
      areaServed: {
        '@type': 'Country',
        name: 'Nepal',
      },
      ...(tags && tags.length > 0 && { keywords: tags.join(', ') }),
    };
  } else if (type === 'job') {
    contentData = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: title,
      description: optimizedDescription,
      datePosted: publishedTime || new Date().toISOString(),
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: SITE_NAME,
        sameAs: BASE_URL,
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rajbiraj',
          addressCountry: 'NP',
        },
      },
      ...(section && { jobLocationType: section }),
    };
  }

  return {
    website: websiteData,
    content: contentData,
  };
}
