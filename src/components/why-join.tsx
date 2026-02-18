import { Sparkles, Target, Zap, Lightbulb, Brain, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: 'Neural Matchmaking',
    description:
      "Our AI doesn't just keywords search; it understands skills, project depth, and company culture for a 99% success rate.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-accent" />,
    title: 'Gig Intelligence',
    description:
      'Get AI-powered insights on how to frame your profile or project brief to attract the perfect collaborator.',
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Instant Calibration',
    description:
      'Market trends change fast. Our platform updates your profile strengths in real-time based on live hiring data.',
  },
  {
    icon: <Layers className="h-8 w-8 text-accent" />,
    title: 'End-to-End Synergy',
    description:
      'From AI-drafted contracts to skill verification, every step is optimized for speed and professional precision.',
  },
];

export default function WhyJoin() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="font-bold text-primary tracking-[0.2em] uppercase text-xs">
            The Intelligence Edge
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Smarter Connections. <span className="text-primary">Better Results.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            TalentLink AI is a professional ecosystem designed to maximize the productive output of every partnership.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card hover:shadow-xl transition-all duration-500 border-none group overflow-hidden"
            >
              <CardContent className="p-10 flex flex-col items-start text-left space-y-6">
                <div className="p-3 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500">
                  {feature.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}