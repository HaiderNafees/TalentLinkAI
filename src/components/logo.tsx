import Link from 'next/link';
import { Command } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
      <div className="bg-foreground text-background p-1.5 rounded-md flex items-center justify-center shadow-sm">
        <Command className="h-5 w-5" />
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        TalentLink<span className="text-muted-foreground/60">AI</span>
      </span>
    </Link>
  );
}