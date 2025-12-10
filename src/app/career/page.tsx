'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useQuickEnquiry } from '@/contexts/quick-enquiry-context';
import { getPublishedJobs } from '@/lib/services/content.service';
import type { AdminJob } from '@/lib/admin/jobs-admin';

const JOB_CATEGORIES = [
  { id: 'all' as const, label: 'All' },
  { id: 'development' as const, label: 'Development' },
  { id: 'design' as const, label: 'Design' },
  { id: 'management' as const, label: 'Management' },
  { id: 'marketing' as const, label: 'Marketing' },
] as const;

type JobCategory =
  | 'development'
  | 'management'
  | 'design'
  | 'marketing'
  | 'all';

export default function CareerPage() {
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('all');
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useQuickEnquiry();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const data = await getPublishedJobs();
        setJobs(data as AdminJob[]);
      } catch (error) {
        console.error('Failed to load jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    void loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    if (selectedCategory === 'all') {
      return jobs;
    }
    return jobs.filter((job) => job.category === selectedCategory);
  }, [jobs, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      {/* Hero Section - Compact */}
      <section className="relative pb-8 pt-12 sm:pb-10 sm:pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gray-700" />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                Career
              </span>
              <div className="h-px w-12 bg-gray-700" />
            </div>
            <h1 className="mb-4 text-center text-3xl font-normal leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
              Join our dynamic team dedicated to{' '}
              <span className="text-[#43b14b]">innovation and excellence</span>
            </h1>
            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-gray-400 sm:text-base">
              NebulaX Research & Technologies Pvt. Ltd. provides a learning
              platform for technical, emotional, and social growth. Join our
              success story through exciting opportunities in a supportive,
              dynamic environment.
            </p>
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="py-8 sm:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="mb-4 text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
              Career Opportunities
            </h2>
          </div>

          {/* Category Filter */}
          <div className="mb-6 flex flex-wrap items-center gap-2 sm:mb-8">
            {JOB_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-md px-4 py-2 text-sm font-normal ${
                  selectedCategory === category.id
                    ? 'bg-[#43b14b] text-white'
                    : 'border border-gray-800/50 bg-gray-900/30 text-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Job Cards Grid */}
          {loading ? (
            <div className="py-20 text-center text-gray-500">
              Loading jobs...
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              No jobs available at the moment.
            </div>
          ) : (
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map((job) => (
                <Link
                  key={job.slug}
                  href={`/career/${job.slug}`}
                  className="block h-full"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-800/50 bg-gray-900/30">
                    {/* Header */}
                    <div className="p-6 sm:p-7 md:p-8">
                      <span className="mb-4 inline-block rounded-md border border-[#43b14b]/30 bg-[#43b14b]/20 px-3.5 py-1.5 text-xs font-medium text-[#43b14b]">
                        {job.corporateTitle}
                      </span>
                      <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2.5 text-sm text-gray-400 sm:text-base">
                        <Calendar className="h-4 w-4 text-[#43b14b] sm:h-5 sm:w-5" />
                        <span>
                          Post Date:{' '}
                          {job.postedDate
                            ? job.postedDate.includes('/')
                              ? job.postedDate
                              : job.postedDate.replace(/-/g, '/')
                            : 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1 px-6 pb-6 sm:px-7 sm:pb-7 md:px-8 md:pb-8">
                      <p className="line-clamp-4 text-sm leading-relaxed text-gray-400 sm:text-base">
                        {job.shortDescription}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 md:px-8 md:pb-8">
                      <div className="flex items-center justify-center gap-2 text-sm font-medium text-[#43b14b] sm:text-base">
                        <span>View Detail</span>
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-3 text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
              Let&apos;s connect and turn your vision into reality.
            </h2>
            <p className="mb-5 text-sm text-gray-400 sm:text-base">
              We are available from 9:00 AM to 6:00 PM, Monday to Friday.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+9779709098343"
                className="rounded-md bg-[#43b14b] px-8 py-3 font-medium text-white transition-colors hover:bg-[#3a9a41]"
              >
                Reach out now! +977 9709098343
              </a>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-md border border-gray-700 px-8 py-3 font-medium text-white transition-colors hover:border-gray-600"
              >
                Let&apos;s start conversation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
