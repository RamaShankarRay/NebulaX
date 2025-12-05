import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import { QuickEnquiryProvider } from '@/contexts/quick-enquiry-context';
import { QuickEnquiryModalWrapper } from '@/components/ui/quick-enquiry-modal-wrapper';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NebulaX - Transform Your Digital Vision',
  description:
    'NebulaX - The Best IT Company in Nepal. Transform your vision into digital reality with cutting-edge software solutions.',
  keywords: ['software', 'technology', 'innovation', 'development'],
  authors: [{ name: 'NebulaX' }],
  creator: 'NebulaX',
  publisher: 'NebulaX',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: 'NebulaX - Transform Your Digital Vision',
    description:
      'NebulaX - The Best IT Company in Nepal. Transform your vision into digital reality with cutting-edge software solutions.',
    siteName: 'NebulaX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NebulaX - Transform Your Digital Vision',
    description:
      'NebulaX - The Best IT Company in Nepal. Transform your vision into digital reality with cutting-edge software solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

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
              <Navbar />
              <div className="flex min-h-screen flex-col overflow-x-hidden">
                <main className="flex-1 overflow-x-hidden">{children}</main>
                <Footer />
              </div>
              <Toaster />
              <QuickEnquiryModalWrapper />
            </QuickEnquiryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
