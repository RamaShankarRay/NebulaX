'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Menu } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load collapsed state from localStorage to match sidebar
  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed');
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
    // Listen for storage changes (when sidebar toggles)
    const handleStorageChange = () => {
      const saved = localStorage.getItem('admin-sidebar-collapsed');
      if (saved !== null) {
        setIsCollapsed(JSON.parse(saved));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Also listen to custom event for same-tab updates
    window.addEventListener('sidebar-toggle', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sidebar-toggle', handleStorageChange);
    };
  }, []);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const mainMargin = isCollapsed ? 'lg:ml-16' : 'lg:ml-64';

  return (
    <div className="flex min-h-screen bg-[#1b1b1b]">
      <AdminSidebar />
      <main
        className={`flex-1 ${mainMargin} w-full transition-all duration-300 lg:w-auto`}
      >
        {/* Mobile Header with Menu Toggle */}
        <div className="sticky top-0 z-30 border-b border-gray-800 bg-gray-900/95 px-4 py-3 backdrop-blur-sm lg:hidden">
          <button
            onClick={() =>
              window.dispatchEvent(new Event('toggle-mobile-sidebar'))
            }
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-white"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
