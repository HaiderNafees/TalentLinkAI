'use client';

import { useState } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, Lightbulb, TrendingUp, Loader2, AlertCircle } from 'lucide-react';
import { getGigIdeation } from '@/lib/actions';
import type { GenerateGigIdeaOutput } from '@/ai/flows/generate-gig-idea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function IdeatorPage() {
  const { user } = useUser();
  const db = useFirestore();
  const [idea, setIdea] = useState<GenerateGigIdeaOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const profileRef = useMemoFirebase(() => (user ? doc(db, 'freelancers', user.uid) : null), [db, user]);
  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  async function handleGenerate() {
    if (!profile) return;
    setLoading(true);
    try {
      const result = await getGigIdeation({
        skills: profile.skills || [],
        experience: profile.experience || '',
      });
      if (result) setIdea(result);
    } finally {
      setLoading(false);
    }
  }

  if (isProfileLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto py-20">
        <Alert variant="destructive" className="rounded-3xl border-2">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Profile Incomplete</AlertTitle>
          <AlertDescription>
            You need to complete your professional profile before the AI can generate gig ideas.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <PageHeader
        title="Gig Ideator"
        subtitle="Analyze your unique skills to identify high-value project opportunities."
      />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/10">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Brain className="h-4 w-4" /> Professional Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Detected Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {(profile.skills || []).map((s: string) => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-background border text-[10px] font-medium">
                      {s}
                    </span>
                  ))}
                  {(!profile.skills || profile.skills.length === 0) && (
                    <span className="text-[10px] text-muted-foreground italic">No skills listed</span>
                  )}
                </div>
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={loading || !profile.skills || profile.skills.length === 0}
                className="w-full rounded-full h-12 font-bold shadow-lg shadow-indigo-500/20"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate New Gig Idea
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Market Pulse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Skill demand trend</span>
                <span className="font-bold text-green-500">+18%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Specialist premium</span>
                <span className="font-bold">2.1x</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {!idea && !loading ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4 border-2 border-dashed rounded-[32px] bg-secondary/20">
              <Lightbulb className="h-12 w-12 text-muted-foreground/30" />
              <div className="space-y-1">
                <p className="font-bold text-xl">Waiting for Inspiration?</p>
                <p className="text-muted-foreground max-w-sm">Our AI will process your skills and experience to suggest high-impact niches tailored specifically to you.</p>
              </div>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4 border rounded-[32px] bg-card animate-pulse">
               <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mx-auto" />
               <p className="font-medium">Synthesizing market trends and capabilities...</p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Card className="rounded-[32px] overflow-hidden border-2 border-indigo-500/20 shadow-2xl shadow-indigo-500/5">
                <CardHeader className="bg-indigo-500/5 border-b p-8">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-500">Suggested Gig Concept</p>
                      <CardTitle className="text-3xl font-bold tracking-tight">{idea.title}</CardTitle>
                    </div>
                    <div className="p-4 bg-background rounded-2xl border shadow-sm text-center min-w-[100px]">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Market Rate</p>
                      <p className="text-xl font-bold text-indigo-500">{idea.marketValue}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-indigo-500" /> Market Alignment
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{idea.whyNow}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-indigo-500" /> Project Details
                    </h4>
                    <p className="text-lg font-medium leading-relaxed">{idea.description}</p>
                  </div>
                  <div className="pt-4 flex gap-4">
                    <Button variant="outline" className="rounded-full px-8">Save Concept</Button>
                    <Button className="rounded-full px-8 font-bold bg-indigo-600 hover:bg-indigo-700">Draft Proposal</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
