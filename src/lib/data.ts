import type { FreelancerProfile, JobPosting } from './types';
import { PlaceHolderImages } from './placeholder-images';

const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

export const freelancerProfile: FreelancerProfile = {
  id: 'fp_001',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  title: 'Senior Frontend Developer',
  avatarUrl: userAvatar?.imageUrl ?? 'https://picsum.photos/seed/user-avatar/40/40',
  skills: [
    'React',
    'TypeScript',
    'Next.js',
    'Tailwind CSS',
    'Node.js',
    'GraphQL',
  ],
  experience: `
With over 8 years of experience in frontend development, I specialize in building modern, responsive, and performant web applications using the React ecosystem. 
I have a strong command of TypeScript and Next.js for server-side rendering and static site generation. 
My expertise includes state management with Redux and Zustand, API integration using REST and GraphQL, and creating beautiful UIs with Tailwind CSS and Styled Components.
I have led frontend teams, mentored junior developers, and collaborated closely with designers and backend engineers to deliver high-quality products.
I am passionate about clean code, accessibility, and creating exceptional user experiences.
  `.trim(),
  portfolioUrl: 'https://example.com',
};

export const jobPostings: JobPosting[] = [
  {
    id: 'job_001',
    title: 'React Developer for E-commerce Platform',
    company: 'Shopify',
    description:
      'We are looking for a skilled React Developer to join our team building a next-generation e-commerce platform. You will be responsible for developing new user-facing features, building reusable components, and optimizing applications for maximum speed and scalability.',
    requiredSkills: ['React', 'Redux', 'JavaScript', 'HTML', 'CSS'],
    preferredSkills: ['TypeScript', 'Next.js', 'GraphQL'],
    experienceLevel: 'Mid',
    location: 'Remote',
    salaryRange: '$90k - $120k',
    postedAt: '2 days ago',
  },
  {
    id: 'job_002',
    title: 'Senior Next.js Engineer',
    company: 'Vercel',
    description:
      'Join the team behind Next.js to work on cutting-edge features for the framework and our platform. We need an experienced engineer with deep knowledge of React, Next.js, and web performance.',
    requiredSkills: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Web Performance',
    ],
    preferredSkills: ['Rust', 'Go'],
    experienceLevel: 'Senior',
    location: 'Remote',
    salaryRange: '$150k - $200k',
    postedAt: '5 days ago',
  },
  {
    id: 'job_003',
    title: 'Full-Stack Developer (Vue.js)',
    company: 'GitLab',
    description:
      'We are seeking a Full-Stack Developer with expertise in Vue.js and Ruby on Rails. You will contribute to all aspects of our product, from backend services to frontend components.',
    requiredSkills: ['Vue.js', 'Ruby on Rails', 'PostgreSQL', 'JavaScript'],
    experienceLevel: 'Mid',
    location: 'Remote',
    postedAt: '1 week ago',
  },
  {
    id: 'job_004',
    title: 'UI/UX Designer & Developer',
    company: 'InVision',
    description:
      'A hybrid role for a talented individual who can both design beautiful user interfaces and bring them to life with code. Strong skills in Figma, HTML, CSS, and JavaScript are required.',
    requiredSkills: [
      'Figma',
      'UI Design',
      'UX Research',
      'HTML',
      'CSS',
      'JavaScript',
    ],
    preferredSkills: ['React', 'Design Systems'],
    experienceLevel: 'Mid',
    location: 'Remote',
    postedAt: '3 days ago',
  },
  {
    id: 'job_005',
    title: 'Junior Frontend Developer',
    company: 'Startup Inc.',
    description:
      'Eager to learn and grow? We are looking for a junior developer to assist our senior team. You will work on various parts of our web app, learn best practices, and contribute to a fast-paced environment. Basic knowledge of HTML, CSS, and JavaScript is a must.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript'],
    preferredSkills: ['React', 'Git'],
    experienceLevel: 'Junior',
    location: 'New York, NY',
    postedAt: '1 day ago',
  },
];
