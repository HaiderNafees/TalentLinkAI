import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import Logo from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ExpertsMarquee from '@/components/experts-marquee';
import HowItWorks from '@/components/how-it-works';
import WhyJoin from '@/components/why-join';
import Testimonials from '@/components/testimonials';
import HowToApply from '@/components/how-to-apply';
import Faq from '@/components/faq';
import Footer from '@/components/footer';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20">
                <Sparkles className="h-4 w-4" />
                <span>Next-Gen AI Workforce Matching</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter font-headline text-foreground leading-[1.1]">
                Your AI <span className="text-primary">Creative Partner</span> for Every Gig.
              </h1>
              <p className="max-w-xl mx-auto md:mx-0 text-xl text-muted-foreground leading-relaxed">
                Bidirectional AI matching that finds the perfect projects for freelancers and the ideal talent for clients. Let our AI ideate, optimize, and connect your next big move.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" asChild className="h-14 px-8 text-lg font-semibold">
                  <Link href="/dashboard">
                    Explore AI Matches <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold">
                  Post an AI-Optimized Job
                </Button>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-8 pt-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Instant Ideation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">99% Match Rate</span>
                </div>
              </div>
            </div>
            {heroImage && (
              <div className="relative aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-8 border-card/50">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  priority
                  data-ai-hint={heroImage.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20" />
                <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-md p-4 rounded-2xl border shadow-xl max-w-[240px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">AI Assistant Live</span>
                  </div>
                  <p className="text-sm font-medium italic">"I've found 3 high-probability matches for your UI skills and drafted a proposal for each."</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <ExpertsMarquee />
        <HowItWorks />
        <WhyJoin />
        <Testimonials />
        <HowToApply />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
