'use client';

import { useState } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, ArrowRight, CheckCircle2, Loader2, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const db = useFirestore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    skills: '',
    experience: '',
  });

  const handleComplete = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
      await setDoc(doc(db, 'freelancers', user.uid), {
        id: user.uid,
        email: user.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        skills: skillsArray,
        experience: formData.experience,
        availabilityStatus: 'Available',
        createdDate: new Date().toISOString(),
      });
      onComplete();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />

      <Card className="w-full max-w-2xl border-none shadow-2xl rounded-[40px] overflow-hidden relative z-10">
        <div className="flex h-2 bg-secondary">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "h-full transition-all duration-500 flex-1",
                step >= i ? "bg-indigo-600" : "bg-transparent"
              )}
            />
          ))}
        </div>

        <CardHeader className="p-10 pb-0">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Brain className="h-6 w-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600">Sync Initialization</span>
          </div>
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardTitle className="text-4xl font-bold tracking-tight mb-2">Identify Your Essence.</CardTitle>
              <CardDescription className="text-lg">Tell us who you are so the Neural Core can start matching.</CardDescription>
            </div>
          )}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardTitle className="text-4xl font-bold tracking-tight mb-2">Calibrate Your Skills.</CardTitle>
              <CardDescription className="text-lg">What are your prime capabilities? Be specific for 99% accuracy.</CardDescription>
            </div>
          )}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardTitle className="text-4xl font-bold tracking-tight mb-2">Sync Complete.</CardTitle>
              <CardDescription className="text-lg">Your profile is ready to join the global workforce hub.</CardDescription>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-10">
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first" className="text-xs font-bold uppercase tracking-widest opacity-70">First Name</Label>
                  <Input 
                    id="first" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Expert" 
                    className="rounded-xl h-12" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last" className="text-xs font-bold uppercase tracking-widest opacity-70">Last Name</Label>
                  <Input 
                    id="last" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Identity" 
                    className="rounded-xl h-12" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest opacity-70">Professional Headline</Label>
                <Input 
                  id="title" 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Generative UI Engineer" 
                  className="rounded-xl h-12" 
                />
              </div>
              <Button onClick={() => setStep(2)} className="w-full h-14 rounded-full font-bold text-lg bg-indigo-600 hover:bg-indigo-700 mt-4 group">
                Continue Sync <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-xs font-bold uppercase tracking-widest opacity-70">Top Capabilities (Comma Separated)</Label>
                <Input 
                  id="skills" 
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, Next.js, AI Prompting..." 
                  className="rounded-xl h-12" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exp" className="text-xs font-bold uppercase tracking-widest opacity-70">Intelligence Summary (Experience)</Label>
                <Textarea 
                  id="exp" 
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Tell us about the high-impact projects you've pioneered..." 
                  className="rounded-2xl min-h-[150px] pt-4" 
                />
              </div>
              <div className="flex gap-4 mt-4">
                <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full px-8">Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1 h-14 rounded-full font-bold text-lg bg-indigo-600 hover:bg-indigo-700 group">
                  Finalize <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 text-center py-4 animate-in zoom-in-95 duration-700">
              <div className="relative mx-auto h-24 w-24">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                <div className="relative h-24 w-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
              </div>
              <div className="space-y-4 max-w-sm mx-auto">
                <p className="text-lg text-muted-foreground font-medium">Your profile has been calibrated with the Intelligence Hub. You are now discoverable by global visionary teams.</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {formData.skills.split(',').slice(0, 3).map(s => (
                    <Badge key={s} variant="secondary" className="rounded-lg">{s.trim()}</Badge>
                  ))}
                </div>
              </div>
              <Button 
                onClick={handleComplete} 
                disabled={loading}
                className="w-full h-14 rounded-full font-extrabold text-xl bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20"
              >
                {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6" />}
                Enter The Hub
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
