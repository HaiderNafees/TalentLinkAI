import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'How does the neural matching algorithm work?',
    answer:
      "Our core AI, the TalentLink Neural Core, analyzes hundreds of data points including code complexity, project impact, and collaborative history. It doesn't just match keywords; it understands the specific technical 'DNA' of both the expert and the project brief to ensure a 99% precision match.",
  },
  {
    question: 'What types of roles are available on TalentLink AI?',
    answer:
      'We focus on high-impact roles in the AI-native tech landscape: Generative UI/UX, LLM Engineering, Data Science, Scalable Architecture, and Product Strategy. We partner with elite labs (Vercel, Anthropic, OpenAI) and high-growth startups.',
  },
  {
    question: 'How does the AI help me with gig ideation?',
    answer:
      'For experts, our AI analyzes market gaps and technical trends to suggest "Perfect Gigs" or niche specializations you can offer. It acts as a professional agent, helping you position your skills where the demand is highest.',
  },
  {
    question: 'How are payments and contracts handled?',
    answer:
      'Everything is automated. Once a neural match is confirmed, an AI-drafted contract is generated for both parties. Payments are handled via a secure platform-managed escrow, releasing funds upon verified technical milestone completion.',
  },
  {
    question: 'What is the "Skill Calibration" process?',
    answer:
      'Unlike standard testing, Calibration uses adaptive challenges that react to your solving style. It measures not just whether you can solve a problem, but how efficiently and creatively you approach it, leading to higher confidence matches for high-paying roles.',
  },
];

export default function Faq() {
  return (
    <section className="py-24 md:py-32 bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <p className="font-bold text-indigo-500 tracking-[0.2em] uppercase text-[10px]">
            Knowledge Base
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Frequently Asked <span className="text-muted-foreground">Questions.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about the future of intelligent work.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="bg-card/30 border border-border/80 rounded-[24px] px-8 transition-all hover:border-indigo-500/30 hover:bg-card/50"
              >
                <AccordionTrigger className="text-lg md:text-xl font-bold text-left hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-muted-foreground leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}