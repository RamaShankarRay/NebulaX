'use client';

import { Clock, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  {
    icon: Clock,
    number: '7+',
    label: 'Years of Experience In This Field',
  },
  {
    icon: Users,
    number: '80+',
    label: 'Skilled Team Members',
  },
  {
    icon: CheckCircle,
    number: '500+',
    label: 'Projects Completed In The Past Years',
  },
];

export function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      className="relative bg-[#1b1b1b] py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Centered */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          {/* Who We Are Label with lines */}
          <div className="mb-3 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#43b14b]" />
            <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Who We Are
            </p>
            <div className="h-px w-12 bg-[#43b14b]" />
          </div>

          {/* Main Title */}
          <h2 className="mb-3 text-2xl font-semibold sm:text-3xl lg:text-4xl">
            <span className="text-white">Nepal&apos;s Leading </span>
            <span className="text-[#43b14b]">IT Solutions Provider</span>
          </h2>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-sm text-gray-400 sm:text-base">
            Committed to providing comprehensive digital solutions to enhance
            your online presence.
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left Side - Stats - Compact & Innovative */}
          <div className="space-y-4 sm:space-y-5">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-[#43b14b]/0 to-[#3a9a41]/0 transition-all duration-300 group-hover:from-[#43b14b]/5 group-hover:to-[#3a9a41]/5" />

                  <div className="relative flex items-center gap-4 rounded-lg border border-gray-800/50 bg-gray-900/30 p-4 transition-all duration-200 group-hover:border-[#43b14b]/40 group-hover:bg-gray-900/50 sm:p-5">
                    {/* Icon - Compact */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-[#43b14b]/20 bg-[#43b14b]/10">
                      <Icon className="h-5 w-5 text-[#43b14b]" />
                    </div>

                    {/* Content - Compact */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 text-2xl font-bold text-white sm:text-3xl">
                        {stat.number}
                      </div>
                      <p className="text-xs leading-relaxed text-gray-400 sm:text-sm">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side - Content Card - Compact & Innovative */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="group relative"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-[#43b14b]/0 to-[#3a9a41]/0 transition-all duration-300 group-hover:from-[#43b14b]/5 group-hover:to-[#3a9a41]/5" />

            <div className="relative rounded-lg border border-gray-800/50 bg-gray-900/30 p-6 transition-all duration-200 group-hover:border-[#43b14b]/40 group-hover:bg-gray-900/50 sm:p-8">
              <div className="space-y-5 sm:space-y-6">
                {/* Our Commitment */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                    Our Commitment
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                    With over 7 years of experience, we have established
                    ourselves as a trusted partner for businesses seeking
                    innovative digital solutions. Our team of 80+ skilled
                    professionals is dedicated to delivering excellence in every
                    project.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-800/50" />

                {/* Our Mission */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-white sm:text-xl">
                    Our Mission
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                    To empower businesses across Nepal and beyond with
                    cutting-edge technology solutions that drive growth,
                    innovation, and success in the digital landscape.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
