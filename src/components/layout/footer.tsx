'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Our Work', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Web Development', href: '#web-dev' },
    { name: 'App Development', href: '#app-dev' },
    { name: 'UI/UX Design', href: '#ui-ux' },
    { name: 'Digital Marketing', href: '#marketing' },
  ],
  resources: [
    { name: 'Blog', href: '#blogs' },
    { name: 'Careers', href: '/career' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gray-800 bg-[#1b1b1b]">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-5">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Logo className="mb-4" />
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              Nepal&apos;s leading IT solutions provider, committed to
              delivering innovative digital solutions that drive business growth
              and success.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#43b14b]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#43b14b]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#43b14b]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              © {currentYear} NebulaX. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
