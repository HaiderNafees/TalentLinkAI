import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group transition-all">
      <div className="relative flex items-center justify-center h-10 w-10 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
        <ShieldCheck className="h-6 w-6 text-white stroke-[2.5px]" />
        <div className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-indigo-400 rounded-full border-2 border-background animate-pulse" />
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="text-xl font-black tracking-tight text-foreground leading-none">
          TalentLink<span className="text-indigo-600">AI</span>
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-muted-foreground/60">
          Professional Hub
        </span>
      </div>
    </Link>
  );
}