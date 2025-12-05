import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans | NebulaX',
  description:
    'Transparent pricing for comprehensive digital solutions. Choose the right plan for your business needs.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
