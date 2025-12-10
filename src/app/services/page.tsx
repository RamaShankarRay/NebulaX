'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import { StructuredData } from '@/components/seo/structured-data';

export default function ServicesPage() {
  return (
    <>
      <StructuredData
        config={{
          title: 'Our Services - Digital Solutions',
          description:
            'Comprehensive digital solutions including web development, mobile app development, SEO services, graphic design, and more.',
          url: '/services',
          type: 'website',
        }}
      />
      <div className="min-h-screen bg-[#1b1b1b]">
      {/* Hero Section */}
      <section className="relative pb-16 pt-24 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-[#43b14b]" />
              <span className="h-2 w-2 rounded-full bg-[#43b14b]" />
              <span className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Our Services
              </span>
              <span className="h-2 w-2 rounded-full bg-[#43b14b]" />
              <div className="h-px w-12 bg-[#43b14b]" />
            </div>
            <h1 className="mb-6 text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              One Solution For All Your
              <br />
              <span className="text-[#43b14b]">Digital Needs</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              Comprehensive digital solutions designed to elevate your business
              and drive growth in the modern marketplace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              // Use the slug from the service object, fallback to website-development if not available
              const finalSlug = service.slug || 'website-development';

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
                    href={`/services/${finalSlug}`}
                    className="group block h-full"
                  >
                    <article className="flex h-full flex-col bg-transparent">
                      {/* Image Container - Aspect Ratio Match Blogs */}
                      <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-lg bg-gray-900">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-opacity duration-200 group-hover:opacity-90"
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
                        <div className="icon-fallback absolute inset-0 hidden items-center justify-center bg-[#43b14b]/10">
                          <Icon className="h-12 w-12 text-[#43b14b]" />
                        </div>
                      </div>

                      {/* Content Section - Minimal & Clean */}
                      <div className="flex flex-1 flex-col">
                        {/* Title - Clean Typography */}
                        <h4 className="mb-3 line-clamp-2 text-lg font-medium leading-snug text-white sm:text-xl">
                          {service.title}
                        </h4>

                        {/* Description - Professional */}
                        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-400">
                          {service.description}
                        </p>

                        {/* Learn More - Minimal Link */}
                        <div className="mt-auto text-sm font-medium text-[#43b14b]">
                          Learn more →
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-3xl font-normal text-white sm:text-4xl lg:text-5xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mb-8 text-base text-gray-400 sm:text-lg">
              Let&apos;s discuss how our services can help you achieve your
              goals.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="rounded-md bg-[#43b14b] px-8 py-3 font-medium text-white transition-colors hover:bg-[#3a9a41]"
              >
                Get Started
              </Link>
              <a
                href="tel:+9779709098343"
                className="rounded-md border border-gray-700 px-8 py-3 font-medium text-white transition-colors hover:border-gray-600"
              >
                Call Us: +977 9709098343
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
