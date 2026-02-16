'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabsData = [
  {
    id: 'freelancers',
    label: 'For Freelancers',
    title: 'Land Your Dream Job, Faster.',
    description:
      "Stop endless scrolling. Our AI analyzes your profile against thousands of job postings to find your perfect match, so you can focus on what you do best.",
    how: 'Simply complete your profile, highlighting your skills and experience. Our AI does the heavy lifting, sending you curated job recommendations with a detailed compatibility score.',
    checklist: [
      {
        text: 'Build a standout profile with your unique skills.',
        checked: true,
      },
      {
        text: 'Receive AI-powered job matches directly to your dashboard.',
        checked: false,
      },
      { text: "Apply with confidence knowing you're a great fit.", checked: false },
    ],
  },
  {
    id: 'clients',
    label: 'For Clients',
    title: 'Find the Perfect Expert, Effortlessly.',
    description:
      'Say goodbye to sifting through countless applications. Our intelligent system shortlists the most qualified freelancers for your project, saving you time and ensuring a quality hire.',
    how: 'Post your job with detailed requirements. Our AI instantly matches you with top candidates based on skills, experience, and project needs, providing a clear assessment for each.',
    checklist: [
      { text: 'Post your job with specific requirements.', checked: true },
      {
        text: 'Get an AI-curated shortlist of top-tier talent.',
        checked: false,
      },
      {
        text: 'Hire the best-fit freelancer with a clear compatibility assessment.',
        checked: false,
      },
    ],
  },
];

const ChecklistItem = ({
  text,
  checked,
}: {
  text: string;
  checked: boolean;
}) => (
  <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border">
    {checked ? (
      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
    ) : (
      <CircleDashed className="h-5 w-5 text-muted-foreground shrink-0" />
    )}
    <p className="text-sm text-foreground">{text}</p>
  </div>
);

const FeatureVisual = ({ feature }: { feature: (typeof tabsData)[0] }) => (
  <div className="relative p-8 bg-gradient-to-br from-blue-50/20 via-orange-50/20 to-rose-50/20 rounded-2xl overflow-hidden border border-border/50">
    <Card className="shadow-lg bg-card/90 backdrop-blur-sm">
      <CardHeader className="bg-muted/30 border-b border-border py-3 px-4">
        <CardTitle className="text-sm font-medium">{feature.label}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2 animate-pulse">
          <div className="h-4 bg-muted rounded-md w-3/4"></div>
          <div className="h-4 bg-muted rounded-md w-full"></div>
          <div className="h-4 bg-muted rounded-md w-full"></div>
          <div className="h-4 bg-muted rounded-md w-1/2"></div>
        </div>
        <div className="pt-4">
          <Card className="bg-background/50 border-orange-400/50 border-2 shadow-inner">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm font-semibold">Key Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {feature.checklist.map((item, index) => (
                <ChecklistItem key={index} {...item} />
              ))}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            How Our AI-Powered Platform Works
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Whether you're a freelancer seeking your next project or a client
            looking for top talent, our AI makes the connection seamless and
            intelligent.
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-12">
          <TabsList className="grid w-full max-w-sm mx-auto grid-cols-2 h-auto p-1.5 bg-muted rounded-xl">
            {tabsData.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="py-2 text-sm font-medium data-[state=active]:shadow-md rounded-lg"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabsData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-10">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8 lg:pt-4">
                  <h3 className="text-3xl font-bold font-headline">
                    {tab.title}
                  </h3>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-foreground">
                      Why it Works
                    </h4>
                    <p className="text-foreground/80 text-base">
                      {tab.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-foreground">
                      How it Works
                    </h4>
                    <p className="text-foreground/80 text-base">{tab.how}</p>
                  </div>
                </div>
                <div>
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
