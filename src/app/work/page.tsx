'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Users,
  Code,
  Rocket,
  Shield,
  Headphones,
} from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Requirement Gathering',
    icon: Users,
    description:
      'We start our collaboration by collecting client requirements, listing and compiling them. This helps us build the process from scratch to deliver results aligned with your goals.',
    details: [
      'Initial consultation and discovery session',
      'Stakeholder interviews and needs analysis',
      'Documentation of functional and non-functional requirements',
      'Project scope definition and timeline estimation',
    ],
  },
  {
    number: '02',
    title: 'Plan & Resources',
    icon: Rocket,
    description:
      'After gathering requirements, we devise a strategic path and select resources. As the best IT company in Nepal, we offer clients a roadmap, laying the groundwork for a successful project.',
    details: [
      'Strategic planning and roadmap development',
      'Resource allocation and team assignment',
      'Technology stack selection',
      'Project timeline and milestone planning',
    ],
  },
  {
    number: '03',
    title: 'Design & Develop',
    icon: Code,
    description:
      'In the design and development phase, we turn strategic ideas into digital products that are visually appealing, technically robust, focusing on user experience and functionality.',
    details: [
      'UI/UX design and prototyping',
      'Agile development methodology',
      'Code reviews and quality checks',
      'Regular progress updates and demos',
    ],
  },
  {
    number: '04',
    title: 'Quality Assurance',
    icon: Shield,
    description:
      'In this phase, we rigorously test and validate to ensure all elements work correctly and meet standards, delivering the desired user experience. Our team tests each aspect for reliability.',
    details: [
      'Comprehensive testing (unit, integration, e2e)',
      'Performance and security testing',
      'Cross-browser and device compatibility',
      'Bug fixing and optimization',
    ],
  },
  {
    number: '05',
    title: 'Deployment',
    icon: Rocket,
    description:
      'Once the product meets standards, we deploy it, releasing product or updates on servers. This ensures our products are delivered seamlessly and efficiently.',
    details: [
      'Production environment setup',
      'CI/CD pipeline configuration',
      'Zero-downtime deployment',
      'Post-deployment monitoring',
    ],
  },
  {
    number: '06',
    title: 'Support & Maintenance',
    icon: Headphones,
    description:
      'In the final stage, we maintain systems to ensure smooth operation, security, and reliability. Optimization keeps performance high and client satisfaction focused on operational excellence.',
    details: [
      '24/7 monitoring and support',
      'Regular updates and security patches',
      'Performance optimization',
      'Ongoing maintenance and improvements',
    ],
  },
];

const benefits = [
  {
    icon: CheckCircle2,
    title: 'Agile Methodology',
    description:
      'We follow agile practices for flexibility and faster delivery cycles.',
  },
  {
    icon: CheckCircle2,
    title: 'Transparent Communication',
    description:
      'Regular updates and open communication throughout the project lifecycle.',
  },
  {
    icon: CheckCircle2,
    title: 'Quality First',
    description:
      'Rigorous testing and quality assurance at every stage of development.',
  },
  {
    icon: CheckCircle2,
    title: 'Client-Centric Approach',
    description:
      'Your success is our priority, with dedicated support and collaboration.',
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pb-36 lg:pt-48">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <span className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Our Process
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              How We Work
              <br />
              <span className="text-blue-400">To Deliver Excellence</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              Our proven methodology ensures seamless collaboration, transparent
              communication, and exceptional results for every project we
              undertake.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="border-t border-gray-800 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="space-y-12 sm:space-y-16">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
                      {/* Step Number & Icon */}
                      <div className="flex flex-shrink-0 items-center gap-4">
                        <div className="relative">
                          <div className="text-6xl font-bold leading-none text-gray-800 sm:text-7xl lg:text-8xl">
                            {step.number}
                          </div>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-600/10 transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-600/20">
                              <Icon className="h-6 w-6 text-blue-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-4 text-2xl font-semibold text-white transition-colors group-hover:text-blue-400 sm:text-3xl">
                          {step.title}
                        </h3>
                        <p className="mb-6 text-base leading-relaxed text-gray-300 sm:text-lg">
                          {step.description}
                        </p>

                        {/* Details List */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {step.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />
                              <span className="text-sm leading-relaxed text-gray-400">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    {index < steps.length - 1 && (
                      <div className="mt-12 h-px bg-gray-800" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-t border-gray-800 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center sm:mb-16"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <span className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Why Choose Us
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">
              Our Approach to Success
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">
              What sets our workflow apart and ensures exceptional results.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full rounded-lg border border-gray-800 bg-gray-900/30 p-6 transition-all duration-200 hover:border-blue-500/50 hover:bg-gray-900/50">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-600/10 transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-600/20">
                        <Icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-400">
                          {benefit.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-400">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
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
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-400 sm:text-lg">
              Let&apos;s discuss how our proven process can help bring your
              vision to life.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-500"
              >
                Get Started
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center rounded-lg border-2 border-gray-700 px-8 py-3 font-medium text-white transition-colors hover:border-gray-600"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
