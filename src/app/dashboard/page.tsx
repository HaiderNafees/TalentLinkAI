'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import JobCard from '@/components/job-card';
import PageHeader from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, Brain, TrendingUp, Loader2, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getJobMatch } from '@/lib/actions';
import { OnboardingWizard } from '@/components/onboarding-wizard';
import { useDoc } from '@/firebase';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const [searchQuery, setSearchQuery] = useState('');
  const [matchedJobs, setMatchedJobs] = useState<any[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const profileRef = useMemoFirebase(() => (user ? doc(db, 'freelancers', user.uid) : null), [db, user]);
  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  const jobsQuery = useMemoFirebase(() => collection(db, 'jobPostings'), [db]);
  const { data: rawJobs, isLoading: isJobsLoading } = useCollection(jobsQuery);

  const handleSeedData = async () => {
    const sampleJobs = [
      {
        id: 'sample_1',
        title: 'Full-Stack Developer (Next.js)',
        company: 'Vanguard Systems',
        description: 'Design and implement high-performance web applications using the latest React patterns and Next.js App Router.',
        requiredSkills: ['React', 'Next.js', 'Tailwind'],
        experienceLevel: 'Senior',
        location: 'Remote',
        postedAt: 'Just now'
      },
      {
        id: 'sample_2',
        title: 'AI Solutions Specialist',
        company: 'Cognitive Labs',
        description: 'Develop and fine-tune complex prompt chains and integrate LLMs into production-grade enterprise software.',
        requiredSkills: ['Python', 'LLMs', 'API Integration'],
        experienceLevel: 'Mid',
        location: 'Hybrid',
        postedAt: '1h ago'
      }
    ];

    for (const job of sampleJobs) {
      await setDoc(doc(db, 'jobPostings', job.id), job);
    }
  };

  useEffect(() => {
    async function runMatching() {
      if (!profile || !rawJobs || rawJobs.length === 0) return;
      
      setIsMatching(true);
      try {
        const jobsWithScores = await Promise.all(
          rawJobs.map(async (job) => {
            const match = await getJobMatch({
              freelancerProfile: {
                skills: profile.skills || [],
                experience: profile.experience || '',
              },
              jobPosting: {
                title: job.title,
                description: job.description,
                requiredSkills: job.requiredSkills || [],
                experienceLevel: job.experienceLevel,
              },
            });
            return { ...job, ...match };
          })
        );
        setMatchedJobs(jobsWithScores.sort((a, b) => b.matchScore - a.matchScore));
      } finally {
        setIsMatching(false);
      }
    }

    runMatching();
  }, [profile, rawJobs]);

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return <OnboardingWizard onComplete={() => window.location.reload()} />;
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeader
          title={`Hello, ${profile.firstName || 'Expert'}`}
          subtitle="Your personalized project matches are listed below."
        />
        <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-600 border border-indigo-200 px-4 py-2 rounded-full">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Profile Status: Sync Active</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-2 border-indigo-500/10 bg-indigo-500/[0.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Market Insight</CardTitle>
            <Brain className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium mb-4">
              "We've identified a growing demand for <strong>Distributed Systems Architecture</strong> in your region. Your technical profile is a strong match for upcoming elite projects."
            </p>
            <Button variant="secondary" size="sm" className="rounded-full">View Industry Trends</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Network Pulse</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Skill Demand</span>
              <span className="font-bold text-green-500">+12%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Profile Visibility</span>
              <span className="font-bold">Active</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[85%]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search available projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
          <Button className="h-12 px-8 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700">Advanced Filter</Button>
        </div>

        {isJobsLoading || isMatching ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[300px] rounded-[32px] bg-secondary/50 animate-pulse border border-dashed" />
            ))}
          </div>
        ) : matchedJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {matchedJobs
              .filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary/20 rounded-[40px] border-2 border-dashed space-y-4">
            <Database className="h-12 w-12 text-muted-foreground mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">No Projects Found</h3>
              <p className="text-muted-foreground">The project hub is currently empty. Start by adding sample data for the demo.</p>
            </div>
            <Button onClick={handleSeedData} className="rounded-full px-8 bg-indigo-600">Populate Sample Hub</Button>
          </div>
        )}
      </div>
    </div>
  );
}
