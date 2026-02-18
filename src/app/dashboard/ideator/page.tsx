'use client';

import { useState } from 'react';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, Lightbulb, TrendingUp, Loader2 } from 'lucide-react';
import { freelancerProfile } from '@/lib/data';
import { getGigIdeation } from '@/lib/actions';
import type { GenerateGigIdeaOutput } from '@/ai/flows/generate-gig-idea';

export default function IdeatorPage() {
  const [idea, setIdea] = useState<GenerateGigIdeaOutput | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    try {
      const result = await getGigIdeation({
        skills: freelancerProfile.skills,
        experience: freelancerProfile.experience,
      });
      if (result) setIdea(result);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10 pb-20">
      <PageHeader
        title="Gig Intelligence Ideator"
        subtitle="Harness neural processing to identify your perfect, high-value gig niches."
      />

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/10">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Brain className="h-4 w-4" /> Neural Context
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Detected Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {freelancerProfile.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-background border text-[10px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={loading}
                className="w-full rounded-full h-12 font-bold shadow-lg shadow-indigo-500/20"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Perfect Gig
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Market Pulse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">AI Integration demand</span>
                <span className="font-bold text-green-500">+42%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Niche specialist premium</span>
                <span className="font-bold">2.4x</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {!idea && !loading ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4 border-2 border-dashed rounded-[32px] bg-secondary/20">
              <Lightbulb className="h-12 w-12 text-muted-foreground/30" />
              <div className="space-y-1">
                <p className="font-bold text-xl">Ready for Inspiration?</p>
                <p className="text-muted-foreground max-w-sm">Click the generate button to reveal high-impact project ideas tailored specifically to your neural profile.</p>
              </div>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4 border rounded-[32px] bg-card animate-pulse">
               <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mx-auto" />
               <p className="font-medium">Synthesizing market gaps and technical capabilities...</p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Card className="rounded-[32px] overflow-hidden border-2 border-indigo-500/20 shadow-2xl shadow-indigo-500/5">
                <CardHeader className="bg-indigo-500/5 border-b p-8">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-500">Perfect Match Idea</p>
                      <CardTitle className="text-3xl font-bold tracking-tight">{idea.title}</CardTitle>
                    </div>
                    <div className="p-4 bg-background rounded-2xl border shadow-sm text-center min-w-[100px]">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground">Target Rate</p>
                      <p className="text-xl font-bold text-indigo-500">{idea.marketValue}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-indigo-500" /> Why this works now
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{idea.whyNow}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-indigo-500" /> Gig Blueprint
                    </h4>
                    <p className="text-lg font-medium leading-relaxed">{idea.description}</p>
                  </div>
                  <div className="pt-4 flex gap-4">
                    <Button variant="outline" className="rounded-full px-8">Save for later</Button>
                    <Button className="rounded-full px-8 font-bold">Draft Brief</Button>
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
