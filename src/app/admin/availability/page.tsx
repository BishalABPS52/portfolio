import dbConnect from '@/lib/db';
import AvailabilityStatus from '@/models/AvailabilityStatus';
import AvailabilityAdminClient from './AvailabilityAdminClient';
import { checkAdminAuth } from '@/lib/adminAuth';

async function getAvailabilityStatus() {
  try {
    await dbConnect();
    const status = await AvailabilityStatus.findOne().lean();
    return status ? JSON.parse(JSON.stringify(status)) : null;
  } catch (error) {
    console.error('Error fetching availability status:', error);
    return null;
  }
}

export default async function AvailabilityAdmin() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  const initialStatus = await getAvailabilityStatus();
  return <AvailabilityAdminClient initialStatus={initialStatus} />;
}
