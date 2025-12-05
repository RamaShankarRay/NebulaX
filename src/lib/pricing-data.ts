export interface PricingTier {
  name: string;
  price: string;
  priceNote?: string;
  badge?: string;
  preferredFor: string;
  features: string[];
  hasProjectManager: boolean;
  ctaText: string;
  ctaLink?: string;
}

export interface PricingDetail {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  heroImage?: string;
  tiers: PricingTier[];
  note?: string;
  contractTerms?: string;
  customPackageForm: {
    title: string;
    description: string;
    fields: Array<{
      name: string;
      label: string;
      type: 'text' | 'email' | 'tel' | 'select' | 'number';
      placeholder?: string;
      required: boolean;
      options?: string[];
    }>;
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const PRICING_DETAILS: PricingDetail[] = [
  {
    slug: 'seo-package',
    title: 'SEO Package',
    shortDescription:
      'Comprehensive SEO solutions to improve your search engine visibility and drive organic traffic.',
    longDescription:
      'Our SEO packages are designed to help businesses of all sizes achieve better search engine rankings, increase organic traffic, and improve online visibility. Choose the plan that best fits your business needs.',
    tiers: [
      {
        name: 'Standard',
        price: 'Rs 34,000',
        priceNote: '/ mon',
        preferredFor: 'Preferred For Small Businesses',
        features: [
          'Initial website analysis',
          'Upto 10 Keyword Ranking',
          'Site Audit',
          'Competitor Analysis',
          'Google Analytics Setup',
          'Google Search Console Setup',
          'Robots.Txt Creation',
          'Sitemap Creation',
          'On Page Setup',
          'Keyword Research',
          'Keyword Mapping',
          'Few Major Pages Meta And Heading Tag Optimization',
          'URL Optimization',
          'Image Optimization',
          '2 SEO Optimized Blog Articles',
          'Few Existing Content Optimization',
          'Technical SEO',
          'Canonical URL Addition',
          'Custom 404 Page Setup',
          'OG Tags',
          'Page Redirection',
          'Sitemap',
          'Robots.Txt',
          'Browser Compatibility Check',
          'Page Speed Optimization',
          'Broken Link Fixing',
          'Site Architecture',
          'Mobile Friendliness',
          'Solve Keyword Cannibalization',
          'Hreflang Tags',
          'Competitor Backlink Research',
          'Other Webmaster Optimization',
          'Off Page SEO',
          'Link Building',
          'Guest Blogging',
          'Directory Submission',
          'Quora Posting',
          'Reddit Posting',
          'Schema Implementation',
          'Conversion Tracking',
          'Infographic Creation And Sharing',
          'Local SEO',
          'GMB Setup & Optimization',
          'GMB Posting',
          'Google Map Creation',
          'Local Citation',
          'Monthly Report',
          'Work Done Report',
          'On Page Report',
          'Backlink Report',
          'Traffic By Country',
          'Traffic Comparison',
          'Top 10 Performing Pages',
          'Top 10 Keywords',
          'Clicks, Impression, Position',
        ],
        hasProjectManager: false,
        ctaText: 'Select Plan',
        ctaLink: '/#contact',
      },
      {
        name: 'Professional',
        price: 'Rs 56,000',
        priceNote: '/ mon',
        badge: 'best value',
        preferredFor: 'Preferred For Mid Size Businesses',
        features: [
          'Initial website analysis',
          'Upto 20 Keyword Ranking',
          'Site Audit',
          'Competitor Analysis',
          'Google Analytics Setup',
          'Google Search Console Setup',
          'Robots.Txt Creation',
          'Sitemap Creation',
          'On Page Setup',
          'Keyword Research',
          'Keyword Mapping',
          'Major Pages Meta And Heading Tag Optimization',
          'URL Optimization',
          'Image Optimization',
          '4 SEO Optimized Blog Articles',
          'Existing Major Page Content Optimization',
          'Technical SEO',
          'Canonical URL Addition',
          'Custom 404 Page Setup',
          'OG Tags',
          'Page Redirection',
          'Sitemap',
          'Robots.Txt',
          'Browser Compatibility Check',
          'Page Speed Optimization',
          'Broken Link Fixing',
          'Site Architecture',
          'Mobile Friendliness',
          'Solve Keyword Cannibalization',
          'Hreflang Tags',
          'Competitor Backlink Research',
          'Bing Webmaster Optimization',
          'Off Page SEO',
          'Link Building',
          'Guest Blogging',
          'Few Directory Submission',
          'Few Weekly Post On Quora',
          'Few Weekly Post On Reddit',
          'Schema Implementation',
          'Conversion Tracking',
          'Few Infographic Creation And Sharing',
          'Local SEO',
          'GMB Setup & Optimization',
          'GMB Posting',
          'Google Map Creation',
          'Few Local Citation',
          'Monthly Report',
          'Work Done Report',
          'On Page Report',
          'Backlink Report',
          'Traffic By Country',
          'Traffic Comparison',
          'Top 10 Performing Pages',
          'Top 10 Keywords',
          'Clicks, Impression, Position',
        ],
        hasProjectManager: true,
        ctaText: 'Select Plan',
        ctaLink: '/#contact',
      },
      {
        name: 'Premium',
        price: 'Rs 88,000',
        priceNote: '/ mon',
        preferredFor: 'Preferred For Large Businesses',
        features: [
          'Initial website analysis',
          'Upto 40 Keyword Ranking',
          'Site Audit',
          'Competitor Analysis',
          'Google Analytics Setup',
          'Google Search Console Setup',
          'Robots.Txt Creation',
          'Sitemap Creation',
          'On Page Setup',
          'Keyword Research',
          'Keyword Mapping',
          'Major Pages Meta And Heading Tag Optimization',
          'URL Optimization',
          'Image Optimization',
          '6 SEO Optimized Blog Articles',
          'Existing Major Page Content Optimization',
          'Technical SEO',
          'Canonical URL Addition',
          'Custom 404 Page Setup',
          'OG Tags',
          'Page Redirection',
          'Sitemap',
          'Robots.Txt',
          'Browser Compatibility Check',
          'Page Speed Optimization',
          'Broken Link Fixing',
          'Site Architecture',
          'Mobile Friendliness',
          'Solve Keyword Cannibalization',
          'Hreflang Tags',
          'Competitor Backlink Research',
          'Bing Webmaster Optimization',
          'Off Page SEO',
          'Link Building',
          'Guest Blogging',
          'Few Directory Submission',
          'Active On Quora',
          'Active On Reddit',
          'Schema Implementation',
          'Conversion Tracking',
          'Monthly 1 Infographic Creation And Sharing',
          'Local SEO',
          'GMB Setup & Optimization',
          'GMB Posting',
          'Google Map Creation',
          'Local Citation',
          'Monthly Report',
          'Work Done Report',
          'On Page Report',
          'Backlink Report',
          'Traffic By Country',
          'Traffic Comparison',
          'Top 10 Performing Pages',
          'Top 10 Keywords',
          'Clicks, Impression, Position',
        ],
        hasProjectManager: true,
        ctaText: 'Select Plan',
        ctaLink: '/#contact',
      },
      {
        name: 'Premium Plus',
        price: 'contact sales',
        preferredFor: 'Preferred For Highly Competitive Businesses',
        features: [
          'Initial website analysis',
          'Upto 60 Keyword Ranking',
          'Site Audit',
          'Competitor Analysis',
          'Google Analytics Setup',
          'Google Search Console Setup',
          'Robots.Txt Creation',
          'Sitemap Creation',
          'On Page Setup',
          'Keyword Research',
          'Keyword Mapping',
          'Major Pages Meta And Heading Tag Optimization',
          'URL Optimization',
          'Image Optimization',
          '8 SEO Optimized Blog Articles',
          'Existing Major Page Content Optimization',
          'Technical SEO',
          'Canonical URL Addition',
          'Custom 404 Page Setup',
          'OG Tags',
          'Page Redirection',
          'Sitemap',
          'Robots.Txt',
          'Browser Compatibility Check',
          'Page Speed Optimization',
          'Broken Link Fixing',
          'Site Architecture',
          'Mobile Friendliness',
          'Solve Keyword Cannibalization',
          'Hreflang Tags',
          'Competitor Backlink Research',
          'Bing And Other Webmaster Optimization',
          'Off Page SEO',
          'Link Building',
          'Guest Blogging',
          'Few Directory Submission',
          'Active On Quora',
          'Active On Reddit',
          'Schema Implementation',
          'Conversion Tracking',
          'Monthly 1 Infographic Creation And Sharing',
          'Local SEO',
          'GMB Setup & Optimization',
          'GMB Posting',
          'Google Map Creation',
          'Local Citation',
          'Monthly Report',
          'Work Done Report',
          'On Page Report',
          'Backlink Report',
          'Traffic By Country',
          'Traffic Comparison',
          'Top 10 Performing Pages',
          'Top 10 Keywords',
          'Clicks, Impression, Position',
        ],
        hasProjectManager: true,
        ctaText: 'Quick Enquiry',
        ctaLink: '/#contact',
      },
    ],
    note: '*Note :All of the above packages are exclusive of VAT.',
    contractTerms: 'Contract: Minimum 6 months.',
    customPackageForm: {
      title: 'Create Your Custom Package',
      description: 'Request for a quotation',
      fields: [
        {
          name: 'name',
          label: 'Name/Business Name *',
          type: 'text',
          placeholder: 'Choose your name or business name',
          required: true,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
          required: false,
        },
        {
          name: 'phone',
          label: 'Phone No. *',
          type: 'tel',
          placeholder: 'Enter your phone',
          required: true,
        },
        {
          name: 'businessCategory',
          label: 'Business Category',
          type: 'select',
          placeholder: 'Choose a Category',
          required: false,
          options: [
            'E-commerce',
            'Healthcare',
            'Education',
            'Finance',
            'Technology',
            'Other',
          ],
        },
        {
          name: 'noOfBlogs',
          label: 'No. of Blogs',
          type: 'select',
          placeholder: 'Select no. of Blogs',
          required: false,
          options: ['2', '4', '6', '8', 'Custom'],
        },
        {
          name: 'noOfKeywords',
          label: 'No. of Keywords',
          type: 'number',
          placeholder: 'Enter number of Keywords',
          required: false,
        },
      ],
    },
    faqs: [
      {
        question: 'What is included in the SEO Package?',
        answer:
          'Our SEO packages include comprehensive on-page and off-page SEO services, technical SEO optimization, content creation, link building, local SEO, monthly reporting, and more. The specific features vary by package tier.',
      },
      {
        question: 'How long does it take to see results?',
        answer:
          'SEO results typically start showing after 3-6 months of consistent optimization. However, this varies based on competition, website age, and current SEO status.',
      },
      {
        question: 'Can I upgrade or downgrade my plan?',
        answer:
          'Yes, you can upgrade or downgrade your plan. Changes will be reflected in the next billing cycle. Please contact us to discuss plan changes.',
      },
      {
        question: 'Do you provide monthly reports?',
        answer:
          'Yes, all packages include comprehensive monthly reports covering work done, on-page optimization, backlinks, traffic analysis, keyword rankings, and performance metrics.',
      },
      {
        question: 'What is the minimum contract period?',
        answer:
          'The minimum contract period is 6 months for all SEO packages. This ensures sufficient time to implement strategies and see meaningful results.',
      },
      {
        question: 'Are the prices inclusive of VAT?',
        answer:
          'No, all package prices are exclusive of VAT. VAT will be added as per applicable tax regulations.',
      },
    ],
  },
];

export const getPricingBySlug = (slug: string): PricingDetail | undefined => {
  return PRICING_DETAILS.find((pricing) => pricing.slug === slug);
};

export const getAllPricingSlugs = (): string[] => {
  return PRICING_DETAILS.map((pricing) => pricing.slug);
};
