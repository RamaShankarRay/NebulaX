'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-black py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Centered */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          {/* Testimonials Label with lines */}
          <div className="mb-3 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-blue-400" />
            <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Testimonials
            </p>
            <div className="h-px w-12 bg-blue-400" />
          </div>

          {/* Main Title */}
          <h2 className="mb-3 text-2xl font-semibold sm:text-3xl lg:text-4xl">
            <span className="text-white">What Our </span>
            <span className="text-blue-400">Clients Say</span>
          </h2>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-sm text-gray-400 sm:text-base">
            Discover how we&apos;ve helped businesses transform their digital
            presence.
          </p>
        </div>

        {/* Testimonials Grid - Compact & Innovative */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="group relative"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/0 to-blue-600/0 transition-all duration-300 group-hover:from-blue-500/5 group-hover:to-blue-600/5" />

              <div className="relative flex h-full flex-col rounded-lg border border-gray-800/50 bg-gray-900/30 p-5 transition-all duration-200 group-hover:border-blue-500/40 group-hover:bg-gray-900/50 sm:p-6">
                {/* Top Section: Rating & Quote Mark */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  {/* Rating - Compact */}
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-blue-400/90 text-blue-400/90"
                      />
                    ))}
                  </div>
                  {/* Decorative Quote Mark */}
                  <div className="select-none font-serif text-3xl leading-none text-blue-400/15 sm:text-4xl">
                    &quot;
                  </div>
                </div>

                {/* Testimonial Text - Compact with better line height */}
                <p className="mb-5 line-clamp-4 flex-1 text-sm leading-relaxed text-gray-300">
                  {testimonial.text}
                </p>

                {/* Author Info - Ultra Compact */}
                <div className="flex items-center gap-3 border-t border-gray-800/30 pt-4">
                  {/* Compact Avatar */}
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/20">
                    <span className="text-xs font-semibold text-blue-400">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  {/* Name & Title - Compact */}
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-0.5 truncate text-sm font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="truncate text-xs text-gray-500">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
