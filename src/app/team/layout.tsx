import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team - NebulaX Research & Technologies Pvt. Ltd.',
  description:
    'Meet the talented team behind NebulaX. Our 80+ skilled professionals are dedicated to delivering exceptional digital solutions and driving innovation.',
  keywords: [
    'team',
    'employees',
    'professionals',
    'Nepal IT',
    'technology team',
    'software developers',
  ],
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
