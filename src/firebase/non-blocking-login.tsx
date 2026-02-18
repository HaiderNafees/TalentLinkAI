'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

/** 
 * Utility to handle auth errors consistently.
 */
function handleAuthError(error: any, onError?: (err: any) => void) {
  console.error('Authentication Error:', error);
  if (onError) onError(error);
}

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth, onError?: (err: any) => void): void {
  signInAnonymously(authInstance).catch((err) => handleAuthError(err, onError));
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string, onError?: (err: any) => void): void {
  createUserWithEmailAndPassword(authInstance, email, password).catch((err) => handleAuthError(err, onError));
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string, onError?: (err: any) => void): void {
  signInWithEmailAndPassword(authInstance, email, password).catch((err) => handleAuthError(err, onError));
}
