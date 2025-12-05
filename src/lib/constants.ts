import {
  Globe,
  Smartphone,
  Code,
  Palette,
  Search,
  Share2,
  PenTool,
  FileText,
} from 'lucide-react';

export const SERVICES = [
  {
    icon: Globe,
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    title: 'Website Development',
    slug: 'website-development',
    description:
      'Highly functional & visually appealing website designed to meet your need.',
  },
  {
    icon: Smartphone,
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    title: 'App Development In Nepal',
    slug: 'app-development',
    description:
      'Innovative and user-friendly mobile application designed to engage users.',
  },
  {
    icon: Code,
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    title: 'System/Software Development',
    slug: 'software-development',
    description: 'System/software developed according to your business needs.',
  },
  {
    icon: Palette,
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    title: 'UI/UX',
    slug: 'ui-ux-design',
    description:
      'Design eye-catching UI/UX interfaces for effortless user interaction.',
  },
  {
    icon: Search,
    image:
      'https://images.unsplash.com/photo-1432888622747-4eb9a8f2d93a?w=800&h=600&fit=crop',
    title: 'Search Engine Optimization (SEO)',
    slug: 'seo',
    description:
      'Custom SEO solutions for enhanced search engine visibility and growth',
  },
  {
    icon: Share2,
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    title: 'Social Media Marketing (SMM)',
    slug: 'social-media-marketing',
    description:
      'Build a strong online presence and engage with your targeted audience',
  },
  {
    icon: PenTool,
    image:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    title: 'Graphic Design',
    slug: 'graphic-design',
    description:
      "Designs that Speak Your Brand's Narrative and Connect with Your Audience",
  },
  {
    icon: FileText,
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
    title: 'Content Writing',
    slug: 'content-writing',
    description:
      'Engaging and meaningful content to connect with your audience',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Bibek Regmi',
    title: 'Managing Director, NLPRC',
    text: 'NebulaX Research & Technologies Pvt. Ltd. is the best website design and development company in nepal with highly qualified IT staff having an amazing sense of understanding, cooperation, and support to the clients during the project design. The company offers follow-up services that are commendable.',
    rating: 5,
  },
  {
    name: 'Shreeram Dhakal',
    title: 'Chairman, NIMS Group Clinic Pvt. Ltd.',
    text: 'NebulaX has been a game-changer for us at NIMS Group Clinic Pvt Ltd. Their Social Media Marketing and Website Development services have transformed our online presence. Their innovative strategies boosted our visibility and engagement significantly.',
    rating: 5,
  },
  {
    name: 'Sulav Prasad Pudasaini',
    title: 'Founder/ CEO, Eduzeit Education Network',
    text: 'NebulaX has very unique team professionally and understands the need of customers in the very sight. It very worthy to be the part of its customer due to its time relevant solutions and excellent customer support.',
    rating: 5,
  },
] as const;

export const TECHNOLOGIES = {
  web: [
    'JavaScript',
    'Node.js',
    'Python',
    'Django',
    'HTML5',
    'CSS3',
    'Next.js',
    'React',
    'PHP',
    'Laravel',
    'Figma',
    'WordPress',
  ],
  app: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Java', 'Dart'],
  database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  cloud: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Docker', 'Kubernetes'],
} as const;

export const TECHNOLOGY_TABS = [
  { id: 'web', label: 'Web Development' },
  { id: 'app', label: 'App Development' },
  { id: 'database', label: 'Database' },
  { id: 'cloud', label: 'Cloud Platform' },
] as const;

export const BLOGS = [
  {
    date: 'Jun 12, 2024',
    title: 'Best Website Design and Development Cost in Nepal',
    excerpt:
      'You must be wondering what may be the cost of Website design. Website development in Nepal...',
  },
  {
    date: 'Jun 12, 2024',
    title: 'Best IT Company in Nepal 2026',
    excerpt:
      'The number of IT companies found in every corner of Nepal has been living proof that Nepal has...',
  },
] as const;

export const SECTION_SPACING = {
  section: 'py-16 sm:py-20 lg:py-24',
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  grid: 'grid gap-6 sm:gap-8 lg:gap-10',
} as const;
