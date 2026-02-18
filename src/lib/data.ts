import type { FreelancerProfile, JobPosting } from './types';
import { PlaceHolderImages } from './placeholder-images';

const userAvatar = PlaceHolderImages.find((p) => p.id === 'user-avatar');

export const freelancerProfile: FreelancerProfile = {
  id: 'fp_001',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  title: 'Senior AI-First Frontend Engineer',
  avatarUrl: userAvatar?.imageUrl ?? 'https://picsum.photos/seed/user-avatar/40/40',
  skills: [
    'React',
    'TypeScript',
    'Next.js',
    'Generative UI',
    'Tailwind CSS',
    'Genkit',
    'Vercel AI SDK',
  ],
  experience: `
8+ years building intelligent user interfaces. I specialize in bridging the gap between complex AI backends and seamless user experiences. 
Expert in building GenAI-powered applications using React, Next.js, and Genkit. 
I focus on the "Double-Sided AI" approach: making tools that are as smart as they are beautiful. 
Led teams at high-growth startups to implement AI-driven dashboarding and automated workflow optimization.
  `.trim(),
  portfolioUrl: 'https://example.com',
};

export const jobPostings: JobPosting[] = [
  {
    id: 'job_001',
    title: 'Generative UI Engineer',
    company: 'Anthropic (via Outlier)',
    description:
      'We need a pioneer to build our next generation of dynamic, AI-rendered interfaces. You will work on components that morph based on LLM output and context. High emphasis on performance and clean React architecture.',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel AI SDK'],
    preferredSkills: ['Next.js', 'Framer Motion'],
    experienceLevel: 'Senior',
    location: 'Remote',
    salaryRange: '$180k - $240k',
    postedAt: '2h ago',
  },
  {
    id: 'job_002',
    title: 'Senior Full-Stack AI Engineer',
    company: 'Vercel',
    description:
      'Help us shape the future of AI on the web. You will build core platform features that integrate GenAI directly into the developer workflow. Deep knowledge of Next.js and edge runtimes is mandatory.',
    requiredSkills: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Vector Databases',
    ],
    preferredSkills: ['Rust', 'Python'],
    experienceLevel: 'Senior',
    location: 'Remote',
    salaryRange: '$160k - $210k',
    postedAt: '5h ago',
  },
  {
    id: 'job_003',
    title: 'Product Designer (AI Focus)',
    company: 'Linear',
    description:
      'Design the intelligent project management interface of the future. We are looking for someone who understands how AI can reduce cognitive load without cluttering the UI.',
    requiredSkills: ['Figma', 'UI/UX Design', 'Prototyping'],
    preferredSkills: ['React', 'Spline'],
    experienceLevel: 'Mid',
    location: 'Remote',
    postedAt: '1d ago',
  },
  {
    id: 'job_004',
    title: 'Frontend Lead - AI Dashboards',
    company: 'OpenAI (Contract)',
    description:
      'Leading a short-term, high-impact project to visualize complex neural network outputs for enterprise customers. Must be a master of D3.js and React.',
    requiredSkills: [
      'React',
      'D3.js',
      'TypeScript',
      'Data Visualization',
    ],
    preferredSkills: ['Three.js'],
    experienceLevel: 'Senior',
    location: 'Remote',
    postedAt: '3d ago',
  },
];
