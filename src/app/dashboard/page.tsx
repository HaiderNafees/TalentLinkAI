'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import JobCard from '@/components/job-card';
import PageHeader from '@/components/page-header';
import { Input } from '@/components/ui/input';
import { Search, Sparkles, Brain, TrendingUp, Loader2, Database, Briefcase, Plus } from 'lucide-react';
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

  const handleSeedData = () => {
    if (!db || !user) return;
    
    const sampleJobs = [
      {
        id: 'job_1',
        clientId: user.uid,
        title: 'Full-Stack Developer (Next.js)',
        company: 'Vanguard Systems',
        description: 'Lead the development of a performance-critical SaaS platform using Next.js 15 and React 19.',
        requiredSkills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
        experienceLevel: 'Senior',
        location: 'Remote',
        postedAt: 'Just now'
      },
      {
        id: 'job_2',
        clientId: user.uid,
        title: 'GenAI Solution Architect',
        company: 'Cognitive Labs',
        description: 'Design and optimize large-scale prompt orchestration frameworks for enterprise customers.',
        requiredSkills: ['Python', 'LLMs', 'System Architecture', 'API Integration'],
        experienceLevel: 'Senior',
        location: 'Hybrid (NYC)',
        postedAt: '2h ago'
      },
      {
        id: 'job_3',
        clientId: user.uid,
        title: 'Frontend Engineer (UI Performance)',
        company: 'Nexus Flow',
        description: 'Build polished, high-fidelity user interfaces. Focus on Framer Motion and Core Web Vitals.',
        requiredSkills: ['React', 'Tailwind', 'Animations', 'Web Performance'],
        experienceLevel: 'Mid',
        location: 'Remote',
        postedAt: '4h ago'
      }
    ];

    sampleJobs.forEach(job => {
      setDoc(doc(db, 'jobPostings', job.id), job, { merge: true });
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
      <div className="flex h-[80svh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600/50" />
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
    <div className="space-y-12 max-w-7xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <PageHeader
          title={`Professional Hub`}
          subtitle={`Welcome back, ${profile.firstName}. Your workspace is synchronized with current market trends.`}
        />
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-indigo-50 border border-indigo-100/50 shadow-sm transition-all hover:shadow-md">
          <div className="relative">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-indigo-400 rounded-full animate-ping" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-700">Identity Verified</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-none shadow-xl shadow-indigo-900/5 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-[32px] overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between p-10 pb-4">
            <CardTitle className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-100/70">Neural Intelligence Insight</CardTitle>
            <Brain className="h-6 w-6 text-indigo-200/50 group-hover:scale-110 transition-transform" />
          </CardHeader>
          <CardContent className="p-10 pt-4">
            <p className="text-2xl font-bold mb-6 leading-tight max-w-lg">
              We've identified a strong alignment between your expertise in <span className="text-indigo-200">{profile.skillIds?.[0] || 'Technical Systems'}</span> and several high-impact roles at leading technology firms.
            </p>
            <Button variant="secondary" className="rounded-2xl font-bold h-12 px-8 bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg shadow-black/10 transition-all">
              Explore Recommendations
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-xl shadow-indigo-900/5 rounded-[32px] bg-card p-2 flex flex-col justify-between">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">Market Pulse</CardTitle>
              <TrendingUp className="h-6 w-6 text-indigo-500/40" />
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-2 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-muted-foreground">Active Hub Projects</span>
                <span className="text-xl font-black text-foreground">{rawJobs?.length || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-muted-foreground">Profile Alignment</span>
                <span className="text-sm font-extrabold text-indigo-600 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">ELITE</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>Network Capacity</span>
                <span>94%</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)] w-[94%] transition-all duration-1000" />
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
              placeholder="Filter opportunity database..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 h-16 rounded-[24px] bg-card border-none shadow-xl shadow-indigo-900/[0.03] focus-visible:ring-2 focus-visible:ring-indigo-600 transition-all text-base"
            />
          </div>
          <Button className="h-16 px-10 rounded-[24px] font-bold bg-foreground text-background hover:opacity-90 shadow-xl shadow-black/10 transition-all min-w-[200px] w-full md:w-auto">
            Advanced Filtering
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
          <div className="text-center py-32 bg-card rounded-[56px] shadow-2xl shadow-indigo-900/[0.03] border-2 border-dashed border-indigo-100/50 space-y-8 flex flex-col items-center max-w-4xl mx-auto px-6">
            <div className="h-24 w-24 bg-indigo-50 rounded-[32px] flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50">
              <Briefcase className="h-12 w-12" />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black tracking-tight text-foreground">Hub Repository Empty</h3>
              <p className="text-lg text-muted-foreground font-medium max-w-sm mx-auto leading-relaxed">
                No active project postings were found in your region. Initialize the database to populate the hub.
              </p>
            </div>
            <Button 
              onClick={handleSeedData} 
              className="rounded-full px-14 h-16 bg-indigo-600 font-extrabold text-lg hover:bg-indigo-700 shadow-2xl shadow-indigo-500/40 transition-all group"
            >
              <Plus className="mr-2 h-6 w-6 group-hover:rotate-90 transition-transform" />
              Initialize Project Data
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
