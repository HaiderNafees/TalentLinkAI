import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Briefcase className="h-7 w-7 text-primary" />
      <span className="text-xl font-semibold tracking-tight font-headline">
        Freelance Outlier
      </span>
    </Link>
  );
}
