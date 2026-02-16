export type FreelancerProfile = {
  id: string;
  name: string;
  email: string;
  title: string;
  avatarUrl: string;
  skills: string[];
  experience: string;
  portfolioUrl?: string;
};

export type JobPosting = {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  preferredSkills?: string[];
  experienceLevel: 'Junior' | 'Mid' | 'Senior';
  location: string;
  salaryRange?: string;
  postedAt: string;
};
