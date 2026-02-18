import PageHeader from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { BellRing, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const clientAvatar = PlaceHolderImages.find((p) => p.id === 'client-avatar-1');

const notifications = [
  {
    icon: <Sparkles className="h-5 w-5 text-accent" />,
    title: 'New Job Match: Senior Next.js Engineer at Vercel',
    time: '5m ago',
    read: false,
  },
  {
    icon: <BellRing className="h-5 w-5 text-primary" />,
    title: "Your application for 'React Developer' was viewed",
    time: '1h ago',
    read: false,
  },
  {
    icon: (
      <Avatar className="h-8 w-8">
        <AvatarImage src={clientAvatar?.imageUrl ?? ''} data-ai-hint="person avatar" />
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
    ),
    title: "New Message from 'Client at Shopify'",
    time: '3h ago',
    read: true,
  },
  {
    icon: <Sparkles className="h-5 w-5 text-accent" />,
    title: 'New Job Match: UI/UX Designer at InVision',
    time: '1d ago',
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Notifications"
        subtitle="Stay updated on your job search."
      />
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 ${
                  !notification.read ? 'bg-secondary/50' : ''
                }`}
              >
                <div className="mt-1">{notification.icon}</div>
                <div className="flex-1">
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <Badge
                    variant="default"
                    className="h-2 w-2 p-0 rounded-full bg-primary self-center"
                  ></Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
