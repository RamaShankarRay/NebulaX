export type JobCategory =
  | 'development'
  | 'management'
  | 'design'
  | 'marketing'
  | 'all';

export interface JobRequirement {
  text: string;
}

export interface JobResponsibility {
  text: string;
}

export interface JobBenefit {
  text: string;
}

export interface JobDetail {
  slug: string;
  title: string;
  category: JobCategory;
  functionalTitle: string;
  corporateTitle: string;
  vacancies: number;
  postedDate: string;
  shortDescription: string;
  fullDescription: string;
  requirements: JobRequirement[];
  responsibilities: JobResponsibility[];
  benefits: JobBenefit[];
  contactEmail: string;
}

export const JOBS: JobDetail[] = [
  {
    slug: 'react-nextjs-developer',
    title: 'React / Next Js Developer',
    category: 'development',
    functionalTitle: 'Development Team',
    corporateTitle: 'Development',
    vacancies: 1,
    postedDate: '2025/11/12',
    shortDescription:
      "Join our dynamic team as a React Developer and help us build cutting-edge web applications. As a key member, you will design and develop responsive user interfaces using React.js, collaborate closely with our backend engineers, and contribute to the overall architecture and performance of our software solutions. If you're passionate about creating seamless user experiences and staying ahead in front-end development trends, we'd love to hear from you!",
    fullDescription:
      "Join our dynamic team as a React Developer and help us build cutting-edge web applications. As a key member, you will design and develop responsive user interfaces using React.js, collaborate closely with our backend engineers, and contribute to the overall architecture and performance of our software solutions. If you're passionate about creating seamless user experiences and staying ahead in front-end development trends, we'd love to hear from you!",
    requirements: [
      { text: '2+ years of work experience with React.js and Next.js.' },
      { text: 'Proficiency in JavaScript/TypeScript programming language.' },
      {
        text: 'Experience building responsive web applications using React framework.',
      },
      { text: 'Familiarity with RESTful APIs and asynchronous programming.' },
      {
        text: 'Knowledge of state management using Redux, Zustand, or Context API.',
      },
      {
        text: 'Understanding of modern UI/UX best practices and responsive design.',
      },
      { text: 'Ability to write clean, modular, and maintainable code.' },
      { text: 'Familiarity with version control systems such as Git.' },
      { text: 'Experience with third-party libraries and APIs integration.' },
      { text: 'Strong problem-solving skills and attention to detail.' },
      {
        text: 'Ability to work collaboratively in a team environment and effectively communicate ideas.',
      },
    ],
    responsibilities: [
      {
        text: 'Design and build advanced web applications for multiple platforms using React and Next.js.',
      },
      {
        text: 'Collaborate with cross-functional teams to define, design, and ship new features.',
      },
      {
        text: 'Work with outside data sources and APIs, integrating them with React applications.',
      },
      {
        text: 'Unit-test code for robustness, including edge cases, usability, and general reliability.',
      },
      {
        text: 'Continuously discover, evaluate, and implement new technologies to maximize development efficiency.',
      },
      { text: 'Translate designs and wireframes into high-quality code.' },
      {
        text: 'Optimize performance for web applications and ensure responsiveness.',
      },
      {
        text: 'Maintain code integrity and organization through version control and code reviews.',
      },
      {
        text: 'Troubleshoot and debug issues to improve application performance and stability.',
      },
      {
        text: 'Stay updated with React, Next.js and related web development trends and technologies.',
      },
    ],
    benefits: [
      {
        text: 'Dynamic and collaborative work environment with talented peers.',
      },
      { text: 'Competitive salary' },
      { text: 'Opportunities for professional development and growth.' },
      { text: 'Free daily lunches provided in-office for all team members' },
    ],
    contactEmail: 'career@nebulax.com',
  },
  {
    slug: 'flutter-developer',
    title: 'Flutter Developer',
    category: 'development',
    functionalTitle: 'Development Team',
    corporateTitle: 'Development',
    vacancies: 1,
    postedDate: '2025/11/12',
    shortDescription:
      "Join our team as a Flutter Developer and be at the forefront of mobile app development. You'll leverage your expertise in Dart and Flutter to build sleek, cross-platform applications that delight users. Whether you're passionate about crafting intuitive user interfaces or optimizing app performance, we offer a collaborative environment where your skills can shine. If you're ready to innovate and contribute to cutting-edge mobile solutions, apply now and help shape the future of app development!",
    fullDescription: 'We are hiring a Flutter Developer to join our team.',
    requirements: [
      { text: '2+ years of work experience with Flutter.' },
      { text: 'Proficiency in Dart programming language.' },
      {
        text: 'Experience building mobile applications using Flutter framework.',
      },
      { text: 'Familiarity with RESTful APIs and asynchronous programming.' },
      {
        text: 'Knowledge of state management using providers like Riverpod or Redux.',
      },
      {
        text: 'Understanding of Material Design principles and UI/UX best practices.',
      },
      { text: 'Ability to write clean, modular, and maintainable code.' },
      { text: 'Familiarity with version control systems such as Git.' },
      { text: 'Experience with third-party libraries and APIs integration.' },
      { text: 'Strong problem-solving skills and attention to detail.' },
      {
        text: 'Ability to work collaboratively in a team environment and effectively communicate ideas.',
      },
    ],
    responsibilities: [
      {
        text: 'Design and build advanced applications for the Android and iOS platforms using Flutter.',
      },
      {
        text: 'Collaborate with cross-functional teams to define, design, and ship new features.',
      },
      {
        text: 'Work with outside data sources and APIs, integrating them with Flutter applications.',
      },
      {
        text: 'Unit-test code for robustness, including edge cases, usability, and general reliability.',
      },
      {
        text: 'Continuously discover, evaluate, and implement new technologies to maximize development efficiency.',
      },
      { text: 'Translate designs and wireframes into high-quality code.' },
      {
        text: 'Optimize performance for mobile devices and ensure responsiveness.',
      },
      {
        text: 'Maintain code integrity and organization through version control and code reviews.',
      },
      {
        text: 'Troubleshoot and debug issues to improve application performance and stability.',
      },
      {
        text: 'Stay updated with Flutter and related mobile app development trends and technologies.',
      },
    ],
    benefits: [
      {
        text: 'Dynamic and collaborative work environment with talented peers.',
      },
      { text: 'Competitive salary' },
      { text: 'Opportunities for professional development and growth.' },
      { text: 'Free daily lunches provided in-office for all team members' },
    ],
    contactEmail: 'career@nebulax.com',
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'design',
    functionalTitle: 'Design Team',
    corporateTitle: 'Design',
    vacancies: 1,
    postedDate: '2025/11/12',
    shortDescription:
      'We are seeking a UI/UX Designer to create intuitive, user-friendly digital experiences. You will assist in wireframing, prototyping, and designing UI for web and mobile apps while collaborating with developers to ensure seamless user interactions.',
    fullDescription:
      'We are seeking a UI/UX Designer to create intuitive, user-friendly digital experiences. You will assist in wireframing, prototyping, and designing UI for web and mobile apps while collaborating with developers to ensure seamless user interactions.',
    requirements: [
      { text: '2+ years of experience in UI/UX design.' },
      {
        text: 'Proficiency in design tools such as Figma, Adobe XD, or Sketch.',
      },
      { text: 'Strong portfolio showcasing web and mobile app designs.' },
      { text: 'Understanding of user-centered design principles.' },
      { text: 'Experience with wireframing and prototyping.' },
      { text: 'Knowledge of responsive design and mobile-first approach.' },
      {
        text: 'Ability to collaborate effectively with developers and stakeholders.',
      },
      { text: 'Strong attention to detail and problem-solving skills.' },
    ],
    responsibilities: [
      {
        text: 'Create wireframes, prototypes, and high-fidelity designs for web and mobile applications.',
      },
      {
        text: 'Collaborate with product managers and developers to define and implement design solutions.',
      },
      { text: 'Conduct user research and usability testing.' },
      { text: 'Develop and maintain design systems and style guides.' },
      {
        text: 'Ensure designs are implemented accurately by working closely with development teams.',
      },
      { text: 'Stay updated with design trends and best practices.' },
    ],
    benefits: [
      {
        text: 'Dynamic and collaborative work environment with talented peers.',
      },
      { text: 'Competitive salary' },
      { text: 'Opportunities for professional development and growth.' },
      { text: 'Free daily lunches provided in-office for all team members' },
    ],
    contactEmail: 'career@nebulax.com',
  },
  {
    slug: 'admin',
    title: 'Admin',
    category: 'management',
    functionalTitle: 'Management Team',
    corporateTitle: 'Management',
    vacancies: 1,
    postedDate: '2025/12/04',
    shortDescription: 'We are hiring an admin to join our team.',
    fullDescription: 'We are hiring an admin to join our team.',
    requirements: [
      { text: 'Experience in administrative roles.' },
      { text: 'Strong organizational and communication skills.' },
      { text: 'Proficiency in office software and tools.' },
    ],
    responsibilities: [
      { text: 'Handle administrative tasks and office management.' },
      { text: 'Coordinate with different departments.' },
      { text: 'Maintain records and documentation.' },
    ],
    benefits: [
      {
        text: 'Dynamic and collaborative work environment with talented peers.',
      },
      { text: 'Competitive salary' },
      { text: 'Opportunities for professional development and growth.' },
    ],
    contactEmail: 'career@nebulax.com',
  },
];

export const JOB_CATEGORIES = [
  { id: 'all' as JobCategory, label: 'All' },
  { id: 'development' as JobCategory, label: 'Development' },
  { id: 'design' as JobCategory, label: 'Design' },
  { id: 'management' as JobCategory, label: 'Management' },
  { id: 'marketing' as JobCategory, label: 'Marketing' },
] as const;

export const getJobBySlug = (slug: string): JobDetail | undefined => {
  return JOBS.find((job) => job.slug === slug);
};

export const getAllJobSlugs = (): string[] => {
  return JOBS.map((job) => job.slug);
};

export const getFilteredJobs = (category: JobCategory): JobDetail[] => {
  if (category === 'all') {
    return JOBS;
  }
  return JOBS.filter((job) => job.category === category);
};
