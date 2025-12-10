import { getJobBySlug, getPublishedJobs } from '@/lib/services/content.service';
import { notFound } from 'next/navigation';
import JobDetailClient from './job-detail-client';
import type { AdminJob } from '@/lib/admin/jobs-admin';
import { generateMetadata as genMeta } from '@/lib/seo';
import type { Metadata } from 'next';

interface JobDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const job = await getJobBySlug(params.slug) as AdminJob | null;

  if (!job) {
    return genMeta({
      title: 'Job Not Found',
      description: 'The requested job posting could not be found.',
      noindex: true,
    });
  }

  const publishedTime = job.postedDate 
    ? new Date(job.postedDate).toISOString()
    : undefined;

  return genMeta({
    title: `${job.title} - Career at NebulaX`,
    description: job.shortDescription || `Join our team as ${job.title}. ${job.corporateTitle || 'Exciting opportunity'}.`,
    keywords: [
      job.title,
      job.category,
      'job',
      'career',
      'employment',
      'Nepal',
    ],
    url: `/career/${params.slug}`,
    type: 'job',
    section: job.category,
    publishedTime,
  });
}

export async function generateStaticParams() {
  // For static export, we need to pre-generate all job detail pages
  // This function runs at build time to generate static routes
  try {
    const jobs = await getPublishedJobs();

    if (!jobs || !Array.isArray(jobs)) {
      console.warn('generateStaticParams: Invalid jobs data returned');
      return [];
    }

    if (jobs.length === 0) {
      console.warn(
        'generateStaticParams: No published jobs found in Firestore'
      );
      console.warn(
        'generateStaticParams: Make sure jobs are created and published in the admin panel'
      );
      return [];
    }

    // Extract slugs from jobs - ensure they're valid strings
    const params = (jobs as Array<{ slug?: string }>)
      .filter((job) => {
        const hasSlug =
          job &&
          job.slug &&
          typeof job.slug === 'string' &&
          job.slug.trim().length > 0;
        if (!hasSlug) {
          console.warn('generateStaticParams: Job missing slug:', job);
        }
        return hasSlug;
      })
      .map((job) => ({
        slug: (job.slug as string).trim(),
      }));

    console.log(
      `generateStaticParams: Successfully generated ${params.length} job routes`
    );
    if (params.length > 0) {
      console.log(
        'generateStaticParams: Slugs:',
        params.map((p) => p.slug).join(', ')
      );
    }

    return params;
  } catch (error) {
    console.error('Error generating static params for jobs:', error);
    console.error(
      'generateStaticParams: This will cause job detail pages to fail with static export'
    );
    console.error(
      'generateStaticParams: Make sure Firestore is accessible and jobs exist'
    );
    // Return empty array - this means no static pages will be generated
    // With static export, this will cause 404s for job detail pages
    return [];
  }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const job = (await getJobBySlug(params.slug)) as AdminJob | null;

  if (!job || !job.slug) {
    notFound();
  }

  return <JobDetailClient job={job} />;
}
