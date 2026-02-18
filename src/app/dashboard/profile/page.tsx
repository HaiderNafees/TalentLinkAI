'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
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
import { Loader2, Save, User, Camera } from 'lucide-react';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      if (file.size > 1024 * 1024) { // 1MB limit for demo Base64 storage
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image smaller than 1MB.",
        });
        return;
      }

      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          // Update Firebase Auth Profile
          await updateProfile(user, { photoURL: base64String });
          
          // Update Firestore Profile
          await setDoc(doc(db, 'freelancers', user.uid), {
            profilePictureUrl: base64String,
            updatedDate: new Date().toISOString(),
          }, { merge: true });

          toast({
            title: "Photo Updated",
            description: "Your professional avatar has been synchronized.",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Upload Failed",
            description: "Could not update profile picture.",
          });
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
        title: "Profile Updated",
        description: "Your professional details have been successfully saved.",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "An error occurred while saving your profile.",
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
        title="Professional Identity"
        subtitle="Manage your profile information and visibility settings."
      />
      
      <Card className="rounded-[40px] border-none shadow-xl overflow-hidden">
        <CardHeader className="bg-indigo-500/5 p-8 border-b">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="h-28 w-28 border-4 border-background shadow-lg transition-all group-hover:opacity-80">
                {user?.photoURL ? (
                  <AvatarImage src={user.photoURL} alt={formData.firstName || 'User'} />
                ) : (
                  <AvatarFallback className="bg-indigo-600 text-white text-3xl font-bold">
                    {formData.firstName?.[0] || <User className="h-10 w-10" />}
                  </AvatarFallback>
                )}
              </Avatar>
              <button 
                onClick={handleImageClick}
                disabled={isUploading}
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {isUploading ? <Loader2 className="h-6 w-6 text-white animate-spin" /> : <Camera className="h-6 w-6 text-white" />}
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">{formData.firstName} {formData.lastName}</CardTitle>
              <CardDescription className="text-indigo-600 font-medium">{formData.title || 'Professional Expert'}</CardDescription>
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
              placeholder="e.g. Senior Software Architect" 
              className="rounded-xl h-12" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills" className="text-xs font-bold uppercase tracking-widest opacity-70">Skills (Comma Separated)</Label>
            <Textarea
              id="skills"
              placeholder="React, TypeScript, Node.js..."
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="min-h-[80px] rounded-2xl pt-4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience" className="text-xs font-bold uppercase tracking-widest opacity-70">Experience Summary</Label>
            <Textarea
              id="experience"
              placeholder="Briefly describe your career highlights..."
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="min-h-[200px] rounded-2xl pt-4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio" className="text-xs font-bold uppercase tracking-widest opacity-70">Portfolio / Personal Website</Label>
            <Input 
              id="portfolio" 
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="https://yourportfolio.com" 
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
              Update Identity Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
