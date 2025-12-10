import { generateMetadata as genMeta } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = genMeta({
  title: 'Our Services - Digital Solutions',
  description:
    'Comprehensive digital solutions including web development, mobile app development, SEO services, graphic design, and more. Transform your business with NebulaX.',
  keywords: [
    'web development',
    'mobile app development',
    'SEO services',
    'graphic design',
    'digital marketing',
    'software development',
  ],
  url: '/services',
  type: 'website',
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
