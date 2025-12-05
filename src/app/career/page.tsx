'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useQuickEnquiry } from '@/contexts/quick-enquiry-context';
import {
  JOB_CATEGORIES,
  getFilteredJobs,
  type JobCategory,
} from '@/lib/career-data';

export default function CareerPage() {
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>('all');
  const filteredJobs = getFilteredJobs(selectedCategory);
  const { openModal } = useQuickEnquiry();

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Google Standard */}
      <section className="relative border-b border-gray-800 pb-12 pt-20 sm:pb-16 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gray-700" />
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                Career
              </span>
              <div className="h-px w-16 bg-gray-700" />
            </div>
            <h1 className="mb-6 text-center text-4xl font-normal leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
              Join our dynamic team dedicated to{' '}
              <span className="text-blue-400">innovation and excellence</span>
            </h1>
            <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-gray-400 sm:text-lg">
              NebulaX Research & Technologies Pvt. Ltd. provides a learning
              platform for technical, emotional, and social growth. Join our
              success story through exciting opportunities in a supportive,
              dynamic environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="mb-6 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Career Opportunities
            </h2>
          </motion.div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap items-center gap-2 sm:mb-12">
            {JOB_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-md px-4 py-2 text-sm font-normal transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-700 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Job Cards Grid */}
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={`/career/${job.slug}`}
                  className="group block h-full"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 transition-all duration-200 hover:border-gray-700 hover:bg-gray-900">
                    {/* Header */}
                    <div className="border-b border-gray-800 p-6">
                      <span className="mb-3 inline-block rounded-md bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-400">
                        {job.corporateTitle}
                      </span>
                      <h3 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>Post Date: {job.postedDate}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1 p-6">
                      <p className="line-clamp-4 text-sm leading-relaxed text-gray-400">
                        {job.shortDescription}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-800 p-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
                        <span>View Detail</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-800 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Let&apos;s connect and turn your vision into reality.
            </h2>
            <p className="mb-6 text-base text-gray-400 sm:text-lg">
              We are available from 9:00 AM to 6:00 PM, Monday to Friday.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+9779709098343"
                className="rounded-md bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
