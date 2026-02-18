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
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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

  const handleSeedData = () => {
    if (!db) return;
    const sampleJobs = [
      {
        id: 'job_1',
        title: 'Full-Stack Developer (Next.js)',
        company: 'Vanguard Systems',
        description: 'Lead the development of a performance-critical SaaS platform using Next.js 15, React 19, and advanced edge caching strategies.',
        requiredSkills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
        experienceLevel: 'Senior',
        location: 'Remote',
        postedAt: 'Just now'
      },
      {
        id: 'job_2',
        title: 'GenAI Solution Architect',
        company: 'Cognitive Labs',
        description: 'Design and optimize large-scale prompt orchestration frameworks for enterprise customers. Deep understanding of LLM latency and context windows required.',
        requiredSkills: ['Python', 'LLMs', 'System Architecture', 'API Integration'],
        experienceLevel: 'Senior',
        location: 'Hybrid (NYC)',
        postedAt: '2h ago'
      },
      {
        id: 'job_3',
        title: 'Frontend Engineer (UI Performance)',
        company: 'Nexus Flow',
        description: 'Build polished, high-fidelity user interfaces. Focus on Framer Motion animations and optimizing Core Web Vitals.',
        requiredSkills: ['React', 'Tailwind', 'Animations', 'Web Performance'],
        experienceLevel: 'Mid',
        location: 'Remote',
        postedAt: '4h ago'
      }
    ];

    sampleJobs.forEach(job => {
      const jobDoc = doc(db, 'jobPostings', job.id);
      setDoc(jobDoc, job, { merge: true })
        .catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: jobDoc.path,
            operation: 'create',
            requestResourceData: job,
          }));
        });
    });
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
                skills: profile.skillIds || [],
                experience: profile.bio || '',
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

  const filteredJobs = matchedJobs.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    j.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <PageHeader
          title={`Welcome back, ${profile.firstName || 'Expert'}`}
          subtitle="Real-time precision matches based on your professional DNA."
        />
        <div className="flex items-center gap-2 bg-indigo-500/10 text-indigo-600 border border-indigo-200 px-4 py-2 rounded-full">
          <Sparkles className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Neural Sync: Active</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-none shadow-xl bg-gradient-to-br from-indigo-500/[0.05] to-purple-500/[0.05]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">AI Intelligence Brief</CardTitle>
            <Brain className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium mb-4 leading-relaxed">
              "We've detected a significant surge in <strong>Full-Stack TypeScript</strong> roles within your primary market. Your profile is currently positioned in the top 2% of matched candidates."
            </p>
            <Button variant="secondary" size="sm" className="rounded-full font-bold px-6">Explore Trends</Button>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Market Sync</CardTitle>
            <TrendingUp className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Skill Demand</span>
              <span className="font-bold text-green-500">+18%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Profile Sync</span>
              <span className="font-bold">Optimized</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden mt-2">
              <div className="h-full bg-indigo-600 w-[92%] rounded-full shadow-lg" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search opportunity database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-[20px] bg-background border-none shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
          </div>
          <Button className="h-14 px-8 rounded-[20px] font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">Advanced Filter</Button>
        </div>

        {isJobsLoading || isMatching ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[350px] rounded-[32px] bg-secondary/30 animate-pulse border border-dashed border-muted" />
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-secondary/[0.15] rounded-[48px] border-2 border-dashed border-indigo-200/50 space-y-6">
            <div className="h-16 w-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-500 mx-auto shadow-sm">
              <Database className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">Intelligence Hub Empty</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">The project repository is currently awaiting sync. Use the protocol below to populate demo data.</p>
            </div>
            <Button onClick={handleSeedData} className="rounded-full px-10 h-12 bg-indigo-600 font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-500/20">
              Populate Opportunity Hub
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
