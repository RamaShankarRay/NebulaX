'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useQuickEnquiry } from '@/contexts/quick-enquiry-context';
import { getPublishedPortfolio } from '@/lib/services/content.service';
import type { AdminPortfolioItem } from '@/lib/admin/portfolio-admin';
import type {
  PortfolioCategory,
  WebsiteSubCategory,
  GraphicsSubCategory,
} from '@/lib/admin/portfolio-admin';

const PORTFOLIO_CATEGORIES = [
  { id: 'all' as const, label: 'All' },
  { id: 'website-development' as const, label: 'Website Development' },
  { id: 'mobile-application' as const, label: 'Mobile Application' },
  { id: 'graphics-design' as const, label: 'Graphics Design' },
] as const;

const WEBSITE_SUB_CATEGORIES = [
  { id: 'all' as const, label: 'All' },
  { id: 'travel-website' as const, label: 'Travel Website' },
  { id: 'e-commerce' as const, label: 'E-Commerce' },
  { id: 'educational-website' as const, label: 'Educational Website' },
  { id: 'informative-website' as const, label: 'Informative Website' },
  { id: 'news-agency' as const, label: 'News Agency' },
] as const;

const GRAPHICS_SUB_CATEGORIES = [
  { id: 'all' as const, label: 'All' },
  { id: 'flyer-brochure' as const, label: 'Flyer/Brochure' },
  { id: 'social-media-design' as const, label: 'Social Media Design' },
  { id: 'logo-design' as const, label: 'Logo Design' },
  { id: 'gifs-motion' as const, label: 'Gifs and Motion' },
] as const;

export default function PortfolioPage() {
  const { openModal } = useQuickEnquiry();
  const [portfolioItems, setPortfolioItems] = useState<AdminPortfolioItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    PortfolioCategory | 'all'
  >('all');
  const [selectedWebsiteSubCategory, setSelectedWebsiteSubCategory] = useState<
    WebsiteSubCategory | 'all'
  >('all');
  const [selectedGraphicsSubCategory, setSelectedGraphicsSubCategory] =
    useState<GraphicsSubCategory | 'all'>('all');

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);
        const items = await getPublishedPortfolio();
        setPortfolioItems(items as AdminPortfolioItem[]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load portfolio'
        );
      } finally {
        setLoading(false);
      }
    };
    void loadPortfolio();
  }, []);

  // Memoized filtered items for performance
  const filteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (
        selectedCategory === 'website-development' &&
        selectedWebsiteSubCategory !== 'all' &&
        item.websiteSubCategory !== selectedWebsiteSubCategory
      ) {
        return false;
      }
      if (
        selectedCategory === 'graphics-design' &&
        selectedGraphicsSubCategory !== 'all' &&
        item.graphicsSubCategory !== selectedGraphicsSubCategory
      ) {
        return false;
      }
      return true;
    });
  }, [
    portfolioItems,
    selectedCategory,
    selectedWebsiteSubCategory,
    selectedGraphicsSubCategory,
  ]);

  return (
    <div className="min-h-screen bg-[#1b1b1b]">
      {/* Header & Filter Section - Compact */}
      <section className="pb-4 pt-12 sm:pb-5 sm:pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Compact Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="mb-1 text-xl font-normal text-white sm:text-2xl">
                  Our Portfolio
                </h1>
                <p className="text-sm text-gray-400">Some of our Recent Work</p>
              </div>
            </div>

            {/* Main Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {PORTFOLIO_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    if (category.id !== 'graphics-design') {
                      setSelectedGraphicsSubCategory('all');
                    }
                    if (category.id !== 'website-development') {
                      setSelectedWebsiteSubCategory('all');
                    }
                  }}
                  className={`rounded-md px-3 py-1.5 text-xs font-normal sm:text-sm ${
                    selectedCategory === category.id
                      ? 'bg-[#43b14b] text-white'
                      : 'border border-gray-800/50 bg-gray-900/30 text-gray-300 hover:border-gray-700 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Website Sub-Categories */}
            {selectedCategory === 'website-development' && (
              <div className="flex flex-wrap items-center gap-2">
                {WEBSITE_SUB_CATEGORIES.map((subCategory) => (
                  <button
                    key={subCategory.id}
                    onClick={() =>
                      setSelectedWebsiteSubCategory(subCategory.id)
                    }
                    className={`rounded-md px-3 py-1.5 text-xs font-normal sm:text-sm ${
                      selectedWebsiteSubCategory === subCategory.id
                        ? 'bg-[#43b14b] text-white'
                        : 'border border-gray-800/50 bg-gray-900/30 text-gray-300 hover:border-gray-700 hover:text-white'
                    }`}
                  >
                    {subCategory.label}
                  </button>
                ))}
              </div>
            )}

            {/* Graphics Sub-Categories */}
            {selectedCategory === 'graphics-design' && (
              <div className="flex flex-wrap items-center gap-2">
                {GRAPHICS_SUB_CATEGORIES.map((subCategory) => (
                  <button
                    key={subCategory.id}
                    onClick={() =>
                      setSelectedGraphicsSubCategory(subCategory.id)
                    }
                    className={`rounded-md px-3 py-1.5 text-xs font-normal sm:text-sm ${
                      selectedGraphicsSubCategory === subCategory.id
                        ? 'bg-[#43b14b] text-white'
                        : 'border border-gray-800/50 bg-gray-900/30 text-gray-300 hover:border-gray-700 hover:text-white'
                    }`}
                  >
                    {subCategory.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 md:gap-8 lg:grid-cols-3 lg:gap-8 xl:grid-cols-3 xl:gap-8 2xl:grid-cols-4 2xl:gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-full animate-pulse overflow-hidden rounded-md border border-gray-800/50 bg-gray-900/30"
                >
                  <div className="aspect-square bg-gray-800 p-3 sm:p-3.5 md:p-4">
                    <div className="h-full w-full rounded-sm bg-gray-700"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <p className="mb-4 text-red-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-md bg-[#43b14b] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#3a9a41]"
              >
                Retry
              </button>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 md:gap-8 lg:grid-cols-3 lg:gap-8 xl:grid-cols-3 xl:gap-8 2xl:grid-cols-4 2xl:gap-8">
              {filteredItems.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-400">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Let&apos;s connect and turn your vision into reality.
            </h2>
            <p className="mb-6 text-base text-gray-400 sm:text-lg">
              We are available from 9:00 AM to 6:00 PM, Monday to Friday.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+9779709098343"
                className="rounded-md bg-[#43b14b] px-8 py-3 font-medium text-white hover:bg-[#3a9a41]"
              >
                Reach out now! +977 9709098343
              </a>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-md border border-gray-700 px-8 py-3 font-medium text-white hover:border-gray-600"
              >
                Let&apos;s start conversation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Portfolio Card Component - Exact Reference Design
function PortfolioCard({ item }: { item: AdminPortfolioItem }) {
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaItems = Array.isArray(item.media)
    ? item.media
    : item.media
      ? [item.media]
      : [];
  const thumbnail = mediaItems.find((m) => m.type === 'image') || mediaItems[0];

  useEffect(() => {
    // Auto-play video when it loads
    if (videoRef.current && thumbnail?.type === 'video') {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay may be blocked by browser - that's okay
        });
      }
    }
  }, [thumbnail]);

  // Also try to play when video element becomes available
  useEffect(() => {
    if (videoRef.current && thumbnail?.type === 'video') {
      const video = videoRef.current;
      const handleCanPlay = () => {
        video.play().catch(() => {});
      };
      video.addEventListener('canplay', handleCanPlay);
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [thumbnail]);

  return (
    <div className="group relative w-full overflow-hidden rounded-md border border-gray-800/50 bg-gray-900/30 transition-all duration-200">
      {/* Media Section with Internal Padding - Smart Aspect Ratio Handling */}
      <div className="relative aspect-square w-full bg-gray-900/30 p-3 sm:p-3.5 md:p-4">
        {/* Inner Media Container - Handles any aspect ratio */}
        <div className="relative h-full w-full overflow-hidden rounded-sm bg-gray-900/30">
          {thumbnail && !imageError ? (
            thumbnail.type === 'image' ? (
              <Image
                src={thumbnail.url}
                alt={item.title}
                fill
                className="object-contain"
                unoptimized
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <video
                ref={videoRef}
                src={thumbnail.url}
                className="absolute inset-0 h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(() => {});
                  }
                }}
                onError={() => setImageError(true)}
              />
            )
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/30">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#43b14b]/20">
                  <span className="text-2xl font-semibold text-[#43b14b]">
                    {item.title.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Title and Link - Only on Hover - Horizontal Layout */}
        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="pointer-events-auto flex w-full items-end justify-between gap-3 p-3 sm:p-4">
            <h3 className="line-clamp-2 min-w-0 flex-1 text-sm font-medium text-white">
              {item.title}
            </h3>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-md bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
