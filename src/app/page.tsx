import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Target, ShieldCheck, Cpu } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild className="hidden sm:inline-flex font-medium">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 rounded-full px-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20 uppercase tracking-widest animate-fade-in">
                <Cpu className="h-3.5 w-3.5" />
                <span>Precision Engineering for Global Talent</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-foreground">
                Hire Elite Talent with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI Precision.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
                TalentLink AI bridges the gap between ambitious companies and the world's top 1% of creative and technical experts using neural matching.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild className="h-14 px-8 text-base font-bold rounded-full group">
                  <Link href="/dashboard">
                    Find Matches <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold rounded-full border-2">
                  Post a Project
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-muted-foreground/60 grayscale opacity-80">
                <span className="font-bold text-lg">VERCEL</span>
                <span className="font-bold text-lg">OPENAI</span>
                <span className="font-bold text-lg">STRIPE</span>
                <span className="font-bold text-lg">LINEAR</span>
              </div>
            </div>
          </div>
          
          {/* Subtle Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10" />
        </section>

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