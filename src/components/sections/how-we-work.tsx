'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Requirement Gathering',
    description:
      'We start our collaboration by collecting client requirements, listing and compiling them. This helps us build the process from scratch to deliver results aligned with your goals.',
  },
  {
    number: '02',
    title: 'Plan & Resources',
    description:
      'After gathering requirements, we devise a strategic path and select resources. As the best IT company in Nepal, we offer clients a roadmap, laying the groundwork for a successful project.',
  },
  {
    number: '03',
    title: 'Design & Develop',
    description:
      'In the design and development phase, we turn strategic ideas into digital products that are visually appealing, technically robust, focusing on user experience and functionality.',
  },
  {
    number: '04',
    title: 'Quality Assurance',
    description:
      'In this phase, we rigorously test and validate to ensure all elements work correctly and meet standards, delivering the desired user experience. Our team tests each aspect for reliability.',
  },
  {
    number: '05',
    title: 'Deployment',
    description:
      'Once the product meets standards, we deploy it, releasing product or updates on servers. This ensures our products are delivered seamlessly and efficiently.',
  },
  {
    number: '06',
    title: 'Support & Maintenance',
    description:
      'In the final stage, we maintain systems to ensure smooth operation, security, and reliability. Optimization keeps performance high and client satisfaction focused on operational excellence.',
  },
];

export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="relative bg-[#1b1b1b] py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Centered */}
        <div className="mb-10 text-center sm:mb-12 lg:mb-16">
          {/* How We Work Label with lines */}
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#43b14b]" />
            <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
              How We Work
            </p>
            <div className="h-px w-12 bg-[#43b14b]" />
          </div>

          {/* Main Title */}
          <h2 className="mb-6 text-2xl font-semibold sm:text-3xl lg:text-4xl">
            <span className="text-white">Enjoy Seamless Service With </span>
            <span className="text-[#43b14b]">Our Easy Steps!</span>
          </h2>

          {/* Workflow Description with See All on same line */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center rounded-lg border border-[#43b14b]/30 bg-[#43b14b]/5 px-4 py-2">
              <p className="text-sm text-gray-300 sm:text-base">
                Efficient workflow from requirements gathering to support and
                maintenance
              </p>
            </div>
            <Link
              href="#how-we-work"
              className="group flex shrink-0 items-center gap-2 text-gray-400 transition-colors hover:text-[#43b14b]"
            >
              <span className="h-px w-8 bg-gray-700 transition-colors group-hover:bg-[#43b14b]" />
              <span className="h-2 w-2 rounded-full bg-[#43b14b]" />
              <span className="text-base font-medium sm:text-lg">See All</span>
            </Link>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-6 sm:space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6 lg:gap-8"
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="text-5xl font-bold leading-none text-gray-800 sm:text-6xl lg:text-7xl">
                  {step.number}
                </div>
              </div>

              {/* Step Content */}
              <div className="min-w-0 flex-1">
                <h3 className="mb-3 text-xl font-semibold text-white sm:text-2xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
