import { MetadataRoute } from 'next';
import { getPublishedServices } from '@/lib/services/content.service';
import { getPublishedJobs } from '@/lib/services/content.service';
import { getPublishedPortfolio } from '@/lib/services/content.service';
import { getPublishedBlogs } from '@/lib/services/content.service';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://nebulax-aac9e.web.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/career`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/team`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/activities`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Dynamic pages from Firestore
  const dynamicPages: MetadataRoute.Sitemap = [];

  try {
    // Services
    const services = await getPublishedServices();
    services.forEach((service: any) => {
      if (service.slug) {
        const lastmod = service.updatedAt?.toDate?.() || 
                       service.createdAt?.toDate?.() || 
                       new Date();
        dynamicPages.push({
          url: `${BASE_URL}/services/${service.slug}`,
          lastModified: lastmod.toISOString().split('T')[0],
          changeFrequency: 'monthly',
          priority: 0.8,
        });
      }
    });

    // Jobs
    const jobs = await getPublishedJobs();
    jobs.forEach((job: any) => {
      if (job.slug) {
        const lastmod = job.updatedAt?.toDate?.() || 
                       job.createdAt?.toDate?.() || 
                       new Date();
        dynamicPages.push({
          url: `${BASE_URL}/career/${job.slug}`,
          lastModified: lastmod.toISOString().split('T')[0],
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    });

    // Portfolio
    const portfolio = await getPublishedPortfolio();
    portfolio.forEach((item: any) => {
      if (item.slug) {
        const lastmod = item.updatedAt?.toDate?.() || 
                       item.createdAt?.toDate?.() || 
                       new Date();
        dynamicPages.push({
          url: `${BASE_URL}/portfolio/${item.slug}`,
          lastModified: lastmod.toISOString().split('T')[0],
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    });

    // Blogs
    const blogs = await getPublishedBlogs();
    blogs.forEach((blog: any) => {
      if (blog.slug) {
        const lastmod = blog.updatedAt?.toDate?.() || 
                       blog.createdAt?.toDate?.() || 
                       new Date();
        dynamicPages.push({
          url: `${BASE_URL}/blog/${blog.slug}`,
          lastModified: lastmod.toISOString().split('T')[0],
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    });

    // Pricing packages
    const pricingPackages = await getPublishedServices(); // Using services for now, adjust if you have separate pricing collection
    // Add pricing detail pages if they exist
    const pricingSlugs = ['seo-package']; // Add more as needed
    pricingSlugs.forEach((slug) => {
      dynamicPages.push({
        url: `${BASE_URL}/pricing/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages only on error
    return staticPages;
  }

  return [...staticPages, ...dynamicPages];
}

