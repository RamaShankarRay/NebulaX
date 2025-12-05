import { getServiceBySlug, getAllServiceSlugs } from '@/lib/services-data';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './service-detail-client';

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

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
