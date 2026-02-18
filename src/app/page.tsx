import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, Zap, Brain, ShieldCheck, Globe, Sparkles } from 'lucide-react';
import Logo from '@/components/logo';
import ExpertsMarquee from '@/components/experts-marquee';
import HowItWorks from '@/components/how-it-works';
import WhyJoin from '@/components/why-join';
import Testimonials from '@/components/testimonials';
import HowToApply from '@/components/how-to-apply';
import Faq from '@/components/faq';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild className="hidden sm:inline-flex font-semibold">
              <Link href="/login">Portal Access</Link>
            </Button>
            <Button asChild className="rounded-full px-8 font-bold transition-all duration-300 shadow-lg shadow-indigo-500/20">
              <Link href="/signup">Join Network</Link>
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-40 md:pb-40 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 text-[10px] font-bold border border-indigo-200 uppercase tracking-[0.2em] animate-in fade-in slide-in-from-top-4 duration-1000">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next-Generation Neural Matching</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.95] text-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                The Intelligence Core of the <span className="text-muted-foreground/40">Global Workforce.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                TalentLink AI bridges the gap between high-performance experts and visionary projects through autonomous neural synchronization.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                <Button size="lg" asChild className="h-16 px-12 text-lg font-bold rounded-full group shadow-2xl shadow-indigo-500/30">
                  <Link href="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-12 text-lg font-bold rounded-full border-2 hover:bg-secondary/50">
                  Post a Project
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 pt-20 text-muted-foreground/30 font-bold uppercase tracking-[0.25em] text-xs">
                <span className="hover:text-foreground transition-colors cursor-default">Vercel</span>
                <span className="hover:text-foreground transition-colors cursor-default">Anthropic</span>
                <span className="hover:text-foreground transition-colors cursor-default">OpenAI</span>
                <span className="hover:text-foreground transition-colors cursor-default">Stripe</span>
              </div>
            </div>
          </div>
          
          {/* Decorative background effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none opacity-20 dark:opacity-40">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
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