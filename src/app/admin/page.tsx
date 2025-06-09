import { redirect } from 'next/navigation';
import { checkAdminAuth } from '@/lib/adminAuth';

export default async function AdminPage() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  // Redirect to dashboard
  redirect('/admin/dashboard');
}