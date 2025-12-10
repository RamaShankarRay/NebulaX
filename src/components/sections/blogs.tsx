'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { BLOGS } from '@/lib/constants';

// Blog thumbnail images - using high-quality tech/IT related images
const BLOG_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format',
] as const;

export function Blogs() {
  return (
    <section
      id="blogs"
      className="relative bg-[#1b1b1b] py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Centered */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          {/* Our Blogs Label with lines */}
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#43b14b]" />
            <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Our Blogs
            </p>
            <div className="h-px w-12 bg-[#43b14b]" />
          </div>

          {/* Main Title */}
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
            <span className="text-white">Our Latest & </span>
            <span className="text-[#43b14b]">Popular Blogs</span>
          </h2>

          {/* Description with See All on same line */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center rounded-lg border border-[#43b14b]/30 bg-[#43b14b]/5 px-4 py-2">
              <p className="text-sm text-gray-300 sm:text-base">
                Tailored solutions addressing diverse business challenges.
              </p>
            </div>
            <Link
              href="#blogs"
              className="group flex shrink-0 items-center gap-2 text-gray-400 transition-colors hover:text-[#43b14b]"
            >
              <span className="h-px w-8 bg-gray-700 transition-colors group-hover:bg-[#43b14b]" />
              <span className="h-2 w-2 rounded-full bg-[#43b14b]" />
              <span className="text-base font-medium sm:text-lg">See All</span>
            </Link>
          </div>
        </div>

        {/* Blogs Grid - Professional FAANG Style */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOGS.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <Link href="#" className="block h-full">
                <article className="flex h-full flex-col bg-transparent">
                  {/* Blog Thumbnail Image - Clean & Professional */}
                  <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg bg-gray-900">
                    <Image
                      src={
                        BLOG_IMAGES[index % BLOG_IMAGES.length] ||
                        BLOG_IMAGES[0]
                      }
                      alt={blog.title}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Content Section - Minimal & Clean */}
                  <div className="flex flex-1 flex-col">
                    {/* Date - Subtle */}
                    <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <time>{blog.date}</time>
                    </div>

                    {/* Title - Clean Typography */}
                    <h3 className="mb-3 line-clamp-2 text-lg font-medium leading-snug text-white sm:text-xl">
                      {blog.title}
                    </h3>

                    {/* Excerpt - Professional */}
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-400">
                      {blog.excerpt}
                    </p>

                    {/* Read More - Minimal Link */}
                    <div className="mt-auto text-sm font-medium text-[#43b14b]">
                      Read article →
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
