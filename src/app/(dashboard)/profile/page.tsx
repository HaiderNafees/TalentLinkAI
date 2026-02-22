
'use client';

import { useState } from 'react';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Edit2, Save, Plus, Trash2, Camera } from 'lucide-react';

const skillOptions = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 
  'AWS', 'Docker', 'GraphQL', 'PostgreSQL', 'MongoDB',
  'UI/UX Design', 'Project Management', 'DevOps', 'Mobile Development'
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Full-stack developer with 5+ years of experience building scalable web applications.',
    hourlyRate: '75',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  });

  const addSkill = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({ 
      ...formData, 
      skills: formData.skills.filter(skill => skill !== skillToRemove) 
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start">
        <PageHeader
          title="Identity Profile"
          subtitle="Manage your professional identity and expertise."
        />
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="rounded-xl"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-8">
        <Card className="rounded-[32px] border-none shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    {formData.firstName[0]}{formData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">
                  {formData.firstName} {formData.lastName}
                </h2>
                <p className="text-muted-foreground mb-2">{formData.location}</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="rounded-full">
                    ${formData.hourlyRate}/hr
                  </Badge>
                  <Badge variant="outline" className="rounded-full text-green-600 border-green-200">
                    Available
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">First Name</label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Last Name</label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Hourly Rate (USD)</label>
                <Input
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 block">Website</label>
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-none shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Professional Bio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              className="rounded-xl min-h-[120px]"
              placeholder="Tell clients about your experience, expertise, and what makes you unique..."
            />
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-none shadow-xl">
          <CardHeader>
            <CardTitle>Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1 flex items-center gap-1">
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex flex-wrap gap-2">
                {skillOptions.filter(s => !formData.skills.includes(s)).map((skill) => (
                  <Button
                    key={skill}
                    variant="outline"
                    size="sm"
                    onClick={() => addSkill(skill)}
                    className="rounded-full text-xs h-8"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {skill}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
