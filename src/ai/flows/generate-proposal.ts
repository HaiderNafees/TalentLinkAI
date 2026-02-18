'use server';
/**
 * @fileOverview AI flow to generate a tailored job proposal.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProposalInputSchema = z.object({
  freelancerProfile: z.object({
    name: z.string(),
    skills: z.array(z.string()),
    experience: z.string(),
  }),
  jobPosting: z.object({
    title: z.string(),
    company: z.string(),
    description: z.string(),
  }),
});
export type GenerateProposalInput = z.infer<typeof GenerateProposalInputSchema>;

const GenerateProposalOutputSchema = z.object({
  proposal: z.string().describe('The generated proposal text.'),
  keySellingPoints: z.array(z.string()).describe('Bullet points highlighting why this freelancer is a perfect match.'),
});
export type GenerateProposalOutput = z.infer<typeof GenerateProposalOutputSchema>;

export async function generateProposal(input: GenerateProposalInput): Promise<GenerateProposalOutput> {
  const {output} = await ai.generate({
    model: 'googleai/gemini-2.5-flash',
    input: {
      schema: GenerateProposalInputSchema,
      data: input
    },
    output: {
      schema: GenerateProposalOutputSchema,
    },
    prompt: `You are an expert career agent. Generate a highly persuasive, professional job proposal.
    
    Freelancer: {{{freelancerProfile.name}}}
    Skills: {{{freelancerProfile.skills}}}
    Experience: {{{freelancerProfile.experience}}}
    
    Job: {{{jobPosting.title}}} at {{{jobPosting.company}}}
    Description: {{{jobPosting.description}}}
    
    The proposal should be concise, highlight specific alignment between skills and the job, and maintain a confident, professional tone.`
  });
  return output!;
}
