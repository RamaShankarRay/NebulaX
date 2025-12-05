'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRICING_DETAILS } from '@/lib/pricing-data';

export default function PricingPage() {
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
                Our Pricing
              </span>
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <div className="h-px w-12 bg-blue-400" />
            </div>
            <h1 className="mb-6 text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Choose The Right Plan
              <br />
              <span className="text-blue-400">For Your Business</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              Transparent pricing for comprehensive digital solutions. Select a
              package that aligns with your business goals and budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Packages Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PRICING_DETAILS.map((pricing, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={`/pricing/${pricing.slug}`}
                  className="group block h-full"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 transition-all duration-200 hover:border-gray-700 hover:bg-gray-900">
                    {/* Header */}
                    <div className="border-b border-gray-800 p-6">
                      <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                        {pricing.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-gray-400">
                        {pricing.shortDescription}
                      </p>
                    </div>

                    {/* Preview of Tiers */}
                    <div className="flex-1 p-6">
                      <div className="space-y-3">
                        {pricing.tiers.slice(0, 2).map((tier, tierIndex) => (
                          <div
                            key={tierIndex}
                            className="border-b border-gray-800 pb-3 last:border-0"
                          >
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-sm font-medium text-white">
                                {tier.name}
                              </span>
                              <span className="text-sm text-blue-400">
                                {tier.price}
                                {tier.priceNote && (
                                  <span className="text-xs text-gray-400">
                                    {tier.priceNote}
                                  </span>
                                )}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">
                              {tier.preferredFor}
                            </p>
                          </div>
                        ))}
                        {pricing.tiers.length > 2 && (
                          <p className="pt-2 text-xs text-gray-500">
                            +{pricing.tiers.length - 2} more plans
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-800 p-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
                        <span>View Details</span>
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
            <h2 className="mb-4 text-3xl font-normal text-white sm:text-4xl lg:text-5xl">
              Need a Custom Solution?
            </h2>
            <p className="mb-8 text-base text-gray-400 sm:text-lg">
              Let&apos;s discuss how we can create a tailored package for your
              specific needs.
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
