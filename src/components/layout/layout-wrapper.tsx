'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './navbar';
import { Footer } from './footer';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Don't show navbar and footer on admin routes
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Show navbar and footer for public routes
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
      </div>
    </>
  );
}
