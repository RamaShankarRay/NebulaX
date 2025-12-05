import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Activities - NebulaX Research & Technologies Pvt. Ltd.',
  description:
    'Discover the vibrant culture and activities at NebulaX. From team events to learning opportunities, see how we celebrate together and create joyful moments.',
  keywords: [
    'company culture',
    'team activities',
    'workplace culture',
    'employee engagement',
    'Nepal IT company',
    'team events',
  ],
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
