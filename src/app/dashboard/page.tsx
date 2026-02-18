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

  // Fetch real user profile from Firestore
  const profileRef = useMemoFirebase(() => (user ? doc(db, 'freelancers', user.uid) : null), [db, user]);
  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  // Fetch real job postings from Firestore
  const jobsQuery = useMemoFirebase(() => collection(db, 'jobPostings'), [db]);
  const { data: rawJobs, isLoading: isJobsLoading } = useCollection(jobsQuery);

  // Seed sample data if the collection is empty (for demo purposes)
  const handleSeedData = async () => {
    const sampleJobs = [
      {
        id: 'sample_1',
        title: 'Generative UI Architect',
        company: 'Neural Labs',
        description: 'Build adaptive interfaces that react to LLM state changes.',
        requiredSkills: ['React', 'Next.js', 'Tailwind'],
        experienceLevel: 'Senior',
        location: 'Remote',
        postedAt: 'Just now'
      },
      {
        id: 'sample_2',
        title: 'AI Prompt Engineer',
        company: 'OpenLogic',
        description: 'Optimize prompt chains for high-throughput enterprise applications.',
        requiredSkills: ['Python', 'LLMs', 'Prompt Engineering'],
        experienceLevel: 'Mid',
        location: 'Hybrid',
        postedAt: '1h ago'
      }
    ];

    for (const job of sampleJobs) {
      await setDoc(doc(db, 'jobPostings', job.id), job);
    }
  };

  // Calculate matches when profile and jobs are ready
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

  // If no profile exists, show onboarding
  if (!profile) {
    return <OnboardingWizard onComplete={() => window.location.reload()} />;
  }

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeader
          title={`Welcome, ${profile.firstName || user?.displayName || 'Expert'}`}
          subtitle="Your intelligence matches are synced and ready."
        />
        <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-600 border border-indigo-200 px-4 py-2 rounded-full">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Sync Integrity: 98.4%</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-2 border-indigo-500/10 bg-indigo-500/[0.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Neural Intelligence Note</CardTitle>
            <Brain className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <p className="text-base font-medium mb-4">
              "We've detected a shift in the market toward <strong>Multi-Agent Orchestration</strong>. Your React skills are a 92% match for these upcoming roles. Consider updating your bio to highlight backend API integration."
            </p>
            <Button variant="secondary" size="sm" className="rounded-full">Update Context</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Market Pulse</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Demand for {profile.skills?.[0] || 'AI'}</span>
              <span className="font-bold text-green-500">+12%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Your Global Rank</span>
              <span className="font-bold">Top 2%</span>
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
              placeholder="Filter opportunity database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-xl"
            />
          </div>
          <Button className="h-12 px-8 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-700">Filter Matches</Button>
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
              <h3 className="text-xl font-bold">The Hub is Quiet</h3>
              <p className="text-muted-foreground">No jobs currently exist in the database.</p>
            </div>
            <Button onClick={handleSeedData} className="rounded-full px-8">Seed Sample Hub Data</Button>
          </div>
        )}
      </div>
    </div>
  );
}
