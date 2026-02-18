import { freelancerProfile, jobPostings } from '@/lib/data';
import { getJobMatch } from '@/lib/actions';
import JobCard from '@/components/job-card';
import PageHeader from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, Brain, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const revalidate = 0;

export default async function DashboardPage() {
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

  const sortedJobs = jobsWithMatches.sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeader
          title="Intelligence Hub"
          subtitle="Real-time precision matches based on your neural profile."
        />
        <div className="flex items-center gap-2 bg-secondary border px-4 py-2 rounded-full">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Sync: 98%</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">AI Gig Assistant</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium mb-4">
              "Based on the 24% surge in 'Generative UI' roles, consider adding 'Adaptive Design Systems' to your profile to increase match accuracy for top-tier Vercel roles."
            </p>
            <Button variant="secondary" size="sm" className="rounded-full">Apply Suggestion</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Market Pulse</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">AI Demand</span>
              <span className="font-bold">+31%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Avg. Rate</span>
              <span className="font-bold">$145/hr</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[85%]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search opportunity database..."
              className="pl-10 h-12 rounded-xl"
            />
          </div>
          <Button className="h-12 px-8 rounded-xl font-semibold">Filter Matches</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {sortedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}