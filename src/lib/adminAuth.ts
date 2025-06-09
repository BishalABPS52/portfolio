import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin-session');
  
  if (!sessionCookie?.value) {
    redirect('/admin/login');
  }
  
  return true;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin-session');
  
  return !!sessionCookie?.value;
}
