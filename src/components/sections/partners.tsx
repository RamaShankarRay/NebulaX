'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

// Company logos from the internet - using well-known companies for demonstration
const PARTNERS = [
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
  },
  {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
] as const;

export function Partners() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      // Only scroll if not paused (hovered/interacting)
      if (!isPaused && !isHovered && scrollContainer) {
        scrollPosition += scrollSpeed;
        scrollContainer.scrollLeft = scrollPosition;

        // Reset scroll position when reaching the end for seamless loop
        const maxScroll =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isHovered]);

  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-[#1b1b1b] py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Centered */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          {/* Our Valued Partners Label with lines */}
          <div className="mb-3 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-[#43b14b]" />
            <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Our Valued Partners
            </p>
            <div className="h-px w-12 bg-[#43b14b]" />
          </div>

          {/* Main Title */}
          <h2 className="mb-3 text-2xl font-semibold sm:text-3xl lg:text-4xl">
            <span className="text-white">Trusted By </span>
            <span className="text-[#43b14b]">Top-Rated Companies</span>
          </h2>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-sm text-gray-400 sm:text-base">
            We&apos;re proud to partner with industry leaders who trust our
            expertise.
          </p>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="relative">
          {/* Fade Edges - Left */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-32" />

          {/* Fade Edges - Right */}
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-32" />

          {/* Scrollable Content */}
          <div
            ref={scrollRef}
            onMouseEnter={() => {
              setIsHovered(true);
              setIsPaused(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsPaused(false);
            }}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="scrollbar-hide flex gap-4 overflow-x-auto sm:gap-6"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Duplicate items for seamless infinite scroll */}
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: (index % PARTNERS.length) * 0.05,
                }}
                className="group flex-shrink-0"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="relative flex h-20 w-40 items-center justify-center overflow-hidden px-4 sm:h-24 sm:w-48 sm:px-6">
                  {/* Company Logo */}
                  <div className="relative flex h-full w-full items-center justify-center p-3">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="h-full w-full object-contain opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-[1.3] group-hover:contrast-[1.1]"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback =
                          target.parentElement?.querySelector('.logo-fallback');
                        if (fallback) {
                          (fallback as HTMLElement).style.display = 'flex';
                        }
                      }}
                    />
                    {/* Fallback text if image fails */}
                    <div className="logo-fallback absolute inset-0 hidden items-center justify-center">
                      <span className="truncate px-2 text-center text-xs font-medium text-gray-400 sm:text-sm">
                        {partner.name}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator (Optional) */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-1 w-1 animate-pulse rounded-full bg-[#43b14b]/50" />
          <p className="text-xs text-gray-500">Scroll to explore</p>
          <div className="h-1 w-1 animate-pulse rounded-full bg-[#43b14b]/50" />
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
