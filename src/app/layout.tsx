import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import { QuickEnquiryProvider } from '@/contexts/quick-enquiry-context';
import { QuickEnquiryModalWrapper } from '@/components/ui/quick-enquiry-modal-wrapper';
import { Toaster } from '@/components/ui/toaster';
import { LayoutWrapper } from '@/components/layout/layout-wrapper';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

import { generateMetadata as genMeta } from '@/lib/seo';

export const metadata: Metadata = genMeta({
  title: 'NebulaX - Transform Your Digital Vision',
  description:
    'NebulaX - The Best IT Company in Nepal. Transform your vision into digital reality with cutting-edge software solutions, web development, mobile apps, and digital marketing services.',
  keywords: [
    'software development',
    'web development',
    'mobile app development',
    'digital marketing',
    'SEO services',
    'IT company Nepal',
    'software solutions',
    'technology',
    'innovation',
    'digital transformation',
  ],
  image: '/nebulax.png',
  url: '/',
  type: 'website',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${roboto.className} overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <QuickEnquiryProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
              <Toaster />
              <QuickEnquiryModalWrapper />
            </QuickEnquiryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
