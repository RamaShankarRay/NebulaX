import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How We Work - NebulaX Research & Technologies Pvt. Ltd.',
  description:
    'Discover our proven methodology and workflow process. Learn how NebulaX delivers exceptional results through our 6-step approach from requirement gathering to support and maintenance.',
  keywords: [
    'work process',
    'methodology',
    'workflow',
    'project management',
    'development process',
    'Nepal IT',
  ],
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
