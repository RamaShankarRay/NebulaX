'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ArrowRight, Check, Star } from 'lucide-react';
import { useQuickEnquiry } from '@/contexts/quick-enquiry-context';
import { PricingDetail } from '@/lib/pricing-data';

interface PricingDetailClientProps {
  pricing: PricingDetail;
}

export default function PricingDetailClient({
  pricing,
}: PricingDetailClientProps) {
  const { openModal } = useQuickEnquiry();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleFaqToggle = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
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
            <h1 className="mb-6 text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {pricing.title}
            </h1>
            <p className="mb-4 text-lg leading-relaxed text-gray-400 sm:text-xl">
              {pricing.shortDescription}
            </p>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-500 sm:text-lg">
              {pricing.longDescription}
            </p>
            <div className="mt-8">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-md bg-[#43b14b] px-8 py-3 font-medium text-white transition-colors hover:bg-[#3a9a41]"
              >
                Let&apos;s start conversation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Subscription Plan
            </h2>
          </motion.div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pricing.tiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative flex flex-col overflow-hidden rounded-lg border ${
                  tier.badge
                    ? 'border-[#43b14b] bg-gray-900'
                    : 'border-gray-800 bg-gray-900/50'
                }`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute right-4 top-4">
                    <div className="flex items-center gap-1 rounded-md bg-[#43b14b] px-2 py-1 text-xs font-medium text-white">
                      <Star className="h-3 w-3 fill-current" />
                      <span>{tier.badge}</span>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="border-b border-gray-800 p-6">
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {tier.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-2xl font-semibold text-[#43b14b] sm:text-3xl">
                      {tier.price}
                    </span>
                    {tier.priceNote && (
                      <span className="ml-1 text-sm text-gray-400">
                        {tier.priceNote}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{tier.preferredFor}</p>
                </div>

                {/* Features */}
                <div className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent max-h-[600px] flex-1 overflow-y-auto p-6">
                  <ul className="space-y-2">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#43b14b]" />
                        <span className="text-sm leading-relaxed text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                    {tier.hasProjectManager && (
                      <li className="mt-2 flex items-start gap-2 border-t border-gray-800 pt-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#43b14b]" />
                        <span className="text-sm font-medium text-white">
                          Dedicated Project Manager
                        </span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA */}
                <div className="border-t border-gray-800 p-6">
                  {tier.ctaLink ? (
                    <Link
                      href={tier.ctaLink}
                      className="block w-full rounded-md bg-[#43b14b] px-4 py-3 text-center font-medium text-white transition-colors hover:bg-[#3a9a41]"
                    >
                      {tier.ctaText}
                    </Link>
                  ) : (
                    <button className="w-full rounded-md bg-gray-800 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-700">
                      {tier.ctaText}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Notes */}
          {(pricing.note || pricing.contractTerms) && (
            <div className="mt-8 space-y-2 text-center">
              {pricing.note && (
                <p className="text-sm text-gray-500">{pricing.note}</p>
              )}
              {pricing.contractTerms && (
                <p className="text-sm text-gray-500">{pricing.contractTerms}</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Custom Package Form Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl"
          >
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                {pricing.customPackageForm.title}
              </h2>
              <p className="text-sm text-gray-400 sm:text-base">
                {pricing.customPackageForm.description}
              </p>
            </div>

            <div className="rounded-lg border border-gray-800/50 bg-gray-900/30 p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {pricing.customPackageForm.fields.map((field, index) => (
                  <div key={index}>
                    <label className="mb-2 block text-xs font-medium text-gray-400">
                      {field.label.split('*')[0]}
                      {field.required && (
                        <span className="text-[#43b14b]"> *</span>
                      )}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        className="w-full rounded-md border border-gray-800/50 bg-gray-900/30 px-4 py-2.5 text-sm text-white transition-colors focus:border-[#43b14b] focus:outline-none"
                        style={{
                          backgroundColor: 'rgba(17, 24, 39, 0.3)',
                        }}
                      >
                        <option
                          value=""
                          style={{ backgroundColor: '#1b1b1b', color: 'white' }}
                        >
                          {field.placeholder}
                        </option>
                        {field.options?.map((option, optIndex) => (
                          <option
                            key={optIndex}
                            value={option}
                            style={{
                              backgroundColor: '#1b1b1b',
                              color: 'white',
                            }}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.name] || ''}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        className="w-full rounded-md border border-gray-800/50 bg-gray-900/30 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#43b14b] focus:outline-none"
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#43b14b] px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#3a9a41] sm:w-auto"
                >
                  Submit
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              FAQs
            </h2>
            <p className="text-sm text-gray-400 sm:text-base">
              Frequently Asked Questions
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl space-y-4">
            {pricing.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-lg border border-gray-800/50 bg-gray-900/30"
              >
                <button
                  onClick={() => handleFaqToggle(index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors"
                >
                  <span className="pr-4 text-base font-medium text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-sm leading-relaxed text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20">
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
                className="rounded-md bg-[#43b14b] px-8 py-3 font-medium text-white transition-colors hover:bg-[#3a9a41]"
              >
                Reach out now! +977 9709098343
              </a>
              <button
                onClick={openModal}
                className="rounded-md border border-gray-700 px-8 py-3 font-medium text-white transition-colors hover:border-gray-600"
              >
                Let&apos;s start conversation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
