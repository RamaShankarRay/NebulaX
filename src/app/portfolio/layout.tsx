import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Portfolio | NebulaX',
  description:
    'Explore our diverse portfolio showcasing innovative digital solutions across web development, mobile applications, and creative design.',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
