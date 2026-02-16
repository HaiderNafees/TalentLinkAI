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
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: 1,
    title: 'Create your profile',
  },
  {
    id: 2,
    title: 'Import and review skills',
  },
  {
    id: 3,
    title: 'Verify your identity',
  },
  {
    id: 4,
    title: 'Verify skills and start earning',
  },
];

export default function HowToApply() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-semibold text-primary tracking-wider uppercase">
            How to Apply
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mt-2">
            Start in 4 simple steps
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 mt-16 items-start">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={cn(
                  'w-full text-left p-6 border-l-4 transition-all duration-300',
                  activeStep === step.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border/50 hover:bg-muted/50'
                )}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      'flex items-center justify-center h-10 w-10 rounded-full text-sm font-bold shrink-0',
                      activeStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    0{step.id}
                  </span>
                  <p
                    className={cn(
                      'text-lg font-semibold',
                      activeStep === step.id
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-br from-orange-300 via-blue-300 to-rose-300 rounded-2xl blur-sm opacity-50"></div>
            <Card className="relative shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Create profile</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Legal name</Label>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input placeholder="First Name" />
                        <Input placeholder="Last Name" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your name as it appears on your government ID
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select>
                          <SelectTrigger id="country">
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
                        <Label htmlFor="state">State or territory</Label>
                        <Select>
                          <SelectTrigger id="state">
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input id="phone" placeholder="+1 (555) 555-5555" />
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 pt-2">
                    <Checkbox id="sms" />
                    <Label htmlFor="sms" className="text-xs text-muted-foreground font-normal">
                      I agree to receive SMS messages from Outlier with updates
                      and reminders.
                    </Label>
                  </div>
                  <Button size="lg" className="w-full">
                    Next <ArrowRight className="ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
