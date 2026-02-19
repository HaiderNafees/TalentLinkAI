import { redirect } from 'next/navigation';

export default function ProfilePage() {
  // Redirecting to the main professional profile page to avoid duplicate routes and build errors
  redirect('/dashboard/profile');
  return null;
}
