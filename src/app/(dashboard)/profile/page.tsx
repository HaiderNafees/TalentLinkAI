import { freelancerProfile } from '@/lib/data';
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

export default function ProfilePage() {
  const user = freelancerProfile;

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Profile"
        subtitle="Keep your profile updated to get the best job matches."
      />
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            This information will be used by the AI to match you with jobs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} data-ai-hint="person avatar" />
              <AvatarFallback>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Photo</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input id="title" defaultValue={user.title} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Textarea
              id="skills"
              placeholder="e.g., React, TypeScript, Node.js..."
              defaultValue={user.skills.join(', ')}
              className="min-h-[80px]"
            />
            <p className="text-sm text-muted-foreground">
              Separate skills with commas.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Experience Summary</Label>
            <Textarea
              id="experience"
              placeholder="Summarize your professional experience..."
              defaultValue={user.experience}
              className="min-h-[200px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio URL</Label>
            <Input id="portfolio" defaultValue={user.portfolioUrl} />
          </div>
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
