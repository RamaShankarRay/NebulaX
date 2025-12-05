'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ArrowRight, Check } from 'lucide-react';
import { useQuickEnquiry } from '@/contexts/quick-enquiry-context';
import { ServiceDetail } from '@/lib/services-data';
import { SERVICES } from '@/lib/constants';

interface ServiceDetailClientProps {
  service: ServiceDetail;
}

export default function ServiceDetailClient({
  service,
}: ServiceDetailClientProps) {
  const { openModal } = useQuickEnquiry();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleFaqToggle = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
            <h1 className="mb-6 text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {service.title}
            </h1>
            <p className="mb-4 text-lg leading-relaxed text-gray-400 sm:text-xl">
              {service.shortDescription}
            </p>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-500 sm:text-lg">
              {service.longDescription}
            </p>
            <div className="mt-8">
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Let&apos;s start conversation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mb-2 text-3xl font-semibold text-blue-400 sm:text-4xl lg:text-5xl">
                {service.stats.years}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 sm:text-sm">
                Years of Experience
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="mb-2 text-3xl font-semibold text-blue-400 sm:text-4xl lg:text-5xl">
                {service.stats.clients}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 sm:text-sm">
                Happy Clients
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="mb-2 text-3xl font-semibold text-blue-400 sm:text-4xl lg:text-5xl">
                {service.stats.projects}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 sm:text-sm">
                Successful Projects
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="mb-2 text-3xl font-semibold text-blue-400 sm:text-4xl lg:text-5xl">
                {service.stats.team}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 sm:text-sm">
                Team Member & Growing
              </div>
            </motion.div>
            {service.stats.guarantee && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-center"
              >
                <div className="mb-2 text-lg font-semibold text-blue-400 sm:text-xl">
                  {service.stats.guarantee}
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-400 sm:text-sm">
                  Quality Assurance
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-gray-800 bg-gray-900">
                    <Check className="h-8 w-8 text-blue-400" />
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="border-b border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Industries we Serve
            </h2>
            <p className="text-sm text-gray-400 sm:text-base">
              Proud to deliver excellence every time
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
            {service.industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-colors hover:border-gray-700"
              >
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {industry.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="border-b border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Technology Stack
            </h2>
            <p className="text-sm text-gray-400 sm:text-base">
              Technology we Work with in {service.title}
            </p>
          </motion.div>

          <div className="mx-auto max-w-6xl space-y-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Frontend
              </h3>
              <div className="flex flex-wrap gap-3">
                {service.techStack.frontend.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-md border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Backend</h3>
              <div className="flex flex-wrap gap-3">
                {service.techStack.backend.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-md border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Infrastructure
              </h3>
              <div className="flex flex-wrap gap-3">
                {service.techStack.infrastructure.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-md border border-gray-800 bg-gray-900 px-4 py-2 text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process/Roadmap Section */}
      <section className="border-b border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Roadmap
            </h2>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <div className="space-y-8">
              {service.process.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="border-b border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Why choose us
            </h2>
            <p className="text-sm text-gray-400 sm:text-base">
              We help you expand your business through tech
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-gray-500">
              We have a team of highly skilled professionals who can provide you
              with exceptional services. As a leading company in Nepal, we offer
              exceptional and responsive solutions. Some of our additional perks
              are as follows:
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
            {service.whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-colors hover:border-gray-700"
              >
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="border-b border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Our Portfolio
            </h2>
            <p className="text-sm text-gray-400 sm:text-base">
              Some of our Recent {service.title}
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
            {service.portfolio.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative aspect-square overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition-colors hover:border-gray-700"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <span className="px-2 text-center text-sm text-gray-400">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Questions */}
      <section className="border-b border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              {service.ctaTitle}
            </h2>
            <p className="mb-8 text-base text-gray-400 sm:text-lg">
              {service.ctaDescription}
            </p>

            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {service.ctaQuestions.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 text-center"
                >
                  <div className="mb-2 text-2xl">{index + 1}</div>
                  <p className="text-xs text-gray-400 sm:text-sm">
                    {item.question}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 sm:p-8">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Check Your Website Quality for Free
              </h3>
              <form className="mx-auto max-w-md space-y-4">
                <div>
                  <input
                    type="url"
                    placeholder="type Website URL*"
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="your Email*"
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Submit Now
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="border-b border-gray-800 py-12 sm:py-16 lg:py-20">
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
            <p className="mt-2 text-xs text-gray-500">
              Welcome to our FAQ section! Here you&apos;ll find quick answers to
              the most common questions about our products and services.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl space-y-4">
            {service.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50"
              >
                <button
                  onClick={() => handleFaqToggle(index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-800/50"
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
                  <div className="border-t border-gray-800 px-6 py-4">
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

      {/* Other Services Section */}
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
              other services
            </h2>
            <p className="text-sm text-gray-400 sm:text-base">
              One Solution For All Your Digital needs
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {SERVICES.filter((s) => s.title !== service.title)
              .slice(0, 7)
              .map((otherService, index) => {
                // For now, all services link to website-development until we add more service data
                const slug = 'website-development';

                return (
                  <Link
                    key={index}
                    href={`/services/${slug}`}
                    className="group rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition-colors hover:border-gray-700 hover:bg-gray-900"
                  >
                    <h3 className="mb-2 text-base font-semibold text-white transition-colors group-hover:text-blue-400">
                      {otherService.title}
                    </h3>
                    <p className="line-clamp-2 text-xs text-gray-400">
                      {otherService.description}
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
