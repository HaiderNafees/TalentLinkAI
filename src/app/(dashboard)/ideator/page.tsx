
'use client';

import { useState } from 'react';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Sparkles, Target, Zap, Plus, Trash2 } from 'lucide-react';

const skillSuggestions = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 
  'AWS', 'Docker', 'GraphQL', 'PostgreSQL', 'MongoDB'
];

export default function IdeatorPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title="Gig Ideator"
        subtitle="Transform your expertise into compelling project opportunities."
      />

      <div className="grid gap-8">
        <Card className="rounded-[32px] border-none shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Project Blueprint Generator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Project Title</label>
                <Input
                  placeholder="e.g., E-commerce Platform Redesign"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-xl h-12"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Project Description</label>
                <Textarea
                  placeholder="Describe the project scope, goals, and deliverables..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-xl min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Budget Range</label>
                  <Input
                    placeholder="e.g., $5,000 - $10,000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="rounded-xl h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Duration</label>
                  <Input
                    placeholder="e.g., 4-6 weeks"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="rounded-xl h-12"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">Required Skills</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1 flex items-center gap-1">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillSuggestions.filter(s => !skills.includes(s)).map((skill) => (
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
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="flex-1 rounded-xl h-12 font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate with AI
              </Button>
              <Button variant="outline" className="rounded-xl h-12 font-bold">
                Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Optimization Tips</h3>
                <p className="text-sm text-muted-foreground">Get better matches with these suggestions</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Be specific about deliverables and timelines</p>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Include required experience level</p>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">Specify communication preferences</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
