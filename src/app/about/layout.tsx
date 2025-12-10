import { generateMetadata as genMeta } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = genMeta({
  title: 'About Us - Who We Are',
  description:
    'Learn about NebulaX Research & Technologies - a leading IT company in Nepal providing innovative software solutions, web development, and digital services.',
  keywords: [
    'about',
    'company',
    'IT company Nepal',
    'software company',
    'technology',
  ],
  url: '/about',
  type: 'website',
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
