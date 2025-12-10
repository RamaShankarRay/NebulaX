'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Image as ImageIcon,
  DollarSign,
  FileText,
  MessageSquare,
  Users,
  UserCheck,
  BriefcaseBusiness,
  Calendar,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/services/auth.service';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/portfolio', label: 'Portfolio', icon: ImageIcon },
  { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
  { href: '/admin/blogs', label: 'Blogs', icon: FileText },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin/partners', label: 'Partners', icon: Users },
  { href: '/admin/team', label: 'Team', icon: UserCheck },
  { href: '/admin/jobs', label: 'Jobs', icon: BriefcaseBusiness },
  { href: '/admin/activities', label: 'Activities', icon: Calendar },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed');
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  // Save collapsed state to localStorage
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('admin-sidebar-collapsed', JSON.stringify(newState));
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('sidebar-toggle'));
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      setUser(null);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Listen for mobile toggle events
    const handleMobileToggle = () => {
      setIsMobileOpen((prev) => !prev);
    };
    window.addEventListener('toggle-mobile-sidebar', handleMobileToggle);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('toggle-mobile-sidebar', handleMobileToggle);
    };
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-[#1b1b1b]/50 lg:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarWidth} fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-gray-800 bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ${
          isMobile && !isMobileOpen ? '-translate-x-full' : ''
        } overflow-hidden lg:translate-x-0`}
      >
        {/* Header with Toggle */}
        <div
          className={`${isCollapsed ? 'p-2' : 'p-3 sm:p-4'} flex items-center border-b border-gray-800 ${isCollapsed ? 'justify-center' : 'justify-between'}`}
        >
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                NebulaX Admin
              </h2>
              <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">
                Content Management
              </p>
            </div>
          )}
          <button
            onClick={isMobile ? toggleMobile : toggleSidebar}
            className={`${isCollapsed ? 'p-2' : 'p-1.5 sm:p-2'} flex-shrink-0 rounded-lg text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-white`}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isMobile ? (
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : isCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 overflow-y-auto overflow-x-hidden ${isCollapsed ? 'p-2' : 'p-2 sm:p-3'} space-y-1`}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#374151 transparent',
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (isMobile) setIsMobileOpen(false);
                }}
                className={`flex items-center ${isCollapsed ? 'justify-center px-0 py-2.5' : 'gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5'} group relative rounded-lg text-xs transition-colors sm:text-sm ${
                  isActive
                    ? 'border border-[#43b14b]/30 bg-[#43b14b]/20 text-[#43b14b]'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0`}
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
                {/* Tooltip for collapsed state */}
                {isCollapsed && !isMobile && (
                  <div className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div
          className={`${isCollapsed ? 'p-2' : 'p-2 sm:p-3'} border-t border-gray-800`}
        >
          <button
            onClick={handleLogout}
            className={`flex items-center ${isCollapsed ? 'justify-center px-0 py-2.5' : 'gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5'} w-full rounded-lg text-xs text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-white sm:text-sm`}
            title={isCollapsed ? 'Sign Out' : undefined}
          >
            <LogOut
              className={`${isCollapsed ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0`}
            />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </>
  );
}
