'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const teamMembers = [
  {
    name: 'Rajesh Kumar',
    role: 'Chief Executive Officer',
    department: 'Leadership',
    bio: 'Visionary leader with 15+ years of experience in technology and business strategy. Passionate about driving innovation and building world-class teams.',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format',
    email: 'rajesh@nebulax.com',
    linkedin: '#',
  },
  {
    name: 'Priya Sharma',
    role: 'Chief Technology Officer',
    department: 'Technology',
    bio: 'Tech enthusiast and architect with expertise in cloud computing, microservices, and scalable system design. Leads our technical innovation initiatives.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&auto=format',
    email: 'priya@nebulax.com',
    linkedin: '#',
  },
  {
    name: 'Amit Patel',
    role: 'Head of Development',
    department: 'Engineering',
    bio: 'Full-stack developer and team lead specializing in modern web technologies. Ensures code quality and best practices across all projects.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&auto=format',
    email: 'amit@nebulax.com',
    linkedin: '#',
  },
  {
    name: 'Sneha Thapa',
    role: 'Head of Design',
    department: 'Design',
    bio: 'Creative director with a passion for user-centered design. Transforms complex ideas into intuitive and beautiful user experiences.',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=800&fit=crop&auto=format',
    email: 'sneha@nebulax.com',
    linkedin: '#',
  },
  {
    name: 'Kiran Maharjan',
    role: 'Head of Marketing',
    department: 'Marketing',
    bio: 'Digital marketing strategist with expertise in SEO, content marketing, and growth hacking. Drives brand awareness and customer acquisition.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop&auto=format',
    email: 'kiran@nebulax.com',
    linkedin: '#',
  },
  {
    name: 'Suman Gurung',
    role: 'Head of Operations',
    department: 'Operations',
    bio: 'Operations expert focused on process optimization and team efficiency. Ensures smooth project delivery and client satisfaction.',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&auto=format',
    email: 'suman@nebulax.com',
    linkedin: '#',
  },
];

const departments = [
  { name: 'Leadership', count: 2 },
  { name: 'Engineering', count: 25 },
  { name: 'Design', count: 12 },
  { name: 'Marketing', count: 15 },
  { name: 'Operations', count: 10 },
  { name: 'Quality Assurance', count: 8 },
  { name: 'Support', count: 8 },
];

const stats = [
  { number: '80+', label: 'Team Members' },
  { number: '7+', label: 'Years Experience' },
  { number: '500+', label: 'Projects Delivered' },
  { number: '50+', label: 'Happy Clients' },
];

export default function TeamPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCard(activeCard === index ? null : index);
  };

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveCard(null);
      }
    };

    if (activeCard !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeCard]);

  return (
    <main className="min-h-screen bg-[#1b1b1b]">
      {/* Hero Section */}
      <section className="relative pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-48">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#43b14b]/30 bg-[#43b14b]/5 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-[#43b14b]" />
              <span className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Our Team
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Meet The People
              <br />
              <span className="text-[#43b14b]">Behind NebulaX</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              A diverse team of talented professionals dedicated to delivering
              exceptional results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="border-t border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Our Leadership Team
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-gray-400 sm:text-base">
              Experienced leaders guiding NebulaX towards innovation and
              excellence.
            </p>
          </motion.div>

          <div
            ref={containerRef}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className="relative cursor-pointer touch-manipulation overflow-hidden rounded-lg bg-gray-900"
                  onClick={(e) => handleCardClick(index, e)}
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />

                    {/* Overlay - Shows on hover (desktop) or tap (mobile) */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${
                        activeCard === index
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />

                    {/* Content - Bottom */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 sm:p-5 ${
                        activeCard === index
                          ? 'translate-y-0'
                          : 'translate-y-full group-hover:translate-y-0'
                      }`}
                    >
                      <div className="mb-3">
                        <p className="mb-2 text-xs uppercase tracking-wider text-gray-400">
                          {member.department}
                        </p>
                        <p className="line-clamp-3 text-sm leading-relaxed text-gray-300">
                          {member.bio}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 border-t border-gray-700 pt-3">
                        <a
                          href={`mailto:${member.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-gray-700 active:bg-gray-600"
                          aria-label="Email"
                        >
                          <Mail className="h-4 w-4 text-gray-400 transition-colors hover:text-[#43b14b]" />
                        </a>
                        <a
                          href={member.linkedin}
                          onClick={(e) => e.stopPropagation()}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-gray-700 active:bg-gray-600"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4 text-gray-400 transition-colors hover:text-[#43b14b]" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Always Visible Info */}
                  <div className="p-4 text-center">
                    <h3
                      className={`mb-1 text-lg font-medium transition-colors ${
                        activeCard === index
                          ? 'text-[#43b14b]'
                          : 'text-white group-hover:text-[#43b14b]'
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-400">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="border-t border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center sm:mb-12"
          >
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Our Team Structure
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-gray-400 sm:text-base">
              Organized teams working together to deliver exceptional results.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="text-center"
              >
                <div className="mb-1.5 text-3xl font-bold text-[#43b14b] sm:text-4xl">
                  {dept.count}
                </div>
                <h3 className="text-sm font-medium text-white sm:text-base">
                  {dept.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-gray-800 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-1.5 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                  {stat.number}
                </div>
                <div className="text-xs font-normal text-gray-400 sm:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Join Our Team
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-base">
              We&apos;re always looking for talented individuals to join our
              growing team.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/#career"
                className="inline-flex items-center justify-center rounded-lg bg-[#43b14b] px-8 py-3 font-medium text-white transition-colors hover:bg-[#3a9a41]"
              >
                View Careers
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-gray-700 px-8 py-3 font-medium text-white transition-colors hover:border-gray-600"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
