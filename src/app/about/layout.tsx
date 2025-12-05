import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - NebulaX Research & Technologies Pvt. Ltd.',
  description:
    "Learn about NebulaX Research & Technologies Pvt. Ltd., Nepal's premier technology company. Discover our mission, vision, values, and journey of transforming digital visions into reality.",
  keywords: [
    'about',
    'company',
    'technology',
    'Nepal',
    'IT solutions',
    'digital transformation',
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
