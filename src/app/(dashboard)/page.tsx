import { freelancerProfile, jobPostings } from '@/lib/data';
import { getJobMatch } from '@/lib/actions';
import JobCard from '@/components/job-card';
import PageHeader from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const revalidate = 0; // Ensure dynamic rendering

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

  const sortedJobs = jobsWithMatches.sort(
    (a, b) => b.matchScore - a.matchScore
  );

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeader
          title="AI Intelligence Hub"
          subtitle="Precision matches and creative gig ideas for your profile"
        />
        <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-sm font-bold text-accent">Profile Training: 94%</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">AI Gig Ideator</CardTitle>
            <Lightbulb className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Based on current market trends, here's a "Gig Idea" you should pitch to your top matches:
            </p>
            <div className="bg-background border rounded-xl p-4 italic text-sm text-foreground/80 leading-relaxed">
              "Offer an 'AI-Performance Audit' as a value-add. Clients in the E-commerce sector are currently 40% more likely to hire developers who can optimize for AI-driven SEO."
            </div>
            <Button className="mt-4 w-full md:w-auto" variant="outline" size="sm">
              Explore More Ideas
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">Market Pulse</CardTitle>
            <TrendingUp className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Demand for Next.js</span>
              <span className="font-bold text-green-500">+24%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Avg. Hourly Rate</span>
              <span className="font-bold">$125/hr</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent w-[80%]" />
            </div>
            <p className="text-[10px] text-muted-foreground text-center italic">
              AI suggests adding "Generative UI" to your skills.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search AI curated opportunities..."
              className="pl-10 h-12 bg-card"
            />
          </div>
          <Button className="h-12 px-8">Filter by Match Score</Button>
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
