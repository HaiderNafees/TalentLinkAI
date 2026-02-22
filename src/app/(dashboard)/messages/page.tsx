'use client';

import PageHeader from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquareDashed } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Messages"
        subtitle="Communicate with potential clients securely."
      />
      <Card className="flex-1">
        <CardContent className="flex flex-col items-center justify-center h-[50vh] text-center">
          <MessageSquareDashed className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold">No messages yet</h2>
          <p className="text-muted-foreground mt-2">
            Your conversations with clients will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
