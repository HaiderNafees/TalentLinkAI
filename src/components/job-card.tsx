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
  ArrowRight,
} from 'lucide-react';
import type { JobPosting } from '@/lib/types';
import type { MatchJobToFreelancerProfileOutput } from '@/ai/flows/match-job-to-freelancer-profile';
import Link from 'next/link';

type JobWithMatch = JobPosting & MatchJobToFreelancerProfileOutput;

interface JobCardProps {
  job: JobWithMatch;
}

export default function JobCard({ job }: JobCardProps) {
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-indigo-500';
    if (score >= 60) return 'text-purple-500';
    return 'text-destructive';
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-none bg-card group rounded-[32px] overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight line-clamp-1">{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Briefcase className="h-3.5 w-3.5" /> {job.company}
            </CardDescription>
          </div>
          <div className="shrink-0">
            <div className="relative h-14 w-14">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  className="text-border/40"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  className={getScoreColorClass(job.matchScore)}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray={`${job.matchScore}, 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold tracking-tighter">{job.matchScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-5">
        <div className="flex flex-wrap gap-1.5">
          {job.requiredSkills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
              {skill}
            </Badge>
          ))}
          {job.requiredSkills.length > 3 && (
            <span className="text-[10px] font-bold text-muted-foreground self-center">+{job.requiredSkills.length - 3}</span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60 border-y py-3">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {job.postedAt}</span>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 hover:no-underline p-0 [&>svg]:hidden">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Neural Assessment
                <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-3 text-sm text-muted-foreground leading-relaxed italic">
              "{job.compatibilityAssessment}"
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild className="w-full rounded-full h-11 font-bold shadow-lg shadow-indigo-500/10 group">
          <Link href={`/dashboard/jobs/${job.id}`}>
            View & Sync <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
