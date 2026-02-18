'use server';
/**
 * @fileOverview AI flow to suggest "perfect gig" ideas based on freelancer skills.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGigIdeaInputSchema = z.object({
  skills: z.array(z.string()),
  experience: z.string(),
});
export type GenerateGigIdeaInput = z.infer<typeof GenerateGigIdeaInputSchema>;

const GenerateGigIdeaOutputSchema = z.object({
  title: z.string().describe('A catchy, high-value title for the gig idea.'),
  description: z.string().describe('A detailed description of the service or project.'),
  marketValue: z.string().describe('Estimated market rate (e.g., $150/hr).'),
  whyNow: z.string().describe('Why this specific idea is trending or high-demand right now.'),
});
export type GenerateGigIdeaOutput = z.infer<typeof GenerateGigIdeaOutputSchema>;

export async function generateGigIdea(input: GenerateGigIdeaInput): Promise<GenerateGigIdeaOutput> {
  const {output} = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    input: {
      schema: GenerateGigIdeaInputSchema,
      data: input
    },
    output: {
      schema: GenerateGigIdeaOutputSchema,
    },
    prompt: `Based on the following skills and experience, suggest a "Perfect Gig" or niche specialization that the freelancer should offer to maximize their earnings and impact in the current AI-driven market.
    
    Skills: {{{skills}}}
    Experience: {{{experience}}}
    
    Be creative and identify high-value niches that combine these technical skills with business value.`
  });
  return output!;
}
