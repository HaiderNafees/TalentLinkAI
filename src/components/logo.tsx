import Link from 'next/link';
import { Command } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group transition-all duration-300">
      <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
        <Command className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold tracking-tight font-headline text-foreground">
        TalentLink<span className="text-primary">AI</span>
      </span>
    </Link>
  );
}