'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  Send,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import { useQuickEnquiry } from '@/contexts/quick-enquiry-context';

const dropdownContent = {
  about: [
    {
      title: 'Introduction',
      description:
        'NebulaX Research & Technologies Pvt. Ltd. is a leading technology company specializing in comprehensive digital solutions.',
      href: '/about',
    },
    {
      title: 'How We Work',
      description:
        'Discover our proven methodology and workflow process for delivering exceptional results.',
      href: '/work',
    },
    {
      title: 'Our Team',
      description:
        'Meet our talented team of 80+ professionals dedicated to delivering excellence.',
      href: '/team',
    },
    {
      title: 'Our Activities',
      description:
        'Discover our vibrant culture, team events, and activities that make NebulaX a great place to work.',
      href: '/activities',
    },
  ],
  service: {
    categories: [
      {
        title: 'Development',
        description:
          'Creating digital experiences through coding, design, and user interaction principles.',
        services: [
          {
            title: 'Website Development',
            description:
              'Highly functional & visually appealing website designed to meet your need.',
            href: '/services/website-development',
          },
          {
            title: 'App Development In Nepal',
            description:
              'Innovative and user-friendly mobile application designed to engage users.',
            href: '/services/app-development',
          },
          {
            title: 'System/Software Development',
            description:
              'System/software developed according to your business needs.',
            href: '/services/system-software-development',
          },
          {
            title: 'UI/UX',
            description:
              'Design eye-catching UI/UX interfaces for effortless user interaction.',
            href: '/services/ui-ux',
          },
        ],
      },
      {
        title: 'Marketing',
        description:
          'Promotion of products or services via online channels and strategies.',
        services: [
          {
            title: 'Search Engine Optimization (SEO)',
            description:
              'Custom SEO solutions for enhanced search engine visibility and growth',
            href: '/services/search-engine-optimization-seo',
          },
          {
            title: 'Social Media Marketing (SMM)',
            description:
              'Build a strong online presence and engage with your targeted audience',
            href: '/services/social-media-marketing-smm',
          },
          {
            title: 'Graphic Design',
            description:
              "Designs that Speak Your Brand's Narrative and Connect with Your Audience",
            href: '/services/graphic-design',
          },
          {
            title: 'Content Writing',
            description:
              'Engaging and meaningful content to connect with your audience',
            href: '/services/content-writing',
          },
        ],
      },
    ],
  },
  pricing: [
    {
      title: 'SEO Package',
      description:
        'Typically offer a range of services including keyword research, on-page optimization, technical SEO, content optimization, link building, and performance tracking to improve search engine rankings.',
      href: '/pricing/seo-package',
    },
    {
      title: 'Social Media Package',
      description:
        "Typically offer a range of services tailored to clients' needs, including content creation, social media strategy, community management, paid advertising, analytics, and engagement optimization across multiple platforms.",
      href: '/pricing/social-media-package',
    },
    {
      title: 'Web Development Package',
      description:
        'Comprehensive website development services including custom design, responsive development, CMS integration, e-commerce solutions, and ongoing maintenance support.',
      href: '/pricing/web-development-package',
    },
    {
      title: 'App Development Package',
      description:
        'Complete mobile and web application development services including UI/UX design, cross-platform development, API integration, testing, deployment, and post-launch support.',
      href: '/pricing/app-development-package',
    },
  ],
};

const MobileNavContent = ({
  setMobileMenuOpen,
  isOpen,
}: {
  setMobileMenuOpen: (open: boolean) => void;
  isOpen: boolean;
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  // Reset expanded sections when menu closes
  useEffect(() => {
    if (!isOpen) {
      setExpandedSections(new Set());
    }
  }, [isOpen]);

  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  }, []);

  return (
    <div
      className="flex-1 overflow-y-auto overscroll-contain px-3 py-4"
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
      }}
    >
      <nav className="flex flex-col gap-1">
        {/* Home */}
        <Link
          href="/"
          className="block rounded-md px-4 py-3 text-base font-normal text-white transition-colors hover:bg-gray-800 hover:text-[#43b14b]"
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>

        {/* About - Expandable */}
        <div>
          <button
            onClick={() => toggleSection('about')}
            className="flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-normal text-white transition-colors hover:bg-gray-800 hover:text-[#43b14b]"
          >
            <span>About</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                expandedSections.has('about') ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSections.has('about') && (
            <div className="ml-4 mt-1 space-y-0.5 border-l border-gray-800/50 pl-4">
              {dropdownContent.about.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block rounded-md px-4 py-2.5 text-sm font-normal text-gray-300 transition-colors hover:bg-gray-800 hover:text-[#43b14b]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="mb-1 font-medium text-white">
                    {item.title}
                  </div>
                  <div className="line-clamp-2 text-xs text-gray-400">
                    {item.description}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Service - Expandable */}
        <div>
          <button
            onClick={() => toggleSection('service')}
            className="flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-normal text-white transition-colors hover:bg-gray-800 hover:text-[#43b14b]"
          >
            <span>Service</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                expandedSections.has('service') ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSections.has('service') && (
            <div className="ml-4 mt-1 space-y-3 border-l border-gray-800/50 pl-4">
              {dropdownContent.service.categories.map(
                (category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="mb-1 px-4 py-2">
                      <h3 className="mb-0.5 text-sm font-semibold text-white">
                        {category.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-gray-500">
                        {category.description}
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      {category.services.map((service, serviceIndex) => (
                        <Link
                          key={serviceIndex}
                          href={service.href}
                          className="block rounded-md px-4 py-2.5 text-sm font-normal text-gray-300 transition-colors hover:bg-gray-800 hover:text-[#43b14b]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="mb-1 font-medium text-white">
                            {service.title}
                          </div>
                          <div className="line-clamp-2 text-xs text-gray-400">
                            {service.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                    {categoryIndex <
                      dropdownContent.service.categories.length - 1 && (
                      <div className="mx-4 my-3 h-px bg-gray-800/50" />
                    )}
                  </div>
                )
              )}
              <div className="mt-2 border-t border-gray-800/50 pt-2">
                <Link
                  href="/services"
                  className="block flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-[#43b14b] transition-colors hover:text-[#4ade80]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  See All Services
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Pricing - Expandable */}
        <div>
          <button
            onClick={() => toggleSection('pricing')}
            className="flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-normal text-white transition-colors hover:bg-gray-800 hover:text-[#43b14b]"
          >
            <span>Pricing</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                expandedSections.has('pricing') ? 'rotate-180' : ''
              }`}
            />
          </button>
          {expandedSections.has('pricing') && (
            <div className="ml-4 mt-1 space-y-0.5 border-l border-gray-800/50 pl-4">
              {dropdownContent.pricing.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block rounded-md px-4 py-2.5 text-sm font-normal text-gray-300 transition-colors hover:bg-gray-800 hover:text-[#43b14b]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="mb-1 font-semibold text-white">
                    {item.title}
                  </div>
                  <div className="line-clamp-2 text-xs text-gray-400">
                    {item.description}
                  </div>
                </Link>
              ))}
              <div className="mt-2 border-t border-gray-800/50 pt-2">
                <Link
                  href="/pricing"
                  className="block flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-[#43b14b] transition-colors hover:text-[#4ade80]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  See All Pricing
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Our Work */}
        <Link
          href="/portfolio"
          className="block rounded-md px-4 py-3 text-base font-normal text-white transition-colors hover:bg-gray-800 hover:text-[#43b14b]"
          onClick={() => setMobileMenuOpen(false)}
        >
          Our Work
        </Link>

        {/* Career */}
        <Link
          href="/career"
          className="block rounded-md px-4 py-3 text-base font-normal text-white transition-colors hover:bg-gray-800 hover:text-[#43b14b]"
          onClick={() => setMobileMenuOpen(false)}
        >
          Career
        </Link>

        {/* Contact */}
        <Link
          href="/contact"
          className="block rounded-md px-4 py-3 text-base font-normal text-white transition-colors hover:bg-gray-800 hover:text-[#43b14b]"
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
};

const NavbarContent = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  openQuickEnquiry,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  openQuickEnquiry: () => void;
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const pricingDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideAbout = !aboutDropdownRef.current?.contains(target);
      const isOutsideService = !serviceDropdownRef.current?.contains(target);
      const isOutsidePricing = !pricingDropdownRef.current?.contains(target);

      if (isOutsideAbout && isOutsideService && isOutsidePricing) {
        setActiveDropdown(null);
      }
    };

    // Only add listener if a dropdown is open
    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [activeDropdown]);

  // Close dropdown when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      setActiveDropdown(null);
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="flex h-14 items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-normal text-gray-300 transition-colors hover:text-white"
          >
            Home
          </Link>

          {/* About Dropdown */}
          <div className="relative" ref={aboutDropdownRef}>
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === 'about' ? null : 'about')
              }
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-normal transition-all duration-200 ${
                activeDropdown === 'about'
                  ? 'bg-gray-800/40 text-[#43b14b]'
                  : 'text-gray-300 hover:bg-gray-800/40 hover:text-white'
              }`}
            >
              About
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === 'about' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === 'about' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute left-0 top-full z-[60] mt-2 flex max-h-[calc(100vh-120px)] w-[360px] min-w-[300px] max-w-[90vw] flex-col overflow-hidden rounded-lg border border-gray-800/50 bg-[#1b1b1b] shadow-xl backdrop-blur-sm"
                >
                  <div
                    className="overflow-y-auto overscroll-contain p-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {dropdownContent.about.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="group block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-gray-800"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="mb-1 text-sm font-medium text-white transition-colors group-hover:text-[#43b14b]">
                          {item.title}
                        </div>
                        <div className="line-clamp-2 text-xs leading-relaxed text-gray-400">
                          {item.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Service Dropdown */}
          <div className="relative" ref={serviceDropdownRef}>
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === 'service' ? null : 'service'
                )
              }
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-normal transition-all duration-200 ${
                activeDropdown === 'service'
                  ? 'bg-gray-800/40 text-[#43b14b]'
                  : 'text-gray-300 hover:bg-gray-800/40 hover:text-white'
              }`}
            >
              Service
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === 'service' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === 'service' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute left-0 top-full z-[60] mt-2 flex max-h-[calc(100vh-120px)] w-[400px] min-w-[320px] max-w-[90vw] flex-col overflow-hidden rounded-lg border border-gray-800/50 bg-[#1b1b1b] shadow-xl backdrop-blur-sm"
                >
                  <div
                    className="overflow-y-auto overscroll-contain p-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {dropdownContent.service.categories.map(
                      (category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-4 last:mb-0">
                          {/* Category Header */}
                          <div className="mb-1 px-3 py-2">
                            <h3 className="mb-0.5 text-sm font-semibold text-white">
                              {category.title}
                            </h3>
                            <p className="text-xs leading-relaxed text-gray-500">
                              {category.description}
                            </p>
                          </div>

                          {/* Category Services */}
                          <div className="space-y-0.5">
                            {category.services.map((service, serviceIndex) => (
                              <Link
                                key={serviceIndex}
                                href={service.href}
                                className="group ml-2 block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-gray-800"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="mb-1 text-sm font-medium text-white transition-colors group-hover:text-[#43b14b]">
                                  {service.title}
                                </div>
                                <div className="line-clamp-2 text-xs leading-relaxed text-gray-400">
                                  {service.description}
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Divider between categories */}
                          {categoryIndex <
                            dropdownContent.service.categories.length - 1 && (
                            <div className="mx-3 my-3 h-px bg-gray-800/50" />
                          )}
                        </div>
                      )
                    )}
                    {/* See All Services Link */}
                    <div className="mt-2 border-t border-gray-800/50 pt-2">
                      <Link
                        href="/services"
                        className="group ml-2 block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-gray-800"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium text-[#43b14b] transition-colors group-hover:text-[#4ade80]">
                          See All Services
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pricing Dropdown */}
          <div className="relative" ref={pricingDropdownRef}>
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === 'pricing' ? null : 'pricing'
                )
              }
              className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-normal transition-all duration-200 ${
                activeDropdown === 'pricing'
                  ? 'bg-gray-800/40 text-[#43b14b]'
                  : 'text-gray-300 hover:bg-gray-800/40 hover:text-white'
              }`}
            >
              Pricing
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeDropdown === 'pricing' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {activeDropdown === 'pricing' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute left-0 top-full z-[60] mt-2 flex max-h-[calc(100vh-120px)] w-[400px] min-w-[320px] max-w-[90vw] flex-col overflow-hidden rounded-lg border border-gray-800/50 bg-[#1b1b1b] shadow-xl backdrop-blur-sm"
                >
                  <div
                    className="overflow-y-auto overscroll-contain p-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {dropdownContent.pricing.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="group block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-gray-800"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="mb-1.5 text-sm font-semibold text-white transition-colors group-hover:text-[#43b14b]">
                          {item.title}
                        </div>
                        <div className="text-xs leading-relaxed text-gray-400">
                          {item.description}
                        </div>
                      </Link>
                    ))}
                    {/* See All Pricing Link */}
                    <div className="mt-2 border-t border-gray-800/50 px-3 pt-2">
                      <Link
                        href="/pricing"
                        className="group block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-gray-800"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium text-[#43b14b] transition-colors group-hover:text-[#4ade80]">
                          See All Pricing
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/portfolio"
            className="rounded-md px-3 py-2 text-sm font-normal text-gray-300 transition-colors hover:text-white"
          >
            Our Work
          </Link>
          <Link
            href="/career"
            className="rounded-md px-3 py-2 text-sm font-normal text-gray-300 transition-colors hover:text-white"
          >
            Career
          </Link>
          <Link
            href="/contact"
            className="rounded-md px-3 py-2 text-sm font-normal text-gray-300 transition-colors hover:text-white"
          >
            Contact
          </Link>
        </div>

        {/* Right Side: Contact & CTA + Mobile Menu */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Phone - Icon only on small, full text on desktop */}
          <a
            href="tel:+9779709098343"
            className="flex h-9 w-9 items-center justify-center gap-1.5 rounded-full border border-gray-800/50 bg-gray-800/30 text-[#43b14b] transition-all hover:border-[#43b14b]/50 hover:bg-gray-800/50 hover:text-[#4ade80] sm:h-10 sm:w-10 lg:h-10 lg:w-auto lg:gap-2 lg:rounded-md lg:border-0 lg:bg-transparent lg:px-3 lg:hover:bg-gray-800/30"
            title="+977 9709098343"
          >
            <PhoneCall className="h-4 w-4 flex-shrink-0 stroke-[1.5] sm:h-5 sm:w-5" />
            <span className="hidden text-sm font-bold lg:inline lg:text-base">
              +977 9709098343
            </span>
          </a>

          {/* Quick Enquiry - Icon only on small, full text on desktop */}
          <button
            onClick={openQuickEnquiry}
            className="flex h-9 w-9 items-center justify-center gap-1.5 rounded-full bg-[#43b14b] text-white shadow-sm transition-all hover:bg-[#3a9a41] hover:shadow-md sm:h-10 sm:w-10 lg:h-10 lg:w-auto lg:gap-2 lg:rounded-md lg:px-4"
            title="Quick Enquiry"
          >
            <Send className="h-4 w-4 flex-shrink-0 stroke-[1.5] sm:h-5 sm:w-5" />
            <span className="hidden text-sm font-medium lg:inline">
              Quick Enquiry
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="rounded-md p-2 transition-colors hover:bg-gray-800/50 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal: openQuickEnquiry } = useQuickEnquiry();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < lastScrollY.current && currentScrollY > 50) {
            setIsVisible(true);
          } else if (
            currentScrollY > lastScrollY.current ||
            currentScrollY <= 50
          ) {
            setIsVisible(currentScrollY <= 50);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Spacer to prevent layout shift */}
      <div className="h-14" aria-hidden="true" />
      <nav
        className="fixed left-0 right-0 top-0 z-50 w-full border-b border-gray-800/50 bg-[#1b1b1b]/95 backdrop-blur-sm transition-transform duration-200 ease-out"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          willChange: 'transform',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <NavbarContent
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            openQuickEnquiry={openQuickEnquiry}
          />
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-[#1b1b1b]/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="fixed right-0 top-0 z-[110] w-[280px] max-w-[85vw] border-l border-gray-800/50 bg-[#1b1b1b] shadow-xl lg:hidden"
              style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-gray-800/50 bg-[#1b1b1b] px-4">
                <Logo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md p-2 transition-colors hover:bg-gray-800/50"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Navigation Links - Scrollable */}
              <MobileNavContent
                setMobileMenuOpen={setMobileMenuOpen}
                isOpen={mobileMenuOpen}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
