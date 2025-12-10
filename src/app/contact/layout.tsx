import { generateMetadata as genMeta } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = genMeta({
  title: 'Contact Us - Get In Touch',
  description:
    'Get in touch with NebulaX. We are here for you. Contact us for software development, web design, digital marketing, and IT consulting services.',
  keywords: [
    'contact',
    'get in touch',
    'IT company Nepal',
    'software services',
    'consultation',
  ],
  url: '/contact',
  type: 'website',
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
