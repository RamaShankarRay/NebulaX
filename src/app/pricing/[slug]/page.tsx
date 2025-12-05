import { getPricingBySlug, getAllPricingSlugs } from '@/lib/pricing-data';
import { notFound } from 'next/navigation';
import PricingDetailClient from './pricing-detail-client';

interface PricingDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllPricingSlugs().map((slug) => ({
    slug,
  }));
}

export default function PricingDetailPage({ params }: PricingDetailPageProps) {
  const pricing = getPricingBySlug(params.slug);

  if (!pricing) {
    notFound();
  }

  return <PricingDetailClient pricing={pricing} />;
}
