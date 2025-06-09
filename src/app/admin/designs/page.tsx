import dbConnect from '@/lib/db';
import Design from '@/models/Design';
import DesignsManagementClient from './DesignsManagementClient';
import { checkAdminAuth } from '@/lib/adminAuth';

async function getDesigns() {
  try {
    await dbConnect();
    const designs = await Design.find().lean();
    return JSON.parse(JSON.stringify(designs));
  } catch (error) {
    console.error('Error fetching designs:', error);
    return [];
  }
}

export default async function DesignsManagement() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  const designs = await getDesigns();
  
  return <DesignsManagementClient initialDesigns={designs} />;
}
