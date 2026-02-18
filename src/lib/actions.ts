'use server';

import { matchJobToFreelancerProfile } from '@/ai/flows/match-job-to-freelancer-profile';
import { generateProposal } from '@/ai/flows/generate-proposal';
import { generateGigIdea } from '@/ai/flows/generate-gig-idea';
import type { MatchJobToFreelancerProfileInput } from '@/ai/flows/match-job-to-freelancer-profile';
import type { GenerateProposalInput } from '@/ai/flows/generate-proposal';
import type { GenerateGigIdeaInput } from '@/ai/flows/generate-gig-idea';

export async function getJobMatch(input: MatchJobToFreelancerProfileInput) {
  try {
    const result = await matchJobToFreelancerProfile(input);
    return result;
  } catch (error) {
    console.error('AI job matching failed:', error);
    return {
      matchScore: 0,
      compatibilityAssessment: 'Could not assess compatibility due to an error.',
    };
  }
}

export async function getAIProposal(input: GenerateProposalInput) {
  try {
    return await generateProposal(input);
  } catch (error) {
    console.error('AI proposal generation failed:', error);
    return {
      proposal: 'Failed to generate proposal.',
      keySellingPoints: [],
    };
  }
}

export async function getGigIdeation(input: GenerateGigIdeaInput) {
  try {
    return await generateGigIdea(input);
  } catch (error) {
    console.error('AI gig ideation failed:', error);
    return null;
  }
}
