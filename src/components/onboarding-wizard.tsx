
'use client';

import { useState, useRef } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Sparkles, ArrowRight, CheckCircle2, Loader2, Camera, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    headline: '',
    skills: '',
    bio: '',
    location: '',
    photoURL: '',
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image smaller than 1MB.",
        });
        return;
      }
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoURL: reader.result as string });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleComplete = async () => {
    if (!user || !db) return;
    setLoading(true);

    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
      
      await updateProfile(user, { 
        displayName: `${formData.firstName} ${formData.lastName}`,
        photoURL: formData.photoURL || null
      });

      const profileData = {
        id: user.uid,
        email: user.email || '',
        firstName: formData.firstName,
        lastName: formData.lastName,
        headline: formData.headline,
        bio: formData.bio,
        location: formData.location,
        skillIds: skillsArray,
        profilePictureUrl: formData.photoURL || '',
        availabilityStatus: 'Available',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      };

      const docRef = doc(db, 'freelancers', user.uid);
      await setDoc(docRef, profileData, { merge: true });

      toast({
        title: "Account Active",
        description: "Your professional hub is ready.",
      });

      onComplete();
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Sync Failed",
        description: e.message || "Could not finalize your professional profile.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden animate-in fade-in duration-700">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/[0.03] blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/[0.03] blur-[120px] rounded-full" />

      <Card className="w-full max-w-2xl border border-border shadow-2xl rounded-[40px] overflow-hidden relative z-10 bg-card/80 backdrop-blur-xl">
        <div className="flex h-1.5 bg-secondary">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "h-full transition-all duration-700 flex-1",
                step >= i ? "bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" : "bg-transparent"
              )}
            />
          ))}
        </div>

        <CardHeader className="p-10 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-600">Identity Initialization</span>
          </div>
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CardTitle className="text-3xl font-black tracking-tight mb-2">Basic Info</CardTitle>
              <CardDescription className="text-base font-medium">Set up your professional identity.</CardDescription>
            </div>
          )}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CardTitle className="text-3xl font-black tracking-tight mb-2">Capabilities</CardTitle>
              <CardDescription className="text-base font-medium">Highlight your specialized skills.</CardDescription>
            </div>
          )}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CardTitle className="text-3xl font-black tracking-tight mb-2">Ready</CardTitle>
              <CardDescription className="text-base font-medium">Identity successfully synchronized.</CardDescription>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-10 pt-4">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex flex-col items-center gap-4">
                <div className="relative group cursor-pointer" onClick={handleImageClick}>
                  <Avatar className="h-32 w-32 border-4 border-background shadow-2xl transition-all group-hover:scale-105">
                    {formData.photoURL ? (
                      <AvatarImage src={formData.photoURL} className="object-cover" />
                    ) : (
                      <AvatarFallback className="bg-secondary">
                        <User className="h-12 w-12 text-muted-foreground" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute bottom-1 right-1 p-2 bg-indigo-600 rounded-full text-white shadow-lg border-2 border-background">
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="first" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">First Name</Label>
                  <Input 
                    id="first" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="rounded-2xl h-12 border-muted-foreground/20 focus:ring-2 focus:ring-indigo-500/20" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last Name</Label>
                  <Input 
                    id="last" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="rounded-2xl h-12 border-muted-foreground/20 focus:ring-2 focus:ring-indigo-500/20" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="headline" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Headline</Label>
                <Input 
                  id="headline" 
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g. Senior Developer" 
                  className="rounded-2xl h-12 border-muted-foreground/20 focus:ring-2 focus:ring-indigo-500/20" 
                />
              </div>
              <Button 
                onClick={() => setStep(2)} 
                disabled={!formData.firstName || !formData.lastName || !formData.headline}
                className="w-full h-14 rounded-full font-bold bg-indigo-600 hover:bg-indigo-700 mt-4 group shadow-2xl shadow-indigo-500/30"
              >
                Continue <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="loc" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</Label>
                  <Input 
                    id="loc" 
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. London, UK"
                    className="rounded-2xl h-12 border-muted-foreground/20 focus:ring-2 focus:ring-indigo-500/20" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Skills</Label>
                  <Input 
                    id="skills" 
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="e.g. React, Node.js" 
                    className="rounded-2xl h-12 border-muted-foreground/20 focus:ring-2 focus:ring-indigo-500/20" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Summary</Label>
                <Textarea 
                  id="bio" 
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about your background..." 
                  className="rounded-[32px] min-h-[180px] pt-4 border-muted-foreground/20 focus:ring-2 focus:ring-indigo-500/20" 
                />
              </div>
              <div className="flex gap-4 mt-4">
                <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full px-10 h-14 font-bold">Back</Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!formData.skills || !formData.bio}
                  className="flex-1 h-14 rounded-full font-bold bg-indigo-600 hover:bg-indigo-700 group shadow-2xl shadow-indigo-500/30"
                >
                  Finalize <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 text-center py-6 animate-in zoom-in duration-500">
              <div className="relative mx-auto h-28 w-28">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                <div className="relative h-28 w-28 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl">
                  <CheckCircle2 className="h-14 w-14" />
                </div>
              </div>
              <div className="space-y-3 max-w-sm mx-auto">
                <p className="text-2xl font-black tracking-tight">Identity Synced</p>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">Your professional hub profile is now active and synchronized across the network.</p>
              </div>
              <Button 
                onClick={handleComplete} 
                disabled={loading}
                className="w-full h-16 rounded-full font-black text-lg bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-500/40"
              >
                {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6" />}
                Enter Hub
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
