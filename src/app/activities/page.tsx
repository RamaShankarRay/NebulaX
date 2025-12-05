'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Video, Music } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type MediaType = 'image' | 'video' | 'audio';

interface ActivityMedia {
  type: MediaType;
  url: string;
  thumbnail?: string;
}

interface Activity {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  thumbnail: string;
  media: ActivityMedia[];
}

const activities: Activity[] = [
  {
    id: '1',
    title: 'Birthday Celebration',
    date: '01 Jan 2024',
    category: 'Team Events',
    description: 'Celebrating birthdays together with cake, confetti, and joy!',
    thumbnail:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop&auto=format',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop&auto=format',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&h=800&fit=crop&auto=format',
      },
      {
        type: 'video',
        url: '/videos/birthday-celebration.mp4',
        thumbnail:
          'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop&auto=format',
      },
    ],
  },
  {
    id: '2',
    title: 'Friday Funday',
    date: '01 Jan 2023',
    category: 'Team Events',
    description: 'Fun games and activities to end the week on a high note!',
    thumbnail:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&auto=format',
      },
    ],
  },
  {
    id: '3',
    title: '7th Year Anniversary',
    date: '01 Jan 2025',
    category: 'Milestones',
    description: 'Celebrating 7 years of excellence and growth together!',
    thumbnail:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&auto=format',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&auto=format',
      },
      {
        type: 'video',
        url: '/videos/anniversary.mp4',
        thumbnail:
          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format',
      },
    ],
  },
  {
    id: '4',
    title: 'Team Outing',
    date: '01 Jan 2024',
    category: 'Team Events',
    description: 'Team building activities and outdoor fun!',
    thumbnail:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&auto=format',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop&auto=format',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format',
      },
    ],
  },
  {
    id: '5',
    title: 'Tech Conference',
    date: '01 Jan 2023',
    category: 'Learning',
    description: 'Attending industry conferences and tech meetups!',
    thumbnail:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop&auto=format',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=800&fit=crop&auto=format',
      },
      {
        type: 'video',
        url: '/videos/conference.mp4',
        thumbnail:
          'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop&auto=format',
      },
    ],
  },
  {
    id: '6',
    title: 'Cake Celebration',
    date: '01 Jan 2022',
    category: 'Celebrations',
    description: 'Sweet moments and celebrations!',
    thumbnail:
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop&auto=format',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&h=800&fit=crop&auto=format',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop&auto=format',
      },
    ],
  },
  {
    id: '7',
    title: 'Workshop Session',
    date: '15 Dec 2024',
    category: 'Learning',
    description: 'Knowledge sharing and skill development workshops!',
    thumbnail:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&auto=format',
      },
      {
        type: 'video',
        url: '/videos/workshop.mp4',
        thumbnail:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format',
      },
    ],
  },
  {
    id: '8',
    title: 'Sports Day',
    date: '20 Nov 2024',
    category: 'Recreation',
    description: 'Team sports and recreational activities!',
    thumbnail:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&auto=format',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&auto=format',
      },
    ],
  },
];

export default function ActivitiesPage() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const handleCardClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setSelectedMediaIndex(0);
  };

  const closeModal = () => {
    setSelectedActivity(null);
    setSelectedMediaIndex(0);
  };

  const nextMedia = () => {
    if (selectedActivity) {
      setSelectedMediaIndex(
        (prev) => (prev + 1) % selectedActivity.media.length
      );
    }
  };

  const prevMedia = () => {
    if (selectedActivity) {
      setSelectedMediaIndex(
        (prev) =>
          (prev - 1 + selectedActivity.media.length) %
          selectedActivity.media.length
      );
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!selectedActivity) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft' && selectedActivity.media.length > 1) {
        e.preventDefault();
        setSelectedMediaIndex(
          (prev) =>
            (prev - 1 + selectedActivity.media.length) %
            selectedActivity.media.length
        );
      } else if (e.key === 'ArrowRight' && selectedActivity.media.length > 1) {
        e.preventDefault();
        setSelectedMediaIndex(
          (prev) => (prev + 1) % selectedActivity.media.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedActivity]);

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-48">
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
                Life at NebulaX
              </span>
            </div>
            <h1 className="mb-6 text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Moments We
              <br />
              <span className="text-blue-400">Share Together</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
              A glimpse into the daily life, celebrations, and activities of the
              NebulaX team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="border-t border-gray-800 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {activities.map((activity, index) => {
              const hasVideo = activity.media.some((m) => m.type === 'video');
              const mediaCount = activity.media.length;

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => handleCardClick(activity)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900 transition-all duration-200 hover:opacity-90">
                    {/* Thumbnail Image */}
                    <Image
                      src={activity.thumbnail}
                      alt={activity.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />

                    {/* Minimal Overlay - Only on hover */}
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />

                    {/* Minimal Date - Top Left */}
                    <div className="absolute left-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="rounded bg-black/50 px-2 py-1 text-xs font-medium text-white">
                        {activity.date}
                      </span>
                    </div>

                    {/* Video Indicator - Minimal */}
                    {hasVideo && (
                      <div className="absolute right-2 top-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
                          <Video
                            className="h-4 w-4 text-white"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    )}

                    {/* Media Count - Minimal */}
                    {mediaCount > 1 && (
                      <div className="absolute bottom-2 right-2">
                        <span className="rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
                          {mediaCount}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title Below Card - Google Style */}
                  <div className="mt-2 px-1">
                    <h3 className="truncate text-sm font-medium text-white transition-colors group-hover:text-blue-400">
                      {activity.title}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {activity.date}
                    </p>
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
              Join Our Team
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-400 sm:text-lg">
              Be part of these amazing moments and create memories with us.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/#career"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-500"
              >
                View Careers
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-gray-700 px-8 py-3 font-medium text-white transition-colors hover:border-gray-600"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Modal - Google Standard Minimal */}
      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative flex h-full w-full flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Minimal Header */}
              <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-4 py-3">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium text-white">
                    {selectedActivity.title}
                  </h3>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  {selectedActivity.media.length > 1 && (
                    <span className="text-xs text-gray-400">
                      {selectedMediaIndex + 1}/{selectedActivity.media.length}
                    </span>
                  )}
                  <button
                    onClick={closeModal}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 transition-colors hover:bg-black/60"
                    aria-label="Close"
                  >
                    <span className="text-lg leading-none text-white">×</span>
                  </button>
                </div>
              </div>

              {/* Media Display - Full Screen */}
              <div className="relative flex min-h-0 flex-1 items-center justify-center">
                <motion.div
                  key={selectedMediaIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex h-full w-full items-center justify-center"
                >
                  {selectedActivity.media[selectedMediaIndex]?.type ===
                  'image' ? (
                    <Image
                      src={
                        selectedActivity.media[selectedMediaIndex]?.url || ''
                      }
                      alt={selectedActivity.title}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  ) : selectedActivity.media[selectedMediaIndex]?.type ===
                    'video' ? (
                    <video
                      src={
                        selectedActivity.media[selectedMediaIndex]?.url || ''
                      }
                      controls
                      autoPlay
                      className="h-full w-full object-contain"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Music className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </motion.div>

                {/* Minimal Navigation */}
                {selectedActivity.media.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevMedia();
                      }}
                      className="absolute left-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 transition-colors hover:bg-black/60 sm:left-4"
                      aria-label="Previous"
                    >
                      <span className="text-xl text-white">‹</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextMedia();
                      }}
                      className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 transition-colors hover:bg-black/60 sm:right-4"
                      aria-label="Next"
                    >
                      <span className="text-xl text-white">›</span>
                    </button>
                  </>
                )}
              </div>

              {/* Minimal Thumbnails */}
              {selectedActivity.media.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
                  <div className="scrollbar-thin flex items-center justify-center gap-1.5 overflow-x-auto">
                    {selectedActivity.media.map((media, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMediaIndex(index)}
                        className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded transition-all ${
                          selectedMediaIndex === index
                            ? 'ring-2 ring-blue-500'
                            : 'opacity-50 hover:opacity-100'
                        }`}
                      >
                        {media.type === 'image' ? (
                          <Image
                            src={media.url}
                            alt={`Media ${index + 1}`}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-800">
                            <Video className="h-4 w-4 text-blue-400" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
