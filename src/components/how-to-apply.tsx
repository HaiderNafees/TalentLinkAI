'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, Linkedin, Upload, FileCheck, Sparkles, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const steps = [
  {
    id: 1,
    title: 'Initialize Hub Profile',
    subtitle: 'Basic identity & access setup',
  },
  {
    id: 2,
    title: 'Neural Skill Extraction',
    subtitle: 'Import experience via AI parser',
  },
  {
    id: 3,
    title: 'Security Verification',
    subtitle: 'Identity & document validation',
  },
  {
    id: 4,
    title: 'Precision Calibration',
    subtitle: 'Final skill test & activation',
  },
];

const CreateProfileForm = ({
  setActiveStep,
}: {
  setActiveStep: (step: number) => void;
}) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="space-y-1">
      <h3 className="text-xl font-bold tracking-tight text-foreground">Core Profile Setup</h3>
      <p className="text-sm text-muted-foreground">Establish your identity within the TalentLink network.</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Legal Identity</Label>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input placeholder="First Name" className="rounded-xl h-11" />
          <Input placeholder="Last Name" className="rounded-xl h-11" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Jurisdiction</Label>
          <Select>
            <SelectTrigger id="country" className="rounded-xl h-11">
              <SelectValue placeholder="United States" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="gb">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Encrypted Contact</Label>
          <Input id="phone" placeholder="+1 (555) 555-5555" className="rounded-xl h-11" />
        </div>
      </div>
    </div>
    <div className="flex items-start space-x-3 pt-2">
      <Checkbox id="sms" className="mt-1" />
      <Label
        htmlFor="sms"
        className="text-xs text-muted-foreground font-normal leading-relaxed"
      >
        I consent to receiving encrypted SMS protocol updates regarding my neural match status.
      </Label>
    </div>
    <Button size="lg" className="w-full rounded-full h-12 font-bold shadow-lg shadow-indigo-500/20" onClick={() => setActiveStep(2)}>
      Initialize <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const ImportSkillsForm = ({
  setActiveStep,
}: {
  setActiveStep: (step: number) => void;
}) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="space-y-1">
      <h3 className="text-xl font-bold tracking-tight text-foreground">Neural Skill Extraction</h3>
      <p className="text-sm text-muted-foreground">Our AI parses your professional history to build your skill map.</p>
    </div>
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Button variant="outline" className="h-14 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 border-dashed hover:border-primary/50 transition-colors">
          <Linkedin className="h-5 w-5 text-blue-600" />
          <span className="text-xs font-bold uppercase tracking-tighter">Sync LinkedIn</span>
        </Button>
        <Button variant="outline" className="h-14 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 border-dashed hover:border-primary/50 transition-colors">
          <Upload className="h-5 w-5 text-indigo-500" />
          <span className="text-xs font-bold uppercase tracking-tighter">Parse Resume</span>
        </Button>
      </div>
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Detected Capabilities</Label>
        <div className="p-5 border-2 border-indigo-500/10 rounded-2xl bg-indigo-500/[0.02] min-h-[120px]">
          <div className="flex flex-wrap gap-2">
            {[
              'React',
              'TypeScript',
              'Next.js',
              'Neural Networks',
              'GenAI API',
              'Tailwind CSS',
              'System Design',
            ].map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1 bg-background border shadow-sm rounded-lg font-medium">
                {skill}
              </Badge>
            ))}
            <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-200">
              <Sparkles className="h-3 w-3" />
              AI Detected
            </div>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest font-bold">
          AI confidence: 98.4%
        </p>
      </div>
    </div>
    <Button size="lg" className="w-full rounded-full h-12 font-bold shadow-lg shadow-indigo-500/20" onClick={() => setActiveStep(3)}>
      Confirm Skill Map <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const VerifyIdentityForm = ({
  setActiveStep,
}: {
  setActiveStep: (step: number) => void;
}) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="space-y-1">
      <h3 className="text-xl font-bold tracking-tight text-foreground">Security Protocol</h3>
      <p className="text-sm text-muted-foreground">High-assurance verification for elite project access.</p>
    </div>
    <div className="space-y-4">
      <div className="border-2 border-dashed border-indigo-500/20 rounded-2xl p-10 text-center cursor-pointer hover:bg-indigo-500/[0.02] transition-colors group">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <div className="p-4 rounded-full bg-indigo-500/5 text-indigo-500 group-hover:scale-110 transition-transform duration-300">
            <Upload className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <span className="font-bold text-foreground block">
              Passport or Government ID
            </span>
            <span className="text-xs">Secure AES-256 encrypted upload</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-2xl border">
        <div className="shrink-0 h-10 w-10 bg-background rounded-xl flex items-center justify-center border text-green-500 shadow-sm">
          <FileCheck className="h-5 w-5" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-bold uppercase tracking-wider">Privacy Protocol Active</p>
          <p className="text-[10px] text-muted-foreground">Documents are processed via zero-knowledge proof verification.</p>
        </div>
      </div>
    </div>
    <Button size="lg" className="w-full rounded-full h-12 font-bold" onClick={() => setActiveStep(4)}>
      Verify Identity <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const VerifySkillsForm = ({
  setActiveStep,
}: {
  setActiveStep: (step: number) => void;
}) => (
  <div className="space-y-8 text-center animate-in fade-in slide-in-from-right-4 duration-500">
     <div className="space-y-1">
      <h3 className="text-xl font-bold tracking-tight text-foreground">Precision Calibration</h3>
      <p className="text-sm text-muted-foreground">Fine-tune your neural match accuracy with a technical assessment.</p>
    </div>
    <div className="space-y-4">
      <Card className="text-left bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-500/10 shadow-xl shadow-indigo-500/5 rounded-2xl overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-[0.2em]">
                Assessment Protocol
              </p>
              <h4 className="text-lg font-bold tracking-tight">AI & Full-Stack Mastery</h4>
            </div>
            <div className="text-right p-2 bg-background rounded-xl border shadow-sm">
              <p className="text-[10px] text-muted-foreground font-bold uppercase">Time</p>
              <p className="font-bold text-sm">45m</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="rounded-lg bg-background font-medium">Adaptive Logic</Badge>
            <Badge variant="outline" className="rounded-lg bg-background font-medium">Coding Real-time</Badge>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center gap-2 p-4 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest border">
         <Brain className="h-4 w-4" />
         Sync Status: Final Stage
      </div>
    </div>
    <Button
      size="lg"
      className="w-full rounded-full h-14 font-extrabold text-lg shadow-xl shadow-indigo-500/20 group"
      onClick={() => alert('Calibration Started!')}
    >
      Start Calibration <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
    </Button>
  </div>
);

const renderStepContent = (
  step: number,
  setActiveStep: (step: number) => void
) => {
  switch (step) {
    case 1:
      return <CreateProfileForm setActiveStep={setActiveStep} />;
    case 2:
      return <ImportSkillsForm setActiveStep={setActiveStep} />;
    case 3:
      return <VerifyIdentityForm setActiveStep={setActiveStep} />;
    case 4:
      return <VerifySkillsForm setActiveStep={setActiveStep} />;
    default:
      return <CreateProfileForm setActiveStep={setActiveStep} />;
  }
};

export default function HowToApply() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
       {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/[0.015] -skew-x-12 transform origin-top translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-1/3 h-64 bg-purple-500/5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="font-bold text-indigo-500 tracking-[0.3em] uppercase text-[10px]">
            Network Protocol
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Onboarding <span className="text-muted-foreground">Pipeline.</span>
          </h2>
          <p className="text-lg text-muted-foreground">Activate your intelligence profile in 4 precision steps.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mt-20 items-start max-w-6xl mx-auto">
          <div className="space-y-4">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={cn(
                  'w-full text-left p-6 md:p-8 border rounded-3xl transition-all duration-500 relative group overflow-hidden',
                  activeStep === step.id
                    ? 'border-indigo-500/50 bg-indigo-500/[0.03] shadow-lg shadow-indigo-500/5'
                    : 'border-border/60 hover:border-indigo-500/20 hover:bg-secondary/30'
                )}
              >
                {activeStep === step.id && (
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-indigo-500" />
                )}
                <div className="flex items-center gap-6">
                  <span
                    className={cn(
                      'flex items-center justify-center h-14 w-14 rounded-2xl text-xl font-bold shrink-0 shadow-sm border transition-all duration-500',
                      activeStep === step.id
                        ? 'bg-primary text-primary-foreground border-primary scale-105'
                        : 'bg-secondary text-muted-foreground border-transparent'
                    )}
                  >
                    0{step.id}
                  </span>
                  <div className="space-y-1">
                    <p
                      className={cn(
                        'text-xl font-bold tracking-tight transition-colors',
                        activeStep === step.id
                          ? 'text-foreground'
                          : 'text-muted-foreground group-hover:text-foreground'
                      )}
                    >
                      {step.title}
                    </p>
                    <p className="text-sm text-muted-foreground/80 font-medium">{step.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="relative lg:sticky lg:top-32">
            <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-[40px] blur-2xl opacity-40"></div>
            <Card className="relative shadow-2xl border-none rounded-[32px] overflow-hidden bg-card/80 backdrop-blur-md">
              <CardContent className="p-8 md:p-12">
                {renderStepContent(activeStep, setActiveStep)}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}