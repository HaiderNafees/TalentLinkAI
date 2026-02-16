'use server';
/**
 * @fileOverview An AI agent that matches freelancer profiles to job postings.
 *
 * - matchJobToFreelancerProfile - A function that handles the job matching process.
 * - MatchJobToFreelancerProfileInput - The input type for the matchJobToFreelancerProfile function.
 * - MatchJobToFreelancerProfileOutput - The return type for the matchJobToFreelancerProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchJobToFreelancerProfileInputSchema = z.object({
  freelancerProfile: z.object({
    skills: z
      .array(z.string())
      .describe('A list of skills the freelancer possesses.'),
    experience: z
      .string()
      .describe('A detailed summary of the freelancer\u0027s professional experience.'),
  }),
  jobPosting: z.object({
    title: z.string().describe('The title of the job posting.'),
    description: z.string().describe('The full description of the job posting.'),
    requiredSkills: z
      .array(z.string())
      .describe('A list of skills strictly required for the job.'),
    preferredSkills: z
      .array(z.string())
      .optional()
      .describe('A list of skills that are preferred but not mandatory.'),
    experienceLevel: z
      .string()
      .describe('The required experience level for the job (e.g., \u0027Junior\u0027, \u0027Mid\u0027, \u0027Senior\u0027).'),
  }),
});
export type MatchJobToFreelancerProfileInput = z.infer<
  typeof MatchJobToFreelancerProfileInputSchema
>;

const MatchJobToFreelancerProfileOutputSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A numerical score from 0 to 100 indicating how well the freelancer\u0027s profile matches the job requirements.'
    ),
  compatibilityAssessment: z
    .string()
    .describe(
      'A detailed explanation of the match, highlighting key alignments, strengths, and any potential gaps.'
    ),
});
export type MatchJobToFreelancerProfileOutput = z.infer<
  typeof MatchJobToFreelancerProfileOutputSchema
>;

export async function matchJobToFreelancerProfile(
  input: MatchJobToFreelancerProfileInput
): Promise<MatchJobToFreelancerProfileOutput> {
  return matchJobToFreelancerProfileFlow(input);
}

const matchJobToFreelancerProfilePrompt = ai.definePrompt({
  name: 'matchJobToFreelancerProfilePrompt',
  input: {schema: MatchJobToFreelancerProfileInputSchema},
  output: {schema: MatchJobToFreelancerProfileOutputSchema},
  prompt: `You are an AI assistant specialized in matching freelancer profiles to job postings. Your task is to analyze a freelancer's skills and experience against a job's requirements and provide a match score and a compatibility assessment.\n\nFreelancer Profile:\nSkills: {{{freelancerProfile.skills}}}\nExperience Summary: {{{freelancerProfile.experience}}}\n\nJob Posting:\nTitle: {{{jobPosting.title}}}\nDescription: {{{jobPosting.description}}}\nRequired Skills: {{{jobPosting.requiredSkills}}}\nPreferred Skills: {{{jobPosting.preferredSkills}}}\nExperience Level: {{{jobPosting.experienceLevel}}}\n\nCarefully compare the freelancer's profile against the job posting.\n- Consider all skills (required and preferred) and the overall experience described.\n- The 'matchScore' should be an integer between 0 and 100, where 100 is a perfect match.\n- The 'compatibilityAssessment' should be a concise yet detailed explanation of the match, highlighting specific skills or experiences that align well, and also pointing out any significant gaps or areas where the freelancer might be overqualified or underqualified.`,
});

const matchJobToFreelancerProfileFlow = ai.defineFlow(
  {
    name: 'matchJobToFreelancerProfileFlow',
    inputSchema: MatchJobToFreelancerProfileInputSchema,
    outputSchema: MatchJobToFreelancerProfileOutputSchema,
  },
  async (input) => {
    const {output} = await matchJobToFreelancerProfilePrompt(input);
    return output!;
  }
);
