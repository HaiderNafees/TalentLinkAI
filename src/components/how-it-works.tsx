'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CircleDashed } from 'lucide-react';
import { cn } from '@/lib/utils';

const tasks = [
  {
    id: 'prompt',
    label: 'Write a Challenging Prompt',
    title: 'Write a Challenging Prompt',
    why: 'Creating difficult problem/answer pairs helps teach and improve the accuracy of AI models.',
    how: 'Think of a difficult question in your field of study - one that would confuse an AI model into writing an incorrect answer. Then, write the correct answer.',
    checklist: [
      { text: 'Is it a genuine, conversational, real-world task?', checked: true },
      { text: 'Does it require reasoning over simple recall?', checked: false },
      { text: 'Is it open-ended, allowing diverse solutions?', checked: false },
    ],
  },
  {
    id: 'rubrics',
    label: 'Create Grading Rubrics',
    title: 'Create Grading Rubrics',
    why: 'Detailed rubrics are essential for training AI to evaluate responses accurately and consistently, ensuring fairness and quality.',
    how: 'Define clear criteria for what constitutes a good, average, and poor response. Provide examples for each quality level to guide the AI.',
    checklist: [
      { text: 'Are the criteria specific and measurable?', checked: true },
      { text: 'Is there a clear distinction between quality levels?', checked: false },
      { text: 'Are examples provided for each criterion?', checked: false },
    ],
  },
  {
    id: 'rank',
    label: 'Rate and Rank Answers',
    title: 'Rate and Rank Answers',
    why: 'Your expert ratings and rankings provide the critical feedback signal that fine-tunes AI models, teaching them to prefer better answers.',
    how: 'Evaluate multiple AI-generated answers to the same prompt. Rate each one for quality, accuracy, and helpfulness, then rank them from best to worst.',
    checklist: [
      { text: 'Is the best answer clearly superior to others?', checked: true },
      { text: 'Is the feedback on poor answers constructive?', checked: false },
      { text: 'Does the ranking reflect nuanced quality differences?', checked: false },
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

const TaskVisual = ({ task }: { task: (typeof tasks)[0] }) => (
  <div className="relative p-8 bg-gradient-to-br from-blue-50/20 via-orange-50/20 to-rose-50/20 rounded-2xl overflow-hidden border border-border/50">
    <Card className="shadow-lg bg-card/90 backdrop-blur-sm">
      <CardHeader className="bg-muted/30 border-b border-border py-3 px-4">
        <CardTitle className="text-sm font-medium">{task.label}</CardTitle>
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
              <CardTitle className="text-sm font-semibold">
                Prompt Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {task.checklist.map((item, index) => (
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
  const [activeTab, setActiveTab] = useState(tasks[0].id);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            How real experts like you improve AI models
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            We depend on subject matter experts in coding, STEM, languages, and
            more to improve AI. Here are some common tasks you&apos;ll do on
            Outlier:
          </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-12">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 h-auto p-1.5 bg-muted rounded-xl">
            {tasks.map((task) => (
              <TabsTrigger key={task.id} value={task.id} className="py-2 text-sm font-medium data-[state=active]:shadow-md rounded-lg">
                {task.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tasks.map((task) => (
            <TabsContent key={task.id} value={task.id} className="mt-10">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8 lg:pt-4">
                  <h3 className="text-3xl font-bold font-headline">
                    {task.title}
                  </h3>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-foreground">Why</h4>
                    <p className="text-foreground/80 text-base">{task.why}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-foreground">How</h4>
                    <p className="text-foreground/80 text-base">{task.how}</p>
                  </div>
                </div>
                <div>
                  <TaskVisual task={task} />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
