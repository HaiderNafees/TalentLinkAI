'use client';

import { use, useState, useEffect } from 'react';
import { jobPostings, freelancerProfile } from '@/lib/data';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Sparkles, 
  ChevronLeft, 
  ShieldCheck, 
  Brain, 
  Loader2,
  Send,
  Copy
} from 'lucide-react';
import Link from 'next/link';
import { getAIProposal } from '@/lib/actions';
import type { GenerateProposalOutput } from '@/ai/flows/generate-proposal';
import { useToast } from '@/hooks/use-toast';

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
  const job = jobPostings.find(j => j.id === id);
  
  const [proposal, setProposal] = useState<GenerateProposalOutput | null>(null);
  const [loading, setLoading] = useState(false);

  if (!job) {
    return <div className="p-10 text-center">Opportunity not found.</div>;
  }

  async function handleGenerateProposal() {
    setLoading(true);
    try {
      const result = await getAIProposal({
        freelancerProfile: {
          name: freelancerProfile.name,
          skills: freelancerProfile.skills,
          experience: freelancerProfile.experience,
        },
        jobPosting: {
          title: job.title,
          company: job.company,
          description: job.description,
        },
      });
      setProposal(result);
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    if (proposal) {
      navigator.clipboard.writeText(proposal.proposal);
      toast({
        title: "Proposal Copied",
        description: "The AI-generated proposal is now in your clipboard.",
      });
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="rounded-full">
          <Link href="/dashboard">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Hub
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-lg">{job.experienceLevel} Level</Badge>
              <Badge variant="outline" className="rounded-lg bg-indigo-500/5 text-indigo-600 border-indigo-200">98% Match</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.company}</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {job.postedAt}</span>
            </div>
          </div>

          <Card className="rounded-[32px] border-none shadow-sm bg-secondary/20">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-xl">Opportunity Brief</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {job.description}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t">
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Required Capabilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Preferred Alignment</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.preferredSkills?.map(s => <Badge key={s} variant="outline">{s}</Badge>)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[32px] border-2 border-indigo-500/20 shadow-xl shadow-indigo-500/5 overflow-hidden">
            <CardHeader className="bg-indigo-500/5 border-b p-6">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" /> AI Proposal Engine
              </CardTitle>
              <CardDescription>Synthesize a high-precision pitch for this role.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {!proposal && !loading ? (
                <div className="space-y-4 py-4 text-center">
                  <Brain className="h-10 w-10 text-muted-foreground/30 mx-auto" />
                  <p className="text-sm text-muted-foreground">The engine will analyze the brief and your profile to draft the perfect response.</p>
                  <Button onClick={handleGenerateProposal} className="w-full rounded-full h-11 font-bold">Generate Neural Proposal</Button>
                </div>
              ) : loading ? (
                <div className="space-y-4 py-8 text-center animate-pulse">
                   <Loader2 className="h-8 w-8 text-indigo-500 animate-spin mx-auto" />
                   <p className="text-sm font-medium">Calibrating pitch for {job.company}...</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="space-y-2">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">Key Selling Points</p>
                     <ul className="space-y-2">
                        {proposal.keySellingPoints.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs font-medium bg-indigo-500/5 p-2 rounded-lg border border-indigo-200/50">
                            <ShieldCheck className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
                            {p}
                          </li>
                        ))}
                     </ul>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between items-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Drafted Proposal</p>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard}><Copy className="h-3 w-3" /></Button>
                     </div>
                     <div className="p-4 bg-secondary/50 rounded-2xl border text-sm leading-relaxed max-h-[300px] overflow-auto whitespace-pre-wrap">
                        {proposal.proposal}
                     </div>
                  </div>
                  <Button className="w-full rounded-full h-12 font-bold group shadow-lg shadow-indigo-500/20">
                    Send Intelligence Profile <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                  <Button variant="outline" onClick={handleGenerateProposal} className="w-full rounded-full">Re-generate Draft</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[32px] bg-secondary/10 border-dashed">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-10 w-10 bg-background rounded-xl border flex items-center justify-center text-indigo-500 shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold uppercase">Escrow Protocol Active</p>
                <p className="text-[10px] text-muted-foreground">Milestone payments secured via TalentLink Trust.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
