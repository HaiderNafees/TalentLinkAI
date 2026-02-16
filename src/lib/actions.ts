'use server';

import { matchJobToFreelancerProfile } from '@/ai/flows/match-job-to-freelancer-profile';
import type { MatchJobToFreelancerProfileInput } from '@/ai/flows/match-job-to-freelancer-profile';

export async function getJobMatch(input: MatchJobToFreelancerProfileInput) {
  try {
    const result = await matchJobToFreelancerProfile(input);
    return result;
  } catch (error) {
    console.error('AI job matching failed:', error);
    // Return a default or error state
    return {
      matchScore: 0,
      compatibilityAssessment:
        'Could not assess compatibility due to an error.',
    };
  }
}
