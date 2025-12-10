import { generateMetadata as genMeta } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = genMeta({
  title: 'Career Opportunities - Join Our Team',
  description:
    'Join NebulaX and be part of a dynamic team dedicated to innovation and excellence. Explore exciting career opportunities in development, design, management, and marketing.',
  keywords: [
    'career',
    'jobs',
    'employment',
    'software developer jobs',
    'IT jobs Nepal',
    'tech careers',
  ],
  url: '/career',
  type: 'website',
});

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
