import { Diamond, Hourglass, Puzzle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <Puzzle className="h-12 w-12 text-foreground" strokeWidth={1.5} />,
    title: 'Find Your Perfect Fit',
    description:
      "Our AI analyzes your unique skills and experience to find jobs that perfectly match your profile and career goals.",
  },
  {
    icon: <Diamond className="h-12 w-12 text-foreground" strokeWidth={1.5} />,
    title: 'Access Premium Projects',
    description:
      'Get matched with high-quality, well-paid opportunities from top clients and leading companies in your industry.',
  },
  {
    icon: <Hourglass className="h-12 w-12 text-foreground" strokeWidth={1.5} />,
    title: 'Save Time on Searching',
    description:
      'Stop endlessly scrolling through job boards. Our intelligent system brings the most relevant opportunities directly to you.',
  },
  {
    icon: <TrendingUp className="h-12 w-12 text-foreground" strokeWidth={1.5} />,
    title: 'Grow Your Career',
    description:
      'Land better projects and command higher rates by building a strong profile with verified skills and successful job history.',
  },
];

export default function WhyJoin() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-semibold text-primary tracking-wider">
            WHY JOIN FREELANCE OUTLIER
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mt-2">
            Smarter Matching. More Freedom. Better Gigs.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Freelance Outlier's AI does the heavy lifting, so you can focus on
            what you do best. We connect top talent with premium projects,
            helping you build your portfolio and increase your earnings.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mt-16 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card/50 hover:bg-card border-border/50 hover:border-border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mt-6 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
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
