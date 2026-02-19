import { redirect } from 'next/navigation';

export default function OldDashboardPage() {
  // Redirecting to the main professional hub to avoid duplicate routes
  redirect('/dashboard');
  return null;
}
