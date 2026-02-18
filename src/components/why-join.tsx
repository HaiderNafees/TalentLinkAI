import { Sparkles, Target, Zap, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <Target className="h-12 w-12 text-primary" strokeWidth={1.5} />,
    title: 'Precision AI Matching',
    description:
      "Our bidirectional neural engine analyzes deep skill sets and project nuances to ensure 99% compatibility for every contract.",
  },
  {
    icon: <Lightbulb className="h-12 w-12 text-accent" strokeWidth={1.5} />,
    title: 'Generative Gig Ideation',
    description:
      'Stuck on a brief or proposal? Our AI generates perfect project ideas and optimized job descriptions to attract elite talent.',
  },
  {
    icon: <Zap className="h-12 w-12 text-primary" strokeWidth={1.5} />,
    title: 'Automated Optimization',
    description:
      'The AI continuously learns from your history, automatically suggesting profile improvements to help you land premium rates.',
  },
  {
    icon: <Sparkles className="h-12 w-12 text-accent" strokeWidth={1.5} />,
    title: 'Creative Co-Pilot',
    description:
      'Beyond matching, get AI-driven insights on market trends, competitive pricing, and high-demand skills in real-time.',
  },
];

export default function WhyJoin() {
  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="font-bold text-primary tracking-[0.2em] uppercase text-sm">
            The AI Advantage
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground tracking-tight">
            Smarter Matching. <span className="text-primary">Infinite Ideas.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Freelance Outlier isn't just a job board. It's a dual-sided intelligence platform designed to maximize productivity for both builders and creators.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-background hover:bg-card border-border/50 hover:border-primary/50 transition-all duration-500 group"
            >
              <CardContent className="p-8 flex flex-col items-start text-left">
                <div className="mb-6 p-3 rounded-2xl bg-muted group-hover:bg-primary/10 transition-colors duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
