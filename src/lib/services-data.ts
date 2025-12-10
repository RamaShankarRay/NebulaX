export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface Industry {
  icon: string;
  title: string;
  description: string;
}

export interface TechStack {
  frontend: string[];
  backend: string[];
  infrastructure: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseUs {
  icon: string;
  title: string;
  description: string;
}

export interface PortfolioItem {
  title: string;
  image: string;
  category: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  stats: {
    years: number;
    clients: string;
    projects: string;
    team: string;
    guarantee?: string;
  };
  features: ServiceFeature[];
  industries: Industry[];
  techStack: TechStack;
  process: ProcessStep[];
  whyChooseUs: WhyChooseUs[];
  portfolio: PortfolioItem[];
  faqs: FAQ[];
  ctaTitle: string;
  ctaDescription: string;
  ctaQuestions: Array<{
    icon: string;
    question: string;
  }>;
}

// Shared defaults reused across services to keep data consistent and compact
const sharedStats = {
  years: 6,
  clients: '300+',
  projects: '400+',
  team: '80+',
  guarantee: 'Satisfaction Guarantee',
};

const sharedFeatures: ServiceFeature[] = [
  {
    icon: '/services/info/thumb_1.svg',
    title: 'Delivery You Can Trust',
    description:
      'Predictable outcomes with clear milestones and transparent communication.',
  },
  {
    icon: '/services/info/quality.svg',
    title: 'Quality Built-In',
    description:
      'Code reviews, performance budgets, and accessibility baked into every release.',
  },
  {
    icon: '/services/info/Group_2.svg',
    title: 'User-First Experiences',
    description:
      'Interfaces that are intuitive, fast, and inclusive across devices.',
  },
];

const sharedIndustries: Industry[] = [
  {
    icon: '/services/industries/ecommerce.svg',
    title: 'E-commerce',
    description:
      'Optimized buying journeys with secure checkout and scalable catalogs.',
  },
  {
    icon: '/services/industries/elearning.svg',
    title: 'E-Learning',
    description:
      'Learning portals with progress tracking, assessments, and rich media.',
  },
  {
    icon: '/services/industries/others.svg',
    title: 'Enterprise & Others',
    description:
      'Bespoke solutions for finance, healthcare, travel, and operations.',
  },
];

const sharedTechStack: TechStack = {
  frontend: [
    'React',
    'Next.js',
    'TypeScript',
    'Vue.js',
    'Angular',
    'HTML5',
    'CSS3',
  ],
  backend: [
    'Node.js',
    'NestJS',
    'Python',
    'Django',
    'PHP',
    'Laravel',
    'WordPress',
  ],
  infrastructure: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Cloudflare'],
};

const sharedProcess: ProcessStep[] = [
  {
    number: '01',
    title: 'Requirement Analysis',
    description:
      'Define goals, users, constraints, and success metrics to guide delivery.',
    icon: '/services/process/requirement.svg',
  },
  {
    number: '02',
    title: 'Planning',
    description:
      'Prioritize scope, align milestones, and de-risk timelines up-front.',
    icon: '/services/process/planning.svg',
  },
  {
    number: '03',
    title: 'Design (UI/UX)',
    description:
      'Wireframes to high-fidelity UI with accessibility and usability baked in.',
    icon: '/services/process/design.svg',
  },
  {
    number: '04',
    title: 'Development',
    description:
      'Modern stacks, code quality gates, and performance-first implementation.',
    icon: '/services/process/development.svg',
  },
  {
    number: '05',
    title: 'Testing & QA',
    description:
      'Automated and manual QA for reliability, security, and responsiveness.',
    icon: '/services/process/testing.svg',
  },
  {
    number: '06',
    title: 'Deployment',
    description: 'CI/CD, monitoring, and rollback safety for smooth launches.',
    icon: '/services/process/deployment.svg',
  },
  {
    number: '07',
    title: 'Maintenance',
    description:
      'Proactive updates, optimizations, and support with clear SLAs.',
    icon: '/services/process/maintenance.svg',
  },
  {
    number: '08',
    title: 'Knowledge Transfer',
    description:
      'Handover, playbooks, and training so your team can operate confidently.',
    icon: '/services/process/knowledge.svg',
  },
];

const sharedWhyChooseUs: WhyChooseUs[] = [
  {
    icon: '/services/why/functionality.svg',
    title: 'Robust Functionality',
    description:
      'High-quality builds with advanced features and great performance.',
  },
  {
    icon: '/services/why/client-centric.svg',
    title: 'Client-Centric Approach',
    description:
      'Decisions grounded in your objectives, users, and measurable outcomes.',
  },
  {
    icon: '/services/why/innovative.svg',
    title: 'Design & Innovation',
    description:
      'Modern, minimal, and accessible design systems for cohesive experiences.',
  },
  {
    icon: '/services/why/timely.svg',
    title: 'On-Time Delivery',
    description:
      'Predictable delivery with milestone tracking and transparent updates.',
  },
];

const sharedPortfolio: PortfolioItem[] = [
  {
    title: 'Oriflame Swedish Cosmetics',
    image: '/portfolio/oriflame.jpg',
    category: 'E-commerce',
  },
  {
    title: 'Chaitnya Loksewa',
    image: '/portfolio/chaitnya.jpg',
    category: 'E-Learning',
  },
  {
    title: 'Secured Securities',
    image: '/portfolio/secured.jpg',
    category: 'Finance',
  },
  { title: 'Asha. inc', image: '/portfolio/asha.jpg', category: 'Healthcare' },
  {
    title: 'Hardik IVF and Fertility Center',
    image: '/portfolio/hardik.jpg',
    category: 'Healthcare',
  },
];

const sharedFaqs: FAQ[] = [
  {
    question: 'What is the typical timeline?',
    answer:
      'Smaller engagements: 2-4 weeks. Larger, custom builds: 6-12+ weeks depending on scope.',
  },
  {
    question: 'Do you provide post-launch support?',
    answer:
      'Yes. Maintenance, monitoring, performance tuning, and iterative improvements are available.',
  },
  {
    question: 'Can you work with our existing stack?',
    answer:
      'We integrate with your preferred stack and infrastructure while recommending best practices.',
  },
  {
    question: 'How do you ensure quality?',
    answer:
      'Code reviews, automated testing, performance budgets, accessibility checks, and QA.',
  },
  {
    question: 'Do you handle SEO & analytics?',
    answer:
      'We set up fundamentals: structured data, performance, best-practice metadata, analytics.',
  },
];

const sharedCtaTitle = 'Let’s connect and turn your vision into reality.';
const sharedCtaDescription =
  'We are available from 9:00 AM to 6:00 PM, Monday to Friday. Reach out now!';
const sharedCtaQuestions = [
  { icon: '/services/cta/fast.svg', question: 'Is it fast and resilient?' },
  { icon: '/services/cta/secure.svg', question: 'Is it secure and monitored?' },
  {
    icon: '/services/cta/mobile.svg',
    question: 'Is it mobile friendly and accessible?',
  },
  { icon: '/services/cta/ux.svg', question: 'Does it deliver a great UX?' },
];

export const SERVICES_DETAIL: ServiceDetail[] = [
  {
    slug: 'website-development',
    title: 'Website Development',
    shortDescription:
      'Highly functional and visually appealing website designed to meet your needs.',
    longDescription:
      'Crafting Digital Excellence: Elevate Your Online Presence with Innovative Website Development Solutions. Tailored Designs, Seamless Functionality, and Future-Ready Technology – Your Journey to Success Starts Here!',
    heroImage: '/services/website-development.jpg',
    stats: {
      years: 6,
      clients: '300+',
      projects: '400+',
      team: '80+',
      guarantee: 'Satisfaction Guarantee',
    },
    features: [
      {
        icon: '/services/info/thumb_1.svg',
        title: 'Satisfaction Guarantee',
        description:
          'Elevate online presence with website development expertise.',
      },
      {
        icon: '/services/info/quality.svg',
        title: 'Best Quality work',
        description:
          'Excellence and innovation define our development solutions.',
      },
      {
        icon: '/services/info/Group_2.svg',
        title: 'Interactive Interface',
        description:
          'Create an engaging interface for a optimal user experience.',
      },
    ],
    industries: [
      {
        icon: '/services/industries/ecommerce.svg',
        title: 'E-commerce',
        description:
          'We redefine the online shopping experience through innovative e-commerce website development solutions with over six years of experience in website development.',
      },
      {
        icon: '/services/industries/travel.svg',
        title: 'Travel and Trekking',
        description:
          'We highly value experience over anything else. Therefore, we provide you with the best Travel and Trekking website development services.',
      },
      {
        icon: '/services/industries/elearning.svg',
        title: 'E-Learning',
        description:
          'We specialize in empowering education through digital solutions. Here, we are dedicated to developing Innovative e-learning website to seamlessly merge technology and education.',
      },
      {
        icon: '/services/industries/others.svg',
        title: 'Informative and Others',
        description:
          'Our website design and development services are not limited to the above-mentioned categories. We are your trusted partner for custom website design and development in Nepal.',
      },
    ],
    techStack: {
      frontend: [
        'React',
        'Next.js',
        'Vue.js',
        'Angular',
        'HTML5',
        'CSS3',
        'JavaScript',
        'TypeScript',
      ],
      backend: ['Node.js', 'Python', 'Django', 'PHP', 'Laravel', 'WordPress'],
      infrastructure: [
        'AWS',
        'Docker',
        'Digital Ocean',
        'Google Cloud',
        'Azure',
      ],
    },
    process: [
      {
        number: '01',
        title: 'Requirement Analysis',
        description:
          'We conduct a thorough analysis of your requirements to establish the foundation for your website',
        icon: '/services/process/requirement.svg',
      },
      {
        number: '02',
        title: 'Planning',
        description:
          'We make detailed plans and customized strategies to ensure a secure roadmap to success',
        icon: '/services/process/planning.svg',
      },
      {
        number: '03',
        title: 'Design (UI/UX)',
        description:
          'In this phase, we craft UI/UX aligned with your vision using best technology, ensuring best user experience',
        icon: '/services/process/design.svg',
      },
      {
        number: '04',
        title: 'Development',
        description:
          'After designing UI/UX, we implement concepts with cutting-edge programming languages and standards',
        icon: '/services/process/development.svg',
      },
      {
        number: '05',
        title: 'System Testing and QA',
        description:
          'We ensure reliability through rigorous System Testing and QA for a seamless user experience and robust website',
        icon: '/services/process/testing.svg',
      },
      {
        number: '06',
        title: 'Deployment',
        description:
          'After ensuring website quality, we launch it from prototype to fully-fledged, live for your entire audience',
        icon: '/services/process/deployment.svg',
      },
      {
        number: '07',
        title: 'Maintenance & Monitoring',
        description:
          'After deployment, we provide ongoing monitoring and support to ensure your website runs smoothly',
        icon: '/services/process/maintenance.svg',
      },
      {
        number: '08',
        title: 'Knowledge Transfer',
        description:
          'We provide training on website operations, troubleshooting, implementation, and user data access post-launch',
        icon: '/services/process/knowledge.svg',
      },
    ],
    whyChooseUs: [
      {
        icon: '/services/why/functionality.svg',
        title: 'Robust Functionality',
        description:
          'We create high-quality websites with advanced features and seamless performance for an exceptional user experience.',
      },
      {
        icon: '/services/why/client-centric.svg',
        title: 'Client-Centric Approach',
        description:
          'Our client-centric website solutions address unique needs, reflecting your vision with meticulous design precision.',
      },
      {
        icon: '/services/why/innovative.svg',
        title: 'Innovative Website Design',
        description:
          'Infusing creativity, we transform concepts into reality with user-friendly interfaces, and robust functionality.',
      },
      {
        icon: '/services/why/timely.svg',
        title: 'Timely Website Delivery',
        description:
          'We value time, ensuring your website projects meet deadlines seamlessly and establish a swift online presence.',
      },
    ],
    portfolio: [
      {
        title: 'Oriflame Swedish Cosmetics',
        image: '/portfolio/oriflame.jpg',
        category: 'E-commerce',
      },
      {
        title: 'Chaitnya Loksewa',
        image: '/portfolio/chaitnya.jpg',
        category: 'E-Learning',
      },
      {
        title: 'Secured Securities',
        image: '/portfolio/secured.jpg',
        category: 'Finance',
      },
      {
        title: 'Asha. inc',
        image: '/portfolio/asha.jpg',
        category: 'Healthcare',
      },
      {
        title: 'Hardik IVF and Fertility Center',
        image: '/portfolio/hardik.jpg',
        category: 'Healthcare',
      },
    ],
    faqs: [
      {
        question: 'What types of website development services do you offer?',
        answer:
          'We offer comprehensive website development services including custom web design, responsive development, e-commerce solutions, CMS integration, and ongoing maintenance support.',
      },
      {
        question: 'How much does it cost to develop my website?',
        answer:
          'Website development costs vary based on complexity, features, and requirements. We provide customized quotes after understanding your specific needs and project scope.',
      },
      {
        question: 'How long does it take to build a website?',
        answer:
          'The timeline depends on project complexity. A simple website typically takes 2-4 weeks, while complex e-commerce or custom solutions may take 6-12 weeks.',
      },
      {
        question: 'What is the process of website development?',
        answer:
          'Our process includes requirement analysis, planning, UI/UX design, development, testing, deployment, and ongoing maintenance with knowledge transfer.',
      },
      {
        question: 'Do you also provide website redesign services?',
        answer:
          'Yes, we offer complete website redesign services to modernize your existing website, improve functionality, and enhance user experience.',
      },
      {
        question: 'Do you develop dynamic websites?',
        answer:
          'Yes, we specialize in developing dynamic, interactive websites with content management systems, user authentication, and real-time features.',
      },
      {
        question: 'Do you develop SEO-friendly websites?',
        answer:
          'Absolutely. All our websites are built with SEO best practices, including clean code, fast loading times, mobile responsiveness, and proper meta tags.',
      },
      {
        question:
          'Do you offer support services and maintenance after development?',
        answer:
          'Yes, we provide comprehensive post-launch support including regular updates, security patches, performance monitoring, and technical assistance.',
      },
      {
        question: 'How do you ensure the security of the websites you develop?',
        answer:
          'We implement industry-standard security measures including SSL certificates, secure coding practices, regular security audits, and compliance with data protection regulations.',
      },
      {
        question: 'Do you provide domain and hosting services?',
        answer:
          'Yes, we can assist with domain registration and hosting setup. We work with reliable hosting providers and can manage hosting on your behalf.',
      },
      {
        question:
          'Do you provide content writing and graphical banners for websites?',
        answer:
          'Yes, we offer content writing and graphic design services to create engaging content and visual elements that align with your brand identity.',
      },
    ],
    ctaTitle: 'Time is Running out!',
    ctaDescription:
      "Don't miss the chance to unleash the full potential of your business with NebulaX Website Development.",
    ctaQuestions: [
      { icon: '/services/cta/fast.svg', question: 'Is your website fast?' },
      { icon: '/services/cta/secure.svg', question: 'Is your website Secure?' },
      {
        icon: '/services/cta/mobile.svg',
        question: 'Is your Website Mobile Friendly?',
      },
      {
        icon: '/services/cta/ux.svg',
        question: 'Does Your Website have good UX?',
      },
      {
        icon: '/services/cta/seo.svg',
        question: 'Is your Website optimized for SEO?',
      },
    ],
  },
  {
    slug: 'app-development',
    title: 'App Development',
    shortDescription:
      'Cross-platform mobile apps with native performance and delightful UX.',
    longDescription:
      'Design, build, and launch mobile applications that feel native, stay secure, and scale as your audience grows.',
    heroImage:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
    stats: sharedStats,
    features: sharedFeatures,
    industries: sharedIndustries,
    techStack: {
      frontend: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'TypeScript'],
      backend: sharedTechStack.backend,
      infrastructure: sharedTechStack.infrastructure,
    },
    process: sharedProcess,
    whyChooseUs: sharedWhyChooseUs,
    portfolio: sharedPortfolio,
    faqs: sharedFaqs,
    ctaTitle: sharedCtaTitle,
    ctaDescription: sharedCtaDescription,
    ctaQuestions: sharedCtaQuestions,
  },
  {
    slug: 'software-development',
    title: 'Software Development',
    shortDescription:
      'Robust platforms and internal tools tailored to your operations.',
    longDescription:
      'We build resilient back-office systems, APIs, and automation that streamline workflows and unlock efficiency.',
    heroImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop',
    stats: sharedStats,
    features: sharedFeatures,
    industries: sharedIndustries,
    techStack: sharedTechStack,
    process: sharedProcess,
    whyChooseUs: sharedWhyChooseUs,
    portfolio: sharedPortfolio,
    faqs: sharedFaqs,
    ctaTitle: sharedCtaTitle,
    ctaDescription: sharedCtaDescription,
    ctaQuestions: sharedCtaQuestions,
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    shortDescription:
      'Human-centered product design with accessibility and clarity.',
    longDescription:
      'From discovery to high-fidelity prototypes, we design experiences that are intuitive, inclusive, and on-brand.',
    heroImage:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop',
    stats: sharedStats,
    features: sharedFeatures,
    industries: sharedIndustries,
    techStack: {
      frontend: ['Figma', 'Framer', 'Sketch', 'Adobe XD', 'Design Systems'],
      backend: [],
      infrastructure: [],
    },
    process: sharedProcess,
    whyChooseUs: sharedWhyChooseUs,
    portfolio: sharedPortfolio,
    faqs: sharedFaqs,
    ctaTitle: sharedCtaTitle,
    ctaDescription: sharedCtaDescription,
    ctaQuestions: sharedCtaQuestions,
  },
  {
    slug: 'seo',
    title: 'Search Engine Optimization (SEO)',
    shortDescription:
      'Technical, on-page, and content SEO for sustainable growth.',
    longDescription:
      'Data-driven SEO programs with technical fixes, content strategy, and measurement to grow qualified traffic.',
    heroImage:
      'https://images.unsplash.com/photo-1432888622747-4eb9a8f2d93a?w=1200&h=800&fit=crop',
    stats: sharedStats,
    features: sharedFeatures,
    industries: sharedIndustries,
    techStack: {
      frontend: ['Lighthouse', 'Core Web Vitals', 'Schema.org'],
      backend: ['Analytics', 'Search Console', 'Tag Manager'],
      infrastructure: ['CDN', 'Caching', 'Image Optimization'],
    },
    process: sharedProcess,
    whyChooseUs: sharedWhyChooseUs,
    portfolio: sharedPortfolio,
    faqs: sharedFaqs,
    ctaTitle: sharedCtaTitle,
    ctaDescription: sharedCtaDescription,
    ctaQuestions: sharedCtaQuestions,
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing (SMM)',
    shortDescription:
      'Campaigns that build community, engagement, and measurable ROI.',
    longDescription:
      'Strategy, creative, and performance optimization across channels to grow audience and conversions.',
    heroImage:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop',
    stats: sharedStats,
    features: sharedFeatures,
    industries: sharedIndustries,
    techStack: {
      frontend: ['Canva', 'Figma', 'Adobe CC'],
      backend: [
        'Meta Business Suite',
        'LinkedIn Campaign Manager',
        'Analytics',
      ],
      infrastructure: ['CDN', 'Automation', 'Scheduling'],
    },
    process: sharedProcess,
    whyChooseUs: sharedWhyChooseUs,
    portfolio: sharedPortfolio,
    faqs: sharedFaqs,
    ctaTitle: sharedCtaTitle,
    ctaDescription: sharedCtaDescription,
    ctaQuestions: sharedCtaQuestions,
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    shortDescription:
      'Brand-aligned visuals, campaigns, and marketing collateral.',
    longDescription:
      'Design systems, campaign assets, and on-brand visuals that communicate clearly across touchpoints.',
    heroImage:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop',
    stats: sharedStats,
    features: sharedFeatures,
    industries: sharedIndustries,
    techStack: {
      frontend: ['Figma', 'Adobe Illustrator', 'Photoshop', 'After Effects'],
      backend: [],
      infrastructure: [],
    },
    process: sharedProcess,
    whyChooseUs: sharedWhyChooseUs,
    portfolio: sharedPortfolio,
    faqs: sharedFaqs,
    ctaTitle: sharedCtaTitle,
    ctaDescription: sharedCtaDescription,
    ctaQuestions: sharedCtaQuestions,
  },
  {
    slug: 'content-writing',
    title: 'Content Writing',
    shortDescription:
      'Strategic content that informs, persuades, and converts.',
    longDescription:
      'From web copy to thought leadership, we craft content with brand voice, clarity, and SEO in mind.',
    heroImage:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=800&fit=crop',
    stats: sharedStats,
    features: sharedFeatures,
    industries: sharedIndustries,
    techStack: {
      frontend: ['SEO Copy', 'UX Writing', 'Content Design'],
      backend: ['CMS Workflow', 'Editorial Calendar'],
      infrastructure: ['Analytics', 'A/B Testing'],
    },
    process: sharedProcess,
    whyChooseUs: sharedWhyChooseUs,
    portfolio: sharedPortfolio,
    faqs: sharedFaqs,
    ctaTitle: sharedCtaTitle,
    ctaDescription: sharedCtaDescription,
    ctaQuestions: sharedCtaQuestions,
  },
];

export const getServiceBySlug = (slug: string): ServiceDetail | undefined => {
  return SERVICES_DETAIL.find((service) => service.slug === slug);
};

export const getAllServiceSlugs = (): string[] => {
  return SERVICES_DETAIL.map((service) => service.slug);
};
