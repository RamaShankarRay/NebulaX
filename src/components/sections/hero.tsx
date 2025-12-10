'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      try {
        video.playbackRate = 0.5; // Slow down to 50% speed for smooth, cinematic feel
      } catch (error) {
        // Silently handle playback rate errors
      }
    };

    const handleCanPlay = () => {
      try {
        video.playbackRate = 0.5;
      } catch (error) {
        // Silently handle playback rate errors
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);

    // Set initial playback rate if video is already loaded
    if (video.readyState >= 2) {
      try {
        video.playbackRate = 0.5;
      } catch (error) {
        // Silently handle playback rate errors
      }
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <section className="relative flex h-screen flex-col justify-center overflow-hidden bg-[#1b1b1b]">
      {/* Video Background */}
      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ willChange: 'auto' }}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl font-normal leading-[1.2] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Elevate Your
                <br />
                <span className="text-[#43b14b]">Digital Presence</span>
                <br />
                Today
              </h1>
            </div>

            {/* Description */}
            <p className="mx-auto max-w-3xl text-base font-normal leading-[1.6] text-gray-400 sm:text-lg md:text-xl">
              Partner with Nepal&apos;s premier technology team. We turn complex
              challenges into elegant digital solutions that drive real business
              results.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-lg bg-[#43b14b] px-8 py-6 text-base font-medium text-white transition-colors hover:bg-[#3a9a41] sm:text-lg"
              >
                <Link href="#contact" className="flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-lg border-2 border-gray-700 bg-transparent px-8 py-6 text-base font-medium text-white transition-colors hover:border-gray-600 hover:text-gray-300 sm:text-lg"
              >
                <Link href="#services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
