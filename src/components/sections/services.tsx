'use client';

import { SERVICES } from '@/lib/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function Services() {
  return (
    <section
      id="services"
      className="relative bg-black py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Centered */}
        <div className="mb-10 text-center sm:mb-12 lg:mb-16">
          {/* Our Services Label with lines */}
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-blue-400" />
            <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Our Services
            </p>
            <div className="h-px w-12 bg-blue-400" />
          </div>

          {/* Main Title */}
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl lg:text-4xl">
            <span className="text-white">Exceptional Services For Your </span>
            <span className="text-blue-400">Business Growth</span>
          </h2>

          {/* Description with See All on same line */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="text-base text-gray-400 sm:text-lg">
              Discover our wide range of digital solutions to enhance your
              online presence.
            </p>
            <Link
              href="/services"
              className="group flex shrink-0 items-center gap-2 text-gray-400 transition-colors hover:text-blue-400"
            >
              <span className="h-px w-8 bg-gray-700 transition-colors group-hover:bg-blue-400" />
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <span className="text-base font-medium sm:text-lg">See All</span>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 transition-all duration-200 hover:border-gray-700 hover:bg-gray-900">
                    {/* Image Container - Fixed Height */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-800">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback =
                            target.parentElement?.querySelector(
                              '.icon-fallback'
                            );
                          if (fallback) {
                            (fallback as HTMLElement).style.display = 'flex';
                          }
                        }}
                      />
                      {/* Icon Fallback */}
                      <div className="icon-fallback absolute inset-0 hidden items-center justify-center bg-blue-600/10">
                        <Icon className="h-12 w-12 text-blue-400" />
                      </div>
                    </div>

                    {/* Content - Fixed Padding */}
                    <div className="flex flex-1 flex-col p-6">
                      <h4 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-400">
                        {service.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-400">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
