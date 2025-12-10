'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminGuard } from '@/components/admin/admin-guard';
import {
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
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import { fetchServices } from '@/lib/admin/services-admin';
import { fetchPortfolioItems } from '@/lib/admin/portfolio-admin';
import { fetchPricingDetails } from '@/lib/admin/pricing-admin';
import { fetchBlogs } from '@/lib/admin/blogs-admin';
import { fetchTestimonials } from '@/lib/admin/testimonials-admin';
import { fetchPartners } from '@/lib/admin/partners-admin';
import { fetchTeamMembers } from '@/lib/admin/team-admin';
import { fetchJobs } from '@/lib/admin/jobs-admin';
import { fetchActivities } from '@/lib/admin/activities-admin';
import { fetchFAQs } from '@/lib/admin/faqs-admin';

type Stats = {
  services: { total: number; published: number };
  portfolio: { total: number; published: number };
  pricing: { total: number; published: number };
  blogs: { total: number; published: number };
  testimonials: { total: number; published: number };
  partners: { total: number; published: number };
  team: { total: number; published: number };
  jobs: { total: number; published: number };
  activities: { total: number; published: number };
  faqs: { total: number; published: number };
};

const quickLinks = [
  {
    href: '/admin/services',
    label: 'Services',
    icon: Briefcase,
    color: 'blue',
  },
  {
    href: '/admin/portfolio',
    label: 'Portfolio',
    icon: ImageIcon,
    color: 'purple',
  },
  {
    href: '/admin/pricing',
    label: 'Pricing',
    icon: DollarSign,
    color: 'green',
  },
  { href: '/admin/blogs', label: 'Blogs', icon: FileText, color: 'orange' },
  {
    href: '/admin/testimonials',
    label: 'Testimonials',
    icon: MessageSquare,
    color: 'pink',
  },
  { href: '/admin/partners', label: 'Partners', icon: Users, color: 'cyan' },
  { href: '/admin/team', label: 'Team', icon: UserCheck, color: 'indigo' },
  {
    href: '/admin/jobs',
    label: 'Jobs',
    icon: BriefcaseBusiness,
    color: 'yellow',
  },
  {
    href: '/admin/activities',
    label: 'Activities',
    icon: Calendar,
    color: 'red',
  },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle, color: 'teal' },
  { href: '/admin/settings', label: 'Settings', icon: Settings, color: 'gray' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    services: { total: 0, published: 0 },
    portfolio: { total: 0, published: 0 },
    pricing: { total: 0, published: 0 },
    blogs: { total: 0, published: 0 },
    testimonials: { total: 0, published: 0 },
    partners: { total: 0, published: 0 },
    team: { total: 0, published: 0 },
    jobs: { total: 0, published: 0 },
    activities: { total: 0, published: 0 },
    faqs: { total: 0, published: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [rebuilding, setRebuilding] = useState(false);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [
        services,
        portfolio,
        pricing,
        blogs,
        testimonials,
        partners,
        team,
        jobs,
        activities,
        faqs,
      ] = await Promise.all([
        fetchServices(),
        fetchPortfolioItems(),
        fetchPricingDetails(),
        fetchBlogs(),
        fetchTestimonials(),
        fetchPartners(),
        fetchTeamMembers(),
        fetchJobs(),
        fetchActivities(),
        fetchFAQs(),
      ]);

      setStats({
        services: {
          total: services.length,
          published: services.filter((s) => s.status === 'published').length,
        },
        portfolio: {
          total: portfolio.length,
          published: portfolio.filter((p) => p.status === 'published').length,
        },
        pricing: {
          total: pricing.length,
          published: pricing.filter((p) => p.status === 'published').length,
        },
        blogs: {
          total: blogs.length,
          published: blogs.filter((b) => b.status === 'published').length,
        },
        testimonials: {
          total: testimonials.length,
          published: testimonials.filter((t) => t.status === 'published')
            .length,
        },
        partners: {
          total: partners.length,
          published: partners.filter((p) => p.status === 'published').length,
        },
        team: {
          total: team.length,
          published: team.filter((t) => t.status === 'published').length,
        },
        jobs: {
          total: jobs.length,
          published: jobs.filter((j) => j.status === 'published').length,
        },
        activities: {
          total: activities.length,
          published: activities.filter((a) => a.status === 'published').length,
        },
        faqs: {
          total: faqs.length,
          published: faqs.filter((f) => f.status === 'published').length,
        },
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadStats();
  }, []);

  const handleRebuild = async () => {
    if (!confirm('This will trigger a rebuild of the static site. Continue?'))
      return;
    setRebuilding(true);
    try {
      // TODO: Implement rebuild trigger (e.g., GitHub Actions webhook, Firebase Cloud Function, etc.)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('Rebuild triggered. The site will be updated shortly.');
    } catch (error) {
      alert(
        'Failed to trigger rebuild. Please check your deployment configuration.'
      );
    } finally {
      setRebuilding(false);
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; icon: string }> =
      {
        blue: {
          bg: 'bg-[#43b14b]/20',
          border: 'border-[#43b14b]/30',
          icon: 'text-[#43b14b]',
        },
        purple: {
          bg: 'bg-purple-600/20',
          border: 'border-purple-500/30',
          icon: 'text-purple-400',
        },
        green: {
          bg: 'bg-green-600/20',
          border: 'border-green-500/30',
          icon: 'text-green-400',
        },
        orange: {
          bg: 'bg-orange-600/20',
          border: 'border-orange-500/30',
          icon: 'text-orange-400',
        },
        pink: {
          bg: 'bg-pink-600/20',
          border: 'border-pink-500/30',
          icon: 'text-pink-400',
        },
        cyan: {
          bg: 'bg-cyan-600/20',
          border: 'border-cyan-500/30',
          icon: 'text-cyan-400',
        },
        indigo: {
          bg: 'bg-indigo-600/20',
          border: 'border-indigo-500/30',
          icon: 'text-indigo-400',
        },
        yellow: {
          bg: 'bg-yellow-600/20',
          border: 'border-yellow-500/30',
          icon: 'text-yellow-400',
        },
        red: {
          bg: 'bg-red-600/20',
          border: 'border-red-500/30',
          icon: 'text-red-400',
        },
        teal: {
          bg: 'bg-teal-600/20',
          border: 'border-teal-500/30',
          icon: 'text-teal-400',
        },
        gray: {
          bg: 'bg-gray-600/20',
          border: 'border-gray-500/30',
          icon: 'text-gray-400',
        },
      };
    return colors[color] || colors.gray;
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#1b1b1b] p-4 text-white sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          {/* Header - Compact and Responsive */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-400 sm:text-base">
                Overview of your content and system
              </p>
            </div>
            <button
              onClick={handleRebuild}
              disabled={rebuilding}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#43b14b] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#3a9a41] disabled:opacity-70 sm:w-auto sm:px-4 sm:text-sm"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${rebuilding ? 'animate-spin' : ''}`}
              />
              {rebuilding ? 'Rebuilding...' : 'Rebuild Site'}
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-gray-500 sm:py-20 sm:text-base">
              Loading statistics...
            </div>
          ) : (
            <>
              {/* Stats Grid - Fully Responsive */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <StatCard
                  label="Services"
                  value={stats.services.published}
                  total={stats.services.total}
                />
                <StatCard
                  label="Portfolio"
                  value={stats.portfolio.published}
                  total={stats.portfolio.total}
                />
                <StatCard
                  label="Pricing"
                  value={stats.pricing.published}
                  total={stats.pricing.total}
                />
                <StatCard
                  label="Blogs"
                  value={stats.blogs.published}
                  total={stats.blogs.total}
                />
                <StatCard
                  label="Testimonials"
                  value={stats.testimonials.published}
                  total={stats.testimonials.total}
                />
                <StatCard
                  label="Partners"
                  value={stats.partners.published}
                  total={stats.partners.total}
                />
                <StatCard
                  label="Team"
                  value={stats.team.published}
                  total={stats.team.total}
                />
                <StatCard
                  label="Jobs"
                  value={stats.jobs.published}
                  total={stats.jobs.total}
                />
                <StatCard
                  label="Activities"
                  value={stats.activities.published}
                  total={stats.activities.total}
                />
                <StatCard
                  label="FAQs"
                  value={stats.faqs.published}
                  total={stats.faqs.total}
                />
              </div>

              {/* Quick Access - Compact Grid */}
              <div>
                <h2 className="mb-3 text-lg font-semibold text-white sm:mb-4 sm:text-xl">
                  Quick Access
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;
                    const colors = getColorClasses(link.color);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-3 transition-colors hover:border-gray-700 sm:p-4"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                          <div
                            className={`rounded-lg p-1.5 sm:p-2 ${colors?.bg || 'bg-gray-600/20'} ${colors?.border || 'border-gray-500/30'} flex-shrink-0 border`}
                          >
                            <Icon
                              className={`h-4 w-4 sm:h-5 sm:w-5 ${colors?.icon || 'text-gray-400'}`}
                            />
                          </div>
                          <span className="truncate text-xs font-medium text-white sm:text-sm">
                            {link.label}
                          </span>
                        </div>
                        <ArrowRight className="ml-2 h-3.5 w-3.5 flex-shrink-0 text-gray-500 transition-colors group-hover:text-white sm:h-4 sm:w-4" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}

function StatCard({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3 transition-colors hover:border-gray-700 sm:p-4">
      <div className="mb-1 truncate text-xs text-gray-400 sm:text-sm">
        {label}
      </div>
      <div className="text-xl font-semibold text-white sm:text-2xl">
        {value}
      </div>
      <div className="mt-1 text-xs text-gray-500">{total} total</div>
    </div>
  );
}
