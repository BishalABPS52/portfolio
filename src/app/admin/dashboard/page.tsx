import dbConnect from '@/lib/db';
import { IAvailabilityStatus } from '@/models/AvailabilityStatus';
import AdminDashboardClient from './AdminDashboardClient';
import { checkAdminAuth } from '@/lib/adminAuth';

interface DashboardStats {
  availability: string;
}

async function getDashboardStats(): Promise<DashboardStats> {
  try {
    await dbConnect();
    
    // For now, we'll return a default status since we're simplifying
    // In the future, you can implement actual availability fetching
    return {
      availability: 'available'
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      availability: 'available'
    };
  }
}

export default async function AdminDashboard() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  const initialStats = await getDashboardStats();
  return <AdminDashboardClient initialStats={initialStats} />;
}