import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/adminAuth';
import AdminLoginPage from './AdminLoginPage';

export default async function LoginPage() {
  // If already authenticated, redirect to dashboard
  const isAuthenticated = await isAdminAuthenticated();
  
  if (isAuthenticated) {
    redirect('/admin/dashboard');
  }

  return <AdminLoginPage />;
}
