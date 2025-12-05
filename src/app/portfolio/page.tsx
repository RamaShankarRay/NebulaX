'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useQuickEnquiry } from '@/contexts/quick-enquiry-context';
import {
  PORTFOLIO_CATEGORIES,
  WEBSITE_SUB_CATEGORIES,
  GRAPHICS_SUB_CATEGORIES,
  getFilteredPortfolio,
  type PortfolioCategory,
  type WebsiteSubCategory,
  type GraphicsSubCategory,
} from '@/lib/portfolio-data';

export default function PortfolioPage() {
  const { openModal } = useQuickEnquiry();
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory>('all');
  const [selectedWebsiteSubCategory, setSelectedWebsiteSubCategory] =
    useState<WebsiteSubCategory>('all');
  const [selectedGraphicsSubCategory, setSelectedGraphicsSubCategory] =
    useState<GraphicsSubCategory>('all');
  const filteredItems = getFilteredPortfolio(
    selectedCategory,
    selectedWebsiteSubCategory,
    selectedGraphicsSubCategory
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header & Filter Section - Compact */}
      <section className="border-b border-gray-800 pb-6 pt-20 sm:pb-8 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:gap-5">
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
                  className={`rounded-md px-3 py-1.5 text-xs font-normal transition-all duration-200 sm:text-sm ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-700 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Website Sub-Categories */}
            {selectedCategory === 'website-development' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-2"
              >
                {WEBSITE_SUB_CATEGORIES.map((subCategory) => (
                  <button
                    key={subCategory.id}
                    onClick={() =>
                      setSelectedWebsiteSubCategory(subCategory.id)
                    }
                    className={`rounded-md px-3 py-1.5 text-xs font-normal transition-all duration-200 sm:text-sm ${
                      selectedWebsiteSubCategory === subCategory.id
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-700 hover:text-white'
                    }`}
                  >
                    {subCategory.label}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Graphics Sub-Categories */}
            {selectedCategory === 'graphics-design' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-2"
              >
                {GRAPHICS_SUB_CATEGORIES.map((subCategory) => (
                  <button
                    key={subCategory.id}
                    onClick={() =>
                      setSelectedGraphicsSubCategory(subCategory.id)
                    }
                    className={`rounded-md px-3 py-1.5 text-xs font-normal transition-all duration-200 sm:text-sm ${
                      selectedGraphicsSubCategory === subCategory.id
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-700 hover:text-white'
                    }`}
                  >
                    {subCategory.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-8 sm:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${selectedWebsiteSubCategory}-${selectedGraphicsSubCategory}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="group"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition-colors duration-200 hover:border-gray-700">
                      {/* Media Content - Always Show Media First */}
                      {item.media?.type === 'image' ? (
                        <Image
                          src={item.media.url}
                          alt={item.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : item.media?.type === 'video' ? (
                        <video
                          src={item.media.url}
                          poster={item.media.thumbnail}
                          className="h-full w-full object-cover"
                          muted
                          loop
                          playsInline
                          autoPlay
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                          <div className="text-center">
                            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20">
                              <span className="text-xl font-semibold text-blue-400">
                                {item.title.charAt(0)}
                              </span>
                            </div>
                            <h3 className="px-2 text-sm font-medium text-white">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      )}

                      {/* Minimal Title Overlay - Only on Hover */}
                      <div className="pointer-events-none absolute inset-0 flex items-end bg-black/0 transition-colors duration-200 group-hover:bg-black/40">
                        <div className="w-full translate-y-full transform p-3 transition-transform duration-200 group-hover:translate-y-0">
                          <h3 className="truncate text-sm font-medium text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 text-center"
              >
                <p className="text-gray-400">
                  No projects found in this category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-800 py-16 sm:py-20 lg:py-24">
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
                className="rounded-md bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Reach out now! +977 9709098343
              </a>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 rounded-md border border-gray-700 px-8 py-3 font-medium text-white transition-colors hover:border-gray-600"
              >
                Let&apos;s start conversation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
