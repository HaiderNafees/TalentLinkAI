import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: 'How does the AI matching work?',
    answer:
      "Our advanced AI analyzes your profile, skills, and experience against thousands of job postings. It calculates a compatibility score for each opportunity, ensuring you see the most relevant jobs first. This saves you time and increases your chances of landing a project you'll love.",
  },
  {
    question: 'What kind of freelance jobs can I find on Outlier?',
    answer:
      'Freelance Outlier specializes in high-quality roles in the tech and creative industries. You can find opportunities in software development, UI/UX design, data science, AI engineering, content creation, digital marketing, and more. We partner with both innovative startups and established companies.',
  },
  {
    question: 'Is there a fee to join Freelance Outlier?',
    answer:
      'It is completely free for freelancers to create a profile, browse jobs, and receive AI-powered recommendations. We charge a small platform fee only when you successfully start a paid project with a client you connected with through Outlier.',
  },
  {
    question: 'How do I get paid by clients?',
    answer:
      'We provide a secure payment system to handle all transactions. Once you and a client agree on project terms, the client funds an escrow account. Funds are released to you upon completion of project milestones. This ensures you are paid on time, every time.',
  },
  {
    question: 'How do you verify the quality of freelancers and clients?',
    answer:
      'We have a multi-step verification process. Freelancers are asked to complete skill tests and identity verification. Clients are vetted based on their company history and project details. This helps maintain a high-trust, high-quality marketplace for everyone.',
  },
];

export default function Faq() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Have questions? We've got answers. If you can't find what you're
            looking for, feel free to contact us.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="bg-card/50 border border-border/70 rounded-lg px-6"
              >
                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2">
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
