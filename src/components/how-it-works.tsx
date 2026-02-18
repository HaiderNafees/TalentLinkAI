'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Brain, Zap, Target, ShieldCheck } from 'lucide-react';

const tabsData = [
  {
    id: 'freelancers',
    label: 'For Experts',
    title: 'Your Professional AI Agent.',
    description: "We don't just match you; we elevate you. Our neural engine identifies high-value opportunities, optimizes your profile in real-time, and generates winning proposal strategies based on market demand.",
    features: [
      { icon: <Sparkles className="h-5 w-5 text-indigo-500" />, text: 'Automated Gig Ideation' },
      { icon: <Zap className="h-5 w-5 text-indigo-500" />, text: 'Real-time Skill Calibration' },
      { icon: <Target className="h-5 w-5 text-indigo-500" />, text: 'Precision Opportunity Matching' },
    ],
  },
  {
    id: 'clients',
    label: 'For Organizations',
    title: 'Neural Sourcing for Elite Teams.',
    description: 'Bypass the resume pile. Our neural matching engine provides a pre-vetted shortlist of specialists who are mathematically compatible with your project brief and technical requirements.',
    features: [
      { icon: <Brain className="h-5 w-5 text-indigo-500" />, text: 'AI-Driven Brief Builder' },
      { icon: <ShieldCheck className="h-5 w-5 text-green-500" />, text: 'Verified Skill Validation' },
      { icon: <Zap className="h-5 w-5 text-indigo-500" />, text: 'Instant Talent Shortlists' },
    ],
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  return (
    <section className="py-24 bg-background border-b overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            How the <span className="text-muted-foreground">Intelligence Works.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A dual-sided ecosystem where neural matching bridges the gap between creative vision and technical execution.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2 rounded-full h-12 bg-secondary/50 p-1 border">
              {tabsData.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="rounded-full font-semibold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabsData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="animate-in fade-in zoom-in-95 duration-500 focus-visible:outline-none">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="space-y-8">
                  <h3 className="text-4xl font-bold leading-tight tracking-tight">{tab.title}</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {tab.description}
                  </p>
                  <div className="grid gap-4">
                    {tab.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-md">
                        <div className="shrink-0 p-2 rounded-lg bg-secondary flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <span className="font-semibold text-foreground">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Card className="aspect-square flex items-center justify-center bg-secondary/10 border-dashed border-2 rounded-3xl relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="text-center space-y-6 p-8 relative z-10">
                    <div className="h-28 w-28 bg-primary rounded-3xl mx-auto flex items-center justify-center text-primary-foreground shadow-2xl transform transition-transform group-hover:scale-110 duration-500">
                      <Brain className="h-12 w-12 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-xl tracking-tight">TalentLink Neural Core</p>
                      <p className="text-sm text-muted-foreground max-w-[250px] mx-auto leading-relaxed">
                        Calibrating requirements for {tab.label.toLowerCase()} in real-time...
                      </p>
                    </div>
                    <div className="flex justify-center gap-1.5">
                       {[1, 2, 3].map(i => <div key={i} className="h-1.5 w-8 rounded-full bg-indigo-500/20" />)}
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}