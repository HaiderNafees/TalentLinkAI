
import type { FreelancerProfile, JobPosting } from './types';

/** 
 * Data Layer (Empty)
 * All content is now retrieved in real-time from Firestore to ensure the experience is 
 * 100% data-driven based on user identity and the hub repository.
 */

export const freelancerProfile: Partial<FreelancerProfile> = {};
export const jobPostings: JobPosting[] = [];
