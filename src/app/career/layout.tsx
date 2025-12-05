import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career Opportunities | NebulaX',
  description:
    'Join our dynamic team dedicated to innovation and excellence. Explore exciting career opportunities at NebulaX Research & Technologies.',
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
