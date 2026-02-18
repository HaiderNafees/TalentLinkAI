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
import { Loader2, Save, User, Camera, Globe, MapPin, Briefcase } from 'lucide-react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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
    headline: '',
    bio: '',
    skills: '',
    location: '',
    websiteUrl: '',
    linkedInUrl: '',
    hourlyRate: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        headline: profile.headline || '',
        bio: profile.bio || '',
        skills: Array.isArray(profile.skillIds) ? profile.skillIds.join(', ') : '',
        location: profile.location || '',
        websiteUrl: profile.websiteUrl || '',
        linkedInUrl: profile.linkedInUrl || '',
        hourlyRate: profile.hourlyRate?.toString() || '',
      });
    }
  }, [profile]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user && db) {
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
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          await updateProfile(user, { photoURL: base64String });
          
          const profileDoc = doc(db, 'freelancers', user.uid);
          setDoc(profileDoc, {
            profilePictureUrl: base64String,
            updatedDate: new Date().toISOString(),
          }, { merge: true })
            .catch((error) => {
              errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: profileDoc.path,
                operation: 'update',
                requestResourceData: { profilePictureUrl: base64String },
              }));
            });

          toast({
            title: "Avatar Updated",
            description: "Your professional visual identity has been synchronized.",
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Update Failed",
            description: "Could not synchronize profile picture.",
          });
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSave() {
    if (!user || !db) return;
    setIsSaving(true);
    
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      headline: formData.headline,
      bio: formData.bio,
      skillIds: skillsArray,
      location: formData.location,
      websiteUrl: formData.websiteUrl,
      linkedInUrl: formData.linkedInUrl,
      hourlyRate: parseFloat(formData.hourlyRate) || 0,
      updatedDate: new Date().toISOString(),
    };

    const profileDoc = doc(db, 'freelancers', user.uid);
    setDoc(profileDoc, updateData, { merge: true })
      .then(() => {
        toast({
          title: "Identity Synchronized",
          description: "Your professional data has been successfully persisted.",
        });
      })
      .catch((error) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: profileDoc.path,
          operation: 'update',
          requestResourceData: updateData,
        }));
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-20">
      <PageHeader
        title="Professional Identity"
        subtitle="Manage your visibility and technical profile data."
      />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="rounded-[32px] overflow-hidden border-none shadow-xl bg-card">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-background shadow-2xl transition-all group-hover:opacity-90">
                  {user?.photoURL ? (
                    <AvatarImage src={user.photoURL} alt={formData.firstName || 'User'} />
                  ) : (
                    <AvatarFallback className="bg-indigo-600 text-white text-4xl font-bold">
                      {formData.firstName?.[0] || <User className="h-12 w-12" />}
                    </AvatarFallback>
                  )}
                </Avatar>
                <button 
                  onClick={handleImageClick}
                  disabled={isUploading}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {isUploading ? <Loader2 className="h-8 w-8 text-white animate-spin" /> : <Camera className="h-8 w-8 text-white" />}
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
                <h3 className="text-xl font-bold">{formData.firstName} {formData.lastName}</h3>
                <p className="text-indigo-600 font-medium text-sm">{formData.headline || 'Talent Member'}</p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {formData.location || 'Location not set'}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-none shadow-sm bg-indigo-500/[0.03]">
             <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Visibility
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Hub Status</span>
                  <span className="font-bold text-green-500">Visible</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Match Rating</span>
                  <span className="font-bold">Elite</span>
                </div>
             </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-2 rounded-[32px] border-none shadow-xl overflow-hidden">
          <CardHeader className="bg-indigo-500/[0.02] p-8 border-b">
            <CardTitle className="text-lg">Core Profile Data</CardTitle>
            <CardDescription>All changes are synchronized with the neural matching engine.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">First Name</Label>
                <Input 
                  id="first" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="rounded-xl h-11" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last Name</Label>
                <Input 
                  id="last" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="rounded-xl h-11" 
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label htmlFor="headline" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Professional Headline</Label>
                  <Input 
                    id="headline" 
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    placeholder="e.g. Lead Developer" 
                    className="rounded-xl h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loc" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Location</Label>
                  <Input 
                    id="loc" 
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, Country" 
                    className="rounded-xl h-11" 
                  />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Skills (Comma Separated)</Label>
              <Input 
                id="skills" 
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, TypeScript, Node.js..." 
                className="rounded-xl h-11" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Bio / Experience</Label>
              <Textarea
                id="bio"
                placeholder="Summarize your professional highlights..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="min-h-[160px] rounded-2xl pt-4"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
               <div className="space-y-2">
                  <Label htmlFor="portfolio" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5"><Globe className="h-3 w-3" /> Website</Label>
                  <Input 
                    id="portfolio" 
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://..." 
                    className="rounded-xl h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="li" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">LinkedIn</Label>
                  <Input 
                    id="li" 
                    value={formData.linkedInUrl}
                    onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/..." 
                    className="rounded-xl h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hourly Rate ($)</Label>
                  <Input 
                    id="rate" 
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    placeholder="0" 
                    className="rounded-xl h-11" 
                  />
                </div>
            </div>

            <div className="pt-6 flex justify-end">
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="rounded-full h-12 px-12 font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20"
              >
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Persist Profile Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
