import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group transition-all hover:opacity-90">
      <div className="bg-indigo-600 text-white p-2 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
        <ShieldCheck className="h-5 w-5" />
      </div>
      <span className="text-xl font-extrabold tracking-tight text-foreground">
        TalentLink<span className="text-indigo-600">.ai</span>
      </span>
    </Link>
  );
}
