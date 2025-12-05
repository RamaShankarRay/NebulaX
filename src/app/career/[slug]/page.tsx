import { getJobBySlug, getAllJobSlugs } from '@/lib/career-data';
import { notFound } from 'next/navigation';
import JobDetailClient from './job-detail-client';

interface JobDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getAllJobSlugs().map((slug) => ({
    slug,
  }));
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  return <JobDetailClient job={job} />;
}
