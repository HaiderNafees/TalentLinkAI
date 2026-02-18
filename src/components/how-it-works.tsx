'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Brain, Zap, Target } from 'lucide-react';

const tabsData = [
  {
    id: 'freelancers',
    label: 'For Freelancers',
    title: 'Your Professional AI Agent.',
    description: 'We don\'t just match you; we elevate you. Our AI identifies high-value opportunities, optimizes your profile in real-time, and generates winning proposal ideas.',
    features: [
      { icon: <Sparkles className="h-5 w-5" />, text: 'Automated Gig Ideation' },
      { icon: <Zap className="h-5 w-5" />, text: 'Real-time Skill Calibration' },
      { icon: <Target className="h-5 w-5" />, text: 'High-Precision Matching' },
    ],
  },
  {
    id: 'clients',
    label: 'For Companies',
    title: 'Neural Sourcing for Elite Teams.',
    description: 'Bypass the resume pile. Our neural matching engine provides a pre-vetted shortlist of specialists who are mathematically compatible with your project brief.',
    features: [
      { icon: <Brain className="h-5 w-5" />, text: 'AI-Driven Brief Builder' },
      { icon: <ShieldCheck className="h-5 w-5 text-green-500" />, text: 'Verified Skill Validation' },
      { icon: <Zap className="h-5 w-5" />, text: 'Instant Talent Shortlists' },
    ],
  },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  return (
    <section className="py-24 bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            How the <span className="text-muted-foreground">Intelligence Works.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A dual-sided ecosystem where neural matching bridges the gap between creative vision and execution.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-[400px] grid-cols-2 rounded-full h-12">
              {tabsData.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="rounded-full font-semibold">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabsData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="animate-in fade-in zoom-in-95 duration-500">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <h3 className="text-4xl font-bold leading-tight">{tab.title}</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {tab.description}
                  </p>
                  <div className="grid gap-4">
                    {tab.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                        <div className="shrink-0 p-2 rounded-lg bg-secondary">
                          {feature.icon}
                        </div>
                        <span className="font-semibold">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Card className="aspect-square flex items-center justify-center bg-secondary/30 border-dashed border-2">
                  <div className="text-center space-y-4 p-12">
                    <div className="h-24 w-24 bg-primary rounded-full mx-auto flex items-center justify-center text-primary-foreground">
                      <Brain className="h-10 w-10 animate-pulse" />
                    </div>
                    <p className="font-bold text-lg">AI Integration Active</p>
                    <p className="text-sm text-muted-foreground">Neural matching engine is currently calibrating for {tab.label.toLowerCase()}...</p>
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

import { ShieldCheck } from 'lucide-react';