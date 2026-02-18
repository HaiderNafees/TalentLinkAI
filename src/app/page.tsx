import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, Zap, Brain, ShieldCheck, Globe } from 'lucide-react';
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
            <Button variant="ghost" asChild className="hidden sm:inline-flex font-medium">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="rounded-full px-6 transition-all duration-300">
              <Link href="/signup">Join the Network</Link>
            </Button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold border uppercase tracking-wider">
                <Cpu className="h-3.5 w-3.5" />
                <span>Next-Generation Neural Matching</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-foreground">
                The Intelligent Core of the <span className="text-muted-foreground">Global Workforce.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
                TalentLink AI uses advanced neural processing to connect elite experts with visionary projects. Precision matching, automated gig ideation, and end-to-end synergy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button size="lg" asChild className="h-14 px-10 text-base font-semibold rounded-full group">
                  <Link href="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-base font-semibold rounded-full">
                  Post a Brief
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-10 pt-16 text-muted-foreground/40 font-bold uppercase tracking-widest text-sm">
                <span>Vercel</span>
                <span>Anthropic</span>
                <span>OpenAI</span>
                <span>Stripe</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
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