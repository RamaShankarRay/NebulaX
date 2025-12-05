'use client';

import { useState } from 'react';
import { TECHNOLOGIES, TECHNOLOGY_TABS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Technology logo URLs from CDN
const TECH_LOGOS: Record<string, string> = {
  JavaScript:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'Node.js':
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  Python:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  Django:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  HTML5:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  CSS3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'Next.js':
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  React:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  PHP: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  Laravel:
    'https://raw.githubusercontent.com/laravel/art/master/logo-2x/logo.png',
  Figma:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  WordPress:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
  Flutter:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  'React Native':
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  Swift:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
  Kotlin:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  Dart: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
  MongoDB:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  PostgreSQL:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  MySQL:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  Redis:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  Firebase:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  AWS: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  'Google Cloud':
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'Microsoft Azure':
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  Docker:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  Kubernetes:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
};

export function Expertise() {
  const [activeTab, setActiveTab] = useState<keyof typeof TECHNOLOGIES>('web');

  return (
    <section
      id="expertise"
      className="relative bg-black py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Side - Header, Categories and Technology Grid */}
          <div className="space-y-6">
            {/* Header Section - Left Aligned */}
            <div>
              {/* Our Expertise Label with lines */}
              <div className="mb-4 flex items-center gap-4">
                <div className="h-px w-12 bg-blue-400" />
                <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
                  Our Expertise
                </p>
                <div className="h-px w-12 bg-blue-400" />
              </div>

              {/* Main Title */}
              <h2 className="mb-6 text-2xl font-semibold sm:text-3xl lg:text-4xl">
                <span className="text-white">Technologies We Rely On To </span>
                <span className="text-blue-400">Achieve Success</span>
              </h2>
            </div>

            {/* Categories - Horizontal scrollable without visible scrollbar */}
            <div className="relative">
              <div
                className="scrollbar-hide flex items-center gap-0 overflow-x-auto pb-2"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {TECHNOLOGY_TABS.map((tab, index) => (
                  <div key={tab.id} className="flex flex-shrink-0 items-center">
                    <button
                      onClick={() =>
                        setActiveTab(tab.id as keyof typeof TECHNOLOGIES)
                      }
                      className={`flex h-10 items-center whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-blue-400'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                    {index < TECHNOLOGY_TABS.length - 1 && (
                      <div className="mx-2 h-4 w-px flex-shrink-0 bg-gray-700" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Logos Grid - Responsive with proper breakpoints */}
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6"
                >
                  {TECHNOLOGIES[activeTab].map((tech, index) => {
                    const logoUrl = TECH_LOGOS[tech];
                    return (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className="group"
                      >
                        <div className="flex h-16 flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 p-2 transition-all duration-200 hover:border-blue-500/50 hover:bg-gray-900 sm:h-20 sm:p-3 md:h-24">
                          {logoUrl ? (
                            <div className="relative mb-1 h-10 w-full flex-shrink-0 sm:mb-2 sm:h-12">
                              <Image
                                src={logoUrl}
                                alt={tech}
                                fill
                                className="object-contain"
                                unoptimized
                                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const fallback =
                                    target.parentElement?.querySelector(
                                      '.tech-fallback'
                                    );
                                  if (fallback) {
                                    (fallback as HTMLElement).style.display =
                                      'block';
                                  }
                                }}
                              />
                              <span className="tech-fallback hidden text-center text-[10px] font-medium text-gray-300 transition-colors group-hover:text-white sm:text-xs">
                                {tech}
                              </span>
                            </div>
                          ) : (
                            <span className="px-1 text-center text-[10px] font-medium leading-tight text-gray-300 transition-colors group-hover:text-white sm:text-xs">
                              {tech}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative hidden items-center justify-center lg:flex">
            <div className="relative w-full max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] w-full"
              >
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&auto=format"
                  alt="Developer working with technologies"
                  width={800}
                  height={600}
                  className="h-full w-full object-contain"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      'https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer-illustration.png';
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
