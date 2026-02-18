'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import PageHeader from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, User } from 'lucide-react';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const profileRef = useMemoFirebase(() => (user ? doc(db, 'freelancers', user.uid) : null), [db, user]);
  const { data: profile, isLoading: isProfileLoading } = useDoc(profileRef);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    skills: '',
    experience: '',
    websiteUrl: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        title: profile.title || '',
        skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : '',
        experience: profile.experience || '',
        websiteUrl: profile.websiteUrl || '',
      });
    }
  }, [profile]);

  async function handleSave() {
    if (!user) return;
    setIsSaving(true);
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
      await setDoc(doc(db, 'freelancers', user.uid), {
        ...profile,
        firstName: formData.firstName,
        lastName: formData.lastName,
        title: formData.title,
        skills: skillsArray,
        experience: formData.experience,
        websiteUrl: formData.websiteUrl,
        updatedDate: new Date().toISOString(),
      }, { merge: true });

      toast({
        title: "Sync Successful",
        description: "Your Neural Profile has been updated in the cloud.",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Sync Error",
        description: "Failed to update profile context.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <PageHeader
        title="Intelligence Identity"
        subtitle="Calibrate your core profile to maintain precision matching."
      />
      
      <Card className="rounded-[40px] border-none shadow-xl overflow-hidden">
        <CardHeader className="bg-indigo-500/5 p-8 border-b">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={user?.photoURL || ''} />
              <AvatarFallback className="bg-indigo-600 text-white text-3xl font-bold">
                {formData.firstName?.[0] || <User />}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">{formData.firstName} {formData.lastName}</CardTitle>
              <CardDescription className="text-indigo-600 font-medium">{formData.title || 'Elite Professional'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
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
            <Label htmlFor="headline" className="text-xs font-bold uppercase tracking-widest opacity-70">Professional Headline</Label>
            <Input 
              id="headline" 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Senior Generative UI Engineer" 
              className="rounded-xl h-12" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills" className="text-xs font-bold uppercase tracking-widest opacity-70">Capabilities (Comma Separated)</Label>
            <Textarea
              id="skills"
              placeholder="React, Next.js, AI, etc."
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="min-h-[80px] rounded-2xl pt-4"
            />
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              AI uses these tokens to rank you in the global feed.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience" className="text-xs font-bold uppercase tracking-widest opacity-70">Neural Experience Summary</Label>
            <Textarea
              id="experience"
              placeholder="Summarize your professional journey..."
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="min-h-[200px] rounded-2xl pt-4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio" className="text-xs font-bold uppercase tracking-widest opacity-70">External Hub URL (Portfolio/Website)</Label>
            <Input 
              id="portfolio" 
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="https://..." 
              className="rounded-xl h-12" 
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="rounded-full h-12 px-10 font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20"
            >
              {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Profile Identity
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
