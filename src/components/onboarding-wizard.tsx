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
import { User, Sparkles, ArrowRight, CheckCircle2, Loader2, Camera, Upload } from 'lucide-react';
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
    title: '',
    skills: '',
    experience: '',
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
    if (!user) return;
    setLoading(true);
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
      
      // Update Firebase Auth Profile (Photo and Name)
      await updateProfile(user, { 
        displayName: `${formData.firstName} ${formData.lastName}`,
        photoURL: formData.photoURL || null
      });

      // Update Firestore Profile
      await setDoc(doc(db, 'freelancers', user.uid), {
        id: user.uid,
        email: user.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        skills: skillsArray,
        experience: formData.experience,
        profilePictureUrl: formData.photoURL,
        availabilityStatus: 'Available',
        createdDate: new Date().toISOString(),
      });
      onComplete();
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Setup Failed",
        description: "Could not finalize your profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />

      <Card className="w-full max-w-2xl border-none shadow-2xl rounded-[32px] overflow-hidden relative z-10">
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

        <CardHeader className="p-10 pb-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Talent Identity Setup</span>
          </div>
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CardTitle className="text-3xl font-bold tracking-tight mb-2">Who are you?</CardTitle>
              <CardDescription className="text-base">Start your journey by introducing yourself to the network.</CardDescription>
            </div>
          )}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CardTitle className="text-3xl font-bold tracking-tight mb-2">Professional Depth</CardTitle>
              <CardDescription className="text-base">List your core technical capabilities and professional summary.</CardDescription>
            </div>
          )}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CardTitle className="text-3xl font-bold tracking-tight mb-2">Ready for Hub</CardTitle>
              <CardDescription className="text-base">Your professional identity is synchronized and active.</CardDescription>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-10 pt-4">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 mb-4">
                <div className="relative group cursor-pointer" onClick={handleImageClick}>
                  <Avatar className="h-24 w-24 border-2 border-indigo-100 shadow-md">
                    {formData.photoURL ? (
                      <AvatarImage src={formData.photoURL} />
                    ) : (
                      <AvatarFallback className="bg-secondary">
                        <User className="h-10 w-10 text-muted-foreground" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 rounded-full text-white shadow-lg">
                    {isUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Camera className="h-3.5 w-3.5" />}
                  </div>
                </div>
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Upload Profile Photo</Label>
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
                  <Label htmlFor="first" className="text-xs font-bold uppercase tracking-widest opacity-70">First Name</Label>
                  <Input 
                    id="first" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="rounded-xl h-12" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last" className="text-xs font-bold uppercase tracking-widest opacity-70">Last Name</Label>
                  <Input 
                    id="last" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                  placeholder="e.g. Lead Product Designer" 
                  className="rounded-xl h-12" 
                />
              </div>
              <Button 
                onClick={() => setStep(2)} 
                disabled={!formData.firstName || !formData.lastName}
                className="w-full h-12 rounded-full font-bold bg-indigo-600 hover:bg-indigo-700 mt-4 group"
              >
                Continue Setup <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-xs font-bold uppercase tracking-widest opacity-70">Expert Skills (Comma Separated)</Label>
                <Input 
                  id="skills" 
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="UI Design, Figma, React, Strategy..." 
                  className="rounded-xl h-12" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exp" className="text-xs font-bold uppercase tracking-widest opacity-70">Experience Summary</Label>
                <Textarea 
                  id="exp" 
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Briefly describe your career impact..." 
                  className="rounded-2xl min-h-[150px] pt-4" 
                />
              </div>
              <div className="flex gap-4 mt-4">
                <Button variant="ghost" onClick={() => setStep(1)} className="rounded-full px-8">Back</Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!formData.skills || !formData.experience}
                  className="flex-1 h-12 rounded-full font-bold bg-indigo-600 hover:bg-indigo-700 group"
                >
                  Finalize Identity <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 text-center py-4">
              <div className="relative mx-auto h-20 w-20">
                <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping" />
                <div className="relative h-20 w-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
              </div>
              <div className="space-y-4 max-w-sm mx-auto">
                <p className="text-lg text-muted-foreground font-medium">Identity synchronization complete. You are now visible to matching projects.</p>
              </div>
              <Button 
                onClick={handleComplete} 
                disabled={loading}
                className="w-full h-14 rounded-full font-bold text-lg bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/10"
              >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
                Access Intelligence Hub
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
