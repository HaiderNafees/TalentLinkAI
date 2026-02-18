'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Sparkles, BrainCircuit, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabsData = [
  {
    id: 'freelancers',
    label: 'For Freelancers',
    title: 'Your AI Agent for Career Growth.',
    description:
      "Our AI doesn't just find jobs; it acts as your personal agent. It identifies skill gaps, optimizes your profile, and generates winning proposal ideas for every gig.",
    how: 'The platform scans millions of data points to find the perfect match. It then helps you tailor your application specifically to what the client needs, increasing your success rate by 3x.',
    checklist: [
      {
        text: 'AI-Generated Gig Ideas: Get creative angles for your next proposal.',
        icon: <Sparkles className="h-5 w-5 text-accent" />,
      },
      {
        text: 'Real-time Skill Benchmarking against other top talent.',
        icon: <BrainCircuit className="h-5 w-5 text-primary" />,
      },
      { 
        text: 'Automated Profile Optimization for maximum visibility.', 
        icon: <UserCheck className="h-5 w-5 text-green-500" /> 
      },
    ],
  },
  {
    id: 'clients',
    label: 'For Clients',
    title: 'Recruiting, Reimagined by AI.',
    description:
      'Stop sifting through hundreds of resumes. Our AI provides a pre-vetted shortlist of the top 3% of talent specifically suited for your unique project requirements.',
    how: 'Simply describe your project—or let our AI draft the brief for you. We then use neural matching to identify specialists who have successfully completed similar high-stakes tasks.',
    checklist: [
      { text: 'AI Brief Builder: Generate perfect project requirements in seconds.', icon: <Sparkles className="h-5 w-5 text-accent" /> },
      {
        text: 'Neural Filtering: Instant shortlists based on actual project output.',
        icon: <BrainCircuit className="h-5 w-5 text-primary" />,
      },
      {
        text: 'Compatibility Assessments for every single candidate.',
        icon: <UserCheck className="h-5 w-5 text-green-500" />,
      },
    ],
  },
];

const ChecklistItem = ({
  text,
  icon,
}: {
  text: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center gap-4 p-4 bg-background/60 rounded-xl border border-border/50 group hover:border-primary/50 transition-all">
    <div className="shrink-0">{icon}</div>
    <p className="text-sm font-medium text-foreground leading-tight">{text}</p>
  </div>
);

const FeatureVisual = ({ feature }: { feature: (typeof tabsData)[0] }) => (
  <div className="relative p-10 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-3xl overflow-hidden border border-border/50">
    <Card className="shadow-2xl border-none bg-card/80 backdrop-blur-md">
      <CardHeader className="bg-primary/5 border-b border-border/50 py-4 px-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{feature.label} Pipeline</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-3">
          <div className="h-2 bg-muted rounded-full w-3/4"></div>
          <div className="h-2 bg-muted rounded-full w-full"></div>
          <div className="h-2 bg-muted rounded-full w-2/3"></div>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-bold text-foreground/80">Active AI Intelligence</p>
          <div className="grid gap-3">
            {feature.checklist.map((item, index) => (
              <ChecklistItem key={index} {...item} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
    <div className="absolute top-0 right-0 p-8">
      <Sparkles className="h-12 w-12 text-accent/20 rotate-12" />
    </div>
  </div>
);

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground tracking-tight">
            How the <span className="text-primary underline decoration-accent/30 decoration-4 underline-offset-8">Intelligence</span> Connects.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A dual-sided ecosystem where AI bridges the gap between creative vision and professional execution.
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-16">
          <TabsList className="flex w-fit mx-auto p-1 bg-muted/50 border rounded-2xl mb-12">
            {tabsData.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="px-8 py-3 text-sm font-bold rounded-xl data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg transition-all"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabsData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="focus-visible:outline-none">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                  <h3 className="text-4xl font-bold font-headline leading-[1.1]">
                    {tab.title}
                  </h3>
                  <div className="grid gap-8">
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm uppercase tracking-widest text-primary">The AI Strategy</h4>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {tab.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-bold text-sm uppercase tracking-widest text-accent">The Outcome</h4>
                      <p className="text-muted-foreground text-lg leading-relaxed">{tab.how}</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full" />
                  <FeatureVisual feature={tab} />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
