import { freelancerProfile, jobPostings } from '@/lib/data';
import { getJobMatch } from '@/lib/actions';
import JobCard from '@/components/job-card';
import PageHeader from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const revalidate = 0; // Ensure dynamic rendering

export default async function DashboardPage() {
  // In a real app, you'd filter jobs here based on search/filters
  const jobs = jobPostings;

  const jobsWithMatches = await Promise.all(
    jobs.map(async (job) => {
      const matchResult = await getJobMatch({
        freelancerProfile: {
          skills: freelancerProfile.skills,
          experience: freelancerProfile.experience,
        },
        jobPosting: {
          title: job.title,
          description: job.description,
          requiredSkills: job.requiredSkills,
          preferredSkills: job.preferredSkills,
          experienceLevel: job.experienceLevel,
        },
      });
      return { ...job, ...matchResult };
    })
  );

  // Sort jobs by match score, descending
  const sortedJobs = jobsWithMatches.sort(
    (a, b) => b.matchScore - a.matchScore
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Job Recommendations"
        subtitle="AI-powered matches based on your profile"
      />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, company, or skill..."
            className="pl-10"
          />
        </div>
        <Button>Search</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {sortedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
