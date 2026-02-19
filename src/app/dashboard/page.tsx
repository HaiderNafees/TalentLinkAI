'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase, useDoc } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import JobCard from '@/components/job-card';
import PageHeader from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, Brain, TrendingUp, Loader2, Plus, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getJobMatch } from '@/lib/actions';
import { OnboardingWizard } from '@/components/onboarding-wizard';

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
    if (!db || !user) return;
    
    const sampleJobs = [
      {
        id: 'job_sample_1',
        clientId: user.uid,
        title: 'Full-Stack Developer (Next.js)',
        company: 'Vanguard Systems',
        description: 'Lead the development of a performance-critical SaaS platform using Next.js 15 and React 19. Experience with real-time systems preferred.',
        requiredSkills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
        budgetAmount: 12000,
        budgetCurrency: 'USD',
        jobType: 'Fixed-price',
        locationRequirement: 'Remote',
        postedDate: new Date().toISOString(),
        status: 'Open',
        experienceLevel: 'Senior',
        location: 'Remote',
        postedAt: 'Just now'
      },
      {
        id: 'job_sample_2',
        clientId: user.uid,
        title: 'Solution Architect',
        company: 'Cognitive Labs',
        description: 'Design and optimize large-scale orchestration frameworks for enterprise customers. Focus on security and scalability.',
        requiredSkills: ['Python', 'System Architecture', 'API Integration', 'Cloud Native'],
        budgetAmount: 150,
        budgetCurrency: 'USD',
        jobType: 'Hourly',
        locationRequirement: 'Hybrid (NYC)',
        postedDate: new Date().toISOString(),
        status: 'Open',
        experienceLevel: 'Senior',
        location: 'Hybrid (NYC)',
        postedAt: '2h ago'
      }
    ];

    sampleJobs.forEach(job => {
      setDoc(doc(db, 'jobPostings', job.id), job, { merge: true });
    });
  };

  useEffect(() => {
    async function runMatching() {
      if (!profile || !rawJobs || rawJobs.length === 0) {
        setMatchedJobs([]);
        return;
      }
      
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
      <div className="flex h-[80svh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600/50" />
      </div>
    );
  }

  if (!profile) {
    return <OnboardingWizard onComplete={() => window.location.reload()} />;
  }

  const filteredJobs = matchedJobs.filter(j => 
    j.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    j.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <PageHeader
          title={`Professional Hub`}
          subtitle={`Welcome back, ${profile.firstName}. Your workspace is fully synchronized.`}
        />
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-indigo-50 border border-indigo-100/50 shadow-sm transition-all hover:shadow-md">
          <div className="relative">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-indigo-400 rounded-full animate-ping" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-700">Hub Active</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-none shadow-xl shadow-indigo-900/5 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-[40px] overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between p-10 pb-4">
            <CardTitle className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-100/70">Intelligence Insight</CardTitle>
            <Brain className="h-6 w-6 text-indigo-200/50 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent className="p-10 pt-4">
            <p className="text-2xl font-bold mb-6 leading-tight max-w-lg">
              Synchronizing your <span className="text-indigo-200">{profile.skillIds?.[0] || 'Technical Capabilities'}</span> with current network project requirements.
            </p>
            <Button variant="secondary" className="rounded-2xl font-bold h-12 px-8 bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg shadow-black/10 transition-all">
              Optimize Identity
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-xl shadow-indigo-900/5 rounded-[40px] bg-card p-2 flex flex-col justify-between overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Network Pulse</CardTitle>
              <TrendingUp className="h-6 w-6 text-indigo-500/40" />
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-2 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-muted-foreground">Active Opportunities</span>
                <span className="text-xl font-black text-foreground">{rawJobs?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-muted-foreground">Hub Status</span>
                <span className="text-sm font-extrabold text-indigo-600 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">SYNCED</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-10">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="relative flex-grow group w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-indigo-600 transition-colors" />
            <Input
              placeholder="Search opportunity database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 h-16 rounded-[24px] bg-card border-none shadow-xl shadow-indigo-900/[0.03] focus-visible:ring-2 focus-visible:ring-indigo-600 transition-all text-base"
            />
          </div>
          <Button className="h-16 px-10 rounded-[24px] font-bold bg-foreground text-background hover:opacity-90 shadow-xl shadow-black/10 transition-all min-w-[200px] w-full md:w-auto">
            Advanced Filters
          </Button>
        </div>

        {isJobsLoading || isMatching ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] rounded-[40px] bg-card/40 animate-pulse border border-dashed border-indigo-100" />
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-card rounded-[64px] shadow-2xl shadow-indigo-900/[0.03] border-2 border-dashed border-indigo-100/50 space-y-8 flex flex-col items-center max-w-4xl mx-auto px-6">
            <div className="h-24 w-24 bg-indigo-50 rounded-[32px] flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
              <Database className="h-12 w-12" />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black tracking-tight text-foreground">Hub Repository Empty</h3>
              <p className="text-lg text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">
                Connect your first projects or initialize with sample data to test the Intelligence Hub.
              </p>
            </div>
            <Button 
              onClick={handleSeedData} 
              className="rounded-full px-14 h-16 bg-indigo-600 font-extrabold text-lg hover:bg-indigo-700 shadow-2xl shadow-indigo-500/40 transition-all group"
            >
              <Plus className="mr-2 h-6 w-6 group-hover:rotate-90 transition-transform" />
              Initialize Hub Repository
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}