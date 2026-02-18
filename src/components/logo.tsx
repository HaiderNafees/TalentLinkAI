import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group transition-all">
      <div className="relative flex items-center justify-center h-9 w-9 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
        <Shield className="h-5 w-5 text-white stroke-[2.5px]" />
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-indigo-400 rounded-full border-2 border-background animate-pulse" />
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="text-lg font-bold tracking-tight text-foreground leading-none">
          TalentLink<span className="text-indigo-600">AI</span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
          Neural Core
        </span>
      </div>
    </Link>
  );
}
