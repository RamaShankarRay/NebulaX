import { getServiceBySlug, getAllServiceSlugs } from '@/lib/services-data';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './service-detail-client';
import { generateMetadata as genMeta } from '@/lib/seo';
import type { Metadata } from 'next';

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return genMeta({
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
      noindex: true,
    });
  }

  return genMeta({
    title: service.title,
    description: service.description,
    keywords: [service.title, 'service', 'NebulaX'],
    image: service.image,
    url: `/services/${params.slug}`,
    type: 'service',
    tags: service.features?.map((f: string) => f) || [],
  });
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
