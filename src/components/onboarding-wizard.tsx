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
import { User, Sparkles, ArrowRight, CheckCircle2, Loader2, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
      
      // 1. Update Firebase Auth Profile (Sync)
      await updateProfile(user, { 
        displayName: `${formData.firstName} ${formData.lastName}`,
        photoURL: formData.photoURL || null
      });

      // 2. Update Firestore Profile (Non-blocking as per guidelines)
      const profileData = {
        id: user.uid,
        email: user.email || '',
        firstName: formData.firstName,
        lastName: formData.lastName,
        headline: formData.headline,
        bio: formData.bio,
        location: formData.location,
        skillIds: skillsArray,
        profilePictureUrl: formData.photoURL,
        availabilityStatus: 'Available',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      };

      const docRef = doc(db, 'freelancers', user.uid);
      setDoc(docRef, profileData, { merge: true })
        .catch(async (error) => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: docRef.path,
            operation: 'create',
            requestResourceData: profileData,
          }));
        });

      onComplete();
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Setup Failed",
        description: e.message || "Could not finalize your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />

      <Card className="w-full max-w-2xl border-none shadow-2xl rounded-[40px] overflow-hidden relative z-10">
        <div className="flex h-1.5 bg-secondary">
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

        <CardHeader className="p-10 pb-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-6">
            <div className="h-10 w-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Onboarding Protocol</span>
          </div>
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CardTitle className="text-3xl font-bold tracking-tight mb-2">Basic Identity</CardTitle>
              <CardDescription className="text-base">Let's set up the core of your professional profile.</CardDescription>
            </div>
          )}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CardTitle className="text-3xl font-bold tracking-tight mb-2">Professional Depth</CardTitle>
              <CardDescription className="text-base">Tell us about your skills and where you are located.</CardDescription>
            </div>
          )}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CardTitle className="text-3xl font-bold tracking-tight mb-2">Ready to Launch</CardTitle>
              <CardDescription className="text-base">Your identity is being synchronized with the global network.</CardDescription>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-10 pt-4">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 mb-4">
                <div className="relative group cursor-pointer" onClick={handleImageClick}>
                  <Avatar className="h-28 w-28 border-4 border-indigo-50 shadow-xl transition-all group-hover:opacity-80">
                    {formData.photoURL ? (
                      <AvatarImage src={formData.photoURL} />
                    ) : (
                      <AvatarFallback className="bg-secondary">
                        <User className="h-12 w-12 text-muted-foreground" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute bottom-1 right-1 p-2 bg-indigo-600 rounded-full text-white shadow-lg border-2 border-white">
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                  </div>
                </div>
                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Upload Avatar</Label>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">First Name</Label>
                  <Input 
                    id="first" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="rounded-xl h-12" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last Name</Label>
                  <Input 
                    id="last" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="rounded-xl h-12" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="headline" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Professional Headline</Label>
                <Input 
                  id="headline" 
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g. Senior Product Designer" 
                  className="rounded-xl h-12" 
                />
              </div>
              <Button 
                onClick={() => setStep(2)} 
                disabled={!formData.firstName || !formData.lastName}
                className="w-full h-12 rounded-full font-bold bg-indigo-600 hover:bg-indigo-700 mt-4 group shadow-lg shadow-indigo-500/20"
              >
                Continue Setup <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
               <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loc" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</Label>
                  <Input 
                    id="loc" 
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. London, UK"
                    className="rounded-xl h-12" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Skills (Comma separated)</Label>
                  <Input 
                    id="skills" 
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="React, UI, UX..." 
                    className="rounded-xl h-12" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Short Bio / Experience</Label>
                <Textarea 
                  id="bio" 
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Briefly describe your professional background..." 
                  className="rounded-2xl min-h-[150px] pt-4" 
                />
              </div>
              <div className="flex gap-4 mt-4">
                <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full px-8">Back</Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!formData.skills || !formData.bio}
                  className="flex-1 h-12 rounded-full font-bold bg-indigo-600 hover:bg-indigo-700 group shadow-lg shadow-indigo-500/20"
                >
                  Finalize Identity <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 text-center py-4">
              <div className="relative mx-auto h-24 w-24">
                <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping" />
                <div className="relative h-24 w-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
              </div>
              <div className="space-y-4 max-w-sm mx-auto">
                <p className="text-xl font-bold tracking-tight">Identity Synced</p>
                <p className="text-muted-foreground">Your profile is now live. TalentLink AI is analyzing current opportunities for your specific skill set.</p>
              </div>
              <Button 
                onClick={handleComplete} 
                disabled={loading}
                className="w-full h-14 rounded-full font-bold text-lg bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-500/10"
              >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                Enter Hub
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
