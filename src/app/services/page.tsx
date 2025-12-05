'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative border-b border-gray-800 pb-16 pt-24 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-blue-400" />
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <span className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Our Services
              </span>
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <div className="h-px w-12 bg-blue-400" />
            </div>
            <h1 className="mb-6 text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              One Solution For All Your
              <br />
              <span className="text-blue-400">Digital Needs</span>
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
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
                >
                  <Link
                    href={`/services/${finalSlug}`}
                    className="group block h-full"
                  >
                    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 transition-all duration-200 hover:border-gray-700 hover:bg-gray-900">
                      {/* Image Container */}
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

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-400">
                          {service.title}
                        </h3>
                        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-400">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
                          <span>Learn More</span>
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
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
                className="rounded-md bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
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
  );
}
