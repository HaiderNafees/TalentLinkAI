'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import type { JobPosting } from '@/lib/types';
import type { MatchJobToFreelancerProfileOutput } from '@/ai/flows/match-job-to-freelancer-profile';

type JobWithMatch = JobPosting & MatchJobToFreelancerProfileOutput;

interface JobCardProps {
  job: JobWithMatch;
}

export default function JobCard({ job }: JobCardProps) {
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-chart-2'; // Green
    if (score >= 60) return 'text-chart-1'; // Orange/Yellow
    return 'text-destructive'; // Red
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 bg-card">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div>
            <CardTitle className="text-xl font-headline">{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 pt-1 text-card-foreground/80">
              <Briefcase className="h-4 w-4" /> {job.company}
            </CardDescription>
          </div>
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="relative h-16 w-16">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  className="text-border/50"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className={getScoreColorClass(job.matchScore)}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${job.matchScore}, 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold">{job.matchScore}</span>
                <span className="text-xs text-muted-foreground">Match</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {job.requiredSkills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {job.location}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> {job.postedAt}
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-sm text-primary hover:no-underline p-0 [&>svg]:hidden group">
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-accent" />
                AI Compatibility Assessment
                <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 text-sm text-foreground/80">
              {job.compatibilityAssessment}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="pt-4 mt-auto">
        <Button className="w-full">Apply Now</Button>
        <Button variant="ghost" size="icon" className="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <span className="sr-only">Save Job</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
