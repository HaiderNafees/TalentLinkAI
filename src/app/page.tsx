import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ExpertsMarquee from '@/components/experts-marquee';
import HowItWorks from '@/components/how-it-works';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter font-headline text-primary">
                Find Your Next Gig, Smarter.
              </h1>
              <p className="max-w-xl mx-auto md:mx-0 text-lg text-foreground/80">
                Freelance Outlier uses AI to sift through thousands of job
                postings and find the ones that perfectly match your skills and
                experience. Stop searching, start working.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Explore Jobs <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            {heroImage && (
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              </div>
            )}
          </div>
        </div>
        <ExpertsMarquee />
        <HowItWorks />
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} Freelance Outlier. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
