export type PortfolioCategory =
  | 'all'
  | 'website-development'
  | 'mobile-application'
  | 'graphics-design';
export type WebsiteSubCategory =
  | 'all'
  | 'travel-website'
  | 'e-commerce'
  | 'educational-website'
  | 'informative-website'
  | 'news-agency';
export type GraphicsSubCategory =
  | 'all'
  | 'flyer-brochure'
  | 'social-media-design'
  | 'logo-design'
  | 'gifs-motion';

export type MediaType = 'image' | 'video';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  websiteSubCategory?: WebsiteSubCategory;
  graphicsSubCategory?: GraphicsSubCategory;
  media?: {
    type: MediaType;
    url: string;
    thumbnail?: string;
  };
  description?: string;
  tags?: string[];
  link?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Website Development - Travel Website
  {
    id: 'diligent-travels',
    title: 'Diligent Travels',
    category: 'website-development',
    websiteSubCategory: 'travel-website',
    description: 'Travel and trekking website with booking system',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=800&fit=crop',
    },
  },
  // Website Development - Educational Website
  {
    id: 'eduzeit',
    title: 'Eduzeit',
    category: 'website-development',
    websiteSubCategory: 'educational-website',
    description: 'E-learning platform for education network',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'eduzeit-2',
    title: 'EduZeit',
    category: 'website-development',
    websiteSubCategory: 'educational-website',
    description: 'Educational platform redesign',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop',
    },
  },
  // Website Development - Informative Website
  {
    id: 'kr-jyotish',
    title: 'KR Jyotish',
    category: 'website-development',
    websiteSubCategory: 'informative-website',
    description: 'Astrology and consultation website',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'nims',
    title: 'NIMS',
    category: 'website-development',
    websiteSubCategory: 'informative-website',
    description: 'Healthcare group website',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'infinity',
    title: 'Infinity',
    category: 'website-development',
    websiteSubCategory: 'informative-website',
    description: 'Corporate website with modern design',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'cosys-cooperative',
    title: 'Cosys Co-Operative',
    category: 'website-development',
    websiteSubCategory: 'informative-website',
    description: 'Cooperative organization website',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'horion',
    title: 'Horion',
    category: 'website-development',
    websiteSubCategory: 'informative-website',
    description: 'Business solutions website',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=800&fit=crop',
    },
  },
  // Website Development - E-Commerce
  {
    id: 'mc-dodo',
    title: 'MC Dodo',
    category: 'website-development',
    websiteSubCategory: 'e-commerce',
    description: 'Food delivery and restaurant website',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'food-on-ways',
    title: 'Food On Ways',
    category: 'website-development',
    websiteSubCategory: 'e-commerce',
    description: 'Food delivery platform',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=800&fit=crop',
    },
  },
  // Website Development - Healthcare/Informative
  {
    id: 'venus-hospital',
    title: 'Venus Hospital',
    category: 'website-development',
    websiteSubCategory: 'informative-website',
    description: 'Healthcare website with appointment booking',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1576091160550-2173cba9f9d6?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'hardik-ivf-center',
    title: 'Hardik IVF Center',
    category: 'website-development',
    websiteSubCategory: 'informative-website',
    description: 'Fertility center website with patient portal',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'lashes-makeup-studio',
    title: 'Lashes Makeup Studio',
    category: 'website-development',
    websiteSubCategory: 'informative-website',
    description: 'Beauty salon website with booking system',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'venus-hospital-2',
    title: 'Venus Hospital',
    category: 'website-development',
    websiteSubCategory: 'informative-website',
    description: 'Hospital website with services showcase',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=800&fit=crop',
    },
  },

  // Mobile Application
  {
    id: 'mobile-app-1',
    title: 'Travel App',
    category: 'mobile-application',
    description: 'Cross-platform travel booking mobile application',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'mobile-app-2',
    title: 'E-Learning App',
    category: 'mobile-application',
    description: 'Educational mobile app with course management',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'mobile-app-3',
    title: 'Healthcare App',
    category: 'mobile-application',
    description: 'Medical appointment and consultation app',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'mobile-app-4',
    title: 'Food Delivery App',
    category: 'mobile-application',
    description: 'Restaurant and food delivery mobile app',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?w=800&h=800&fit=crop',
    },
  },

  // Graphics Design - Flyer/Brochure
  {
    id: 'flyer-1',
    title: 'Travel Brochure',
    category: 'graphics-design',
    graphicsSubCategory: 'flyer-brochure',
    description: 'Travel agency promotional brochure',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'flyer-2',
    title: 'Healthcare Flyer',
    category: 'graphics-design',
    graphicsSubCategory: 'flyer-brochure',
    description: 'Medical services information flyer',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1576091160550-2173cba9f9d6?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'flyer-3',
    title: 'Education Brochure',
    category: 'graphics-design',
    graphicsSubCategory: 'flyer-brochure',
    description: 'Educational institution brochure',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=800&fit=crop',
    },
  },

  // Graphics Design - Social Media Design
  {
    id: 'social-1',
    title: 'Social Media Campaign',
    category: 'graphics-design',
    graphicsSubCategory: 'social-media-design',
    description: 'Healthcare social media posts and stories',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'social-2',
    title: 'Brand Social Posts',
    category: 'graphics-design',
    graphicsSubCategory: 'social-media-design',
    description: 'Consistent brand social media design',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'social-3',
    title: 'Event Promotion',
    category: 'graphics-design',
    graphicsSubCategory: 'social-media-design',
    description: 'Event announcement and promotion graphics',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=800&fit=crop',
    },
  },

  // Graphics Design - Logo Design
  {
    id: 'logo-1',
    title: 'Corporate Logo',
    category: 'graphics-design',
    graphicsSubCategory: 'logo-design',
    description: 'Modern corporate identity logo',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'logo-2',
    title: 'Brand Logo',
    category: 'graphics-design',
    graphicsSubCategory: 'logo-design',
    description: 'Creative brand logo design',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'logo-3',
    title: 'Startup Logo',
    category: 'graphics-design',
    graphicsSubCategory: 'logo-design',
    description: 'Innovative startup logo design',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&h=800&fit=crop',
    },
  },

  // Graphics Design - Gifs and Motion
  {
    id: 'gif-1',
    title: 'Animated Banner',
    category: 'graphics-design',
    graphicsSubCategory: 'gifs-motion',
    description: 'Animated promotional banner',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'gif-2',
    title: 'Motion Graphics',
    category: 'graphics-design',
    graphicsSubCategory: 'gifs-motion',
    description: 'Brand motion graphics video',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=800&fit=crop',
    },
  },
  {
    id: 'gif-3',
    title: 'Social Media GIF',
    category: 'graphics-design',
    graphicsSubCategory: 'gifs-motion',
    description: 'Engaging social media animated content',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&h=800&fit=crop',
    },
  },
];

export const PORTFOLIO_CATEGORIES = [
  { id: 'all' as PortfolioCategory, label: 'All' },
  {
    id: 'website-development' as PortfolioCategory,
    label: 'Website Development',
  },
  {
    id: 'mobile-application' as PortfolioCategory,
    label: 'Mobile Application',
  },
  { id: 'graphics-design' as PortfolioCategory, label: 'Graphics Design' },
] as const;

export const WEBSITE_SUB_CATEGORIES = [
  { id: 'all' as WebsiteSubCategory, label: 'All' },
  { id: 'travel-website' as WebsiteSubCategory, label: 'Travel Website' },
  { id: 'e-commerce' as WebsiteSubCategory, label: 'E-Commerce' },
  {
    id: 'educational-website' as WebsiteSubCategory,
    label: 'Educational Website',
  },
  {
    id: 'informative-website' as WebsiteSubCategory,
    label: 'Informative Website',
  },
  { id: 'news-agency' as WebsiteSubCategory, label: 'News Agency' },
] as const;

export const GRAPHICS_SUB_CATEGORIES = [
  { id: 'all' as GraphicsSubCategory, label: 'All' },
  { id: 'flyer-brochure' as GraphicsSubCategory, label: 'Flyer/Brochure' },
  {
    id: 'social-media-design' as GraphicsSubCategory,
    label: 'Social Media Design',
  },
  { id: 'logo-design' as GraphicsSubCategory, label: 'Logo Design' },
  { id: 'gifs-motion' as GraphicsSubCategory, label: 'Gifs and Motion' },
] as const;

export const getFilteredPortfolio = (
  category: PortfolioCategory,
  websiteSubCategory?: WebsiteSubCategory,
  graphicsSubCategory?: GraphicsSubCategory
): PortfolioItem[] => {
  let filtered = PORTFOLIO_ITEMS;

  if (category !== 'all') {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (
    category === 'website-development' &&
    websiteSubCategory &&
    websiteSubCategory !== 'all'
  ) {
    filtered = filtered.filter(
      (item) => item.websiteSubCategory === websiteSubCategory
    );
  }

  if (
    category === 'graphics-design' &&
    graphicsSubCategory &&
    graphicsSubCategory !== 'all'
  ) {
    filtered = filtered.filter(
      (item) => item.graphicsSubCategory === graphicsSubCategory
    );
  }

  return filtered;
};
