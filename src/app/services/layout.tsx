import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | NebulaX',
  description:
    'Comprehensive digital solutions designed to elevate your business and drive growth. Website development, app development, SEO, SMM, and more.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
