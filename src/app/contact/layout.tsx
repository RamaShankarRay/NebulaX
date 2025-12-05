import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | NebulaX',
  description:
    'Get in touch with NebulaX Research & Technologies. We are here to help you with sales, career opportunities, and support.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
