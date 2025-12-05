'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, Lightbulb, Globe, Heart } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We continuously push boundaries and embrace cutting-edge technologies to deliver solutions that exceed expectations.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description:
      'We are committed to delivering the highest quality work, ensuring every project meets and exceeds industry standards.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description:
      'We build trust through transparency, honesty, and ethical practices in every interaction and project we undertake.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'We believe in the power of teamwork, working closely with clients and partners to achieve shared success.',
  },
  {
    icon: Globe,
    title: 'Global Vision',
    description:
      'We think globally while acting locally, bringing world-class solutions to businesses in Nepal and beyond.',
  },
  {
    icon: Award,
    title: 'Commitment',
    description:
      'We are dedicated to long-term partnerships, providing ongoing support and continuous improvement for our clients.',
  },
];

const milestones = [
  {
    year: '2017',
    title: 'Company Founded',
    description:
      'NebulaX Research & Technologies Pvt. Ltd. was established with a vision to transform digital landscapes.',
  },
  {
    year: '2019',
    title: 'Team Expansion',
    description:
      'Grew to 50+ skilled professionals, expanding our capabilities across multiple domains.',
  },
  {
    year: '2021',
    title: '500+ Projects',
    description:
      'Reached a milestone of completing over 500 successful projects for clients worldwide.',
  },
  {
    year: '2024',
    title: 'Industry Recognition',
    description:
      "Recognized as one of Nepal's leading IT solutions providers with 80+ team members.",
  },
];

export default function AboutPage() {
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
                About Us
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Transforming Digital
              <br />
              <span className="text-blue-400">Visions Into Reality</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              NebulaX Research & Technologies Pvt. Ltd. is Nepal&apos;s premier
              technology company, dedicated to delivering innovative digital
              solutions that drive business growth and success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="border-t border-gray-800 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="mb-6 text-3xl font-semibold text-white sm:text-4xl">
                Who We Are
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-300 sm:text-lg">
                <p>
                  <strong className="text-white">
                    NebulaX Research & Technologies Pvt. Ltd.
                  </strong>{' '}
                  is a leading technology company based in Nepal, specializing
                  in comprehensive digital solutions for businesses of all
                  sizes. Since our establishment, we have been at the forefront
                  of technological innovation, helping organizations transform
                  their digital presence and achieve their business objectives.
                </p>
                <p>
                  Our team of 80+ skilled professionals brings together
                  expertise in web development, mobile applications, cloud
                  solutions, digital marketing, and cutting-edge technologies.
                  We combine technical excellence with creative innovation to
                  deliver solutions that not only meet but exceed client
                  expectations.
                </p>
                <p>
                  With over 7 years of experience and 500+ successful projects,
                  we have built a reputation for reliability, quality, and
                  customer-centric approach. Our commitment to excellence and
                  continuous learning drives us to stay ahead of industry trends
                  and adopt the latest technologies.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
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
                Our Values
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">
              What Drives Us
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">
              Our core values guide everything we do, from project execution to
              client relationships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full rounded-lg border border-gray-800 bg-gray-900/30 p-6 transition-all duration-200 hover:border-blue-500/50 hover:bg-gray-900/50 sm:p-8">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-600/10 transition-colors group-hover:border-blue-500/40 group-hover:bg-blue-600/20">
                        <Icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                        {value.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Journey */}
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
                Our Journey
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-semibold text-white sm:text-4xl">
              Milestones & Achievements
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">
              A timeline of our growth and significant achievements over the
              years.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute bottom-0 left-8 top-0 hidden w-px bg-gray-800 md:block" />

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative flex items-start gap-6 md:gap-8"
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-500/30 bg-blue-600/10 transition-colors group-hover:border-blue-500/50 group-hover:bg-blue-600/20">
                        <div className="h-3 w-3 rounded-full bg-blue-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <div className="mb-2 text-sm font-medium text-blue-400">
                        {milestone.year}
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-white">
                        {milestone.title}
                      </h3>
                      <p className="text-base leading-relaxed text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-t border-gray-800 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <div className="h-full rounded-lg border border-gray-800 bg-gray-900/30 p-8 transition-all duration-200 hover:border-blue-500/50 hover:bg-gray-900/50">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-600/10">
                      <Target className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                      Our Mission
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-gray-300">
                    To empower businesses across Nepal and beyond with
                    cutting-edge technology solutions that drive growth,
                    innovation, and success in the digital landscape. We strive
                    to be the trusted partner that transforms complex challenges
                    into elegant digital solutions.
                  </p>
                </div>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group"
              >
                <div className="h-full rounded-lg border border-gray-800 bg-gray-900/30 p-8 transition-all duration-200 hover:border-blue-500/50 hover:bg-gray-900/50">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-600/10">
                      <Lightbulb className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                      Our Vision
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-gray-300">
                    To become the leading technology solutions provider in South
                    Asia, recognized for innovation, excellence, and
                    transformative impact. We envision a future where every
                    business, regardless of size, has access to world-class
                    digital solutions that unlock their full potential.
                  </p>
                </div>
              </motion.div>
            </div>
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
              Ready to Transform Your Business?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-400 sm:text-lg">
              Let&apos;s work together to bring your digital vision to life. Get
              in touch with us today.
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
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
