import dbConnect from '@/lib/db';
import Essay from '@/models/Essay';
import EssaysManagementClient from './EssaysManagementClient';
import { checkAdminAuth } from '@/lib/adminAuth';

async function getEssays() {
  try {
    await dbConnect();
    const essays = await Essay.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(essays));
  } catch (error) {
    console.error('Error fetching essays:', error);
    return [];
  }
}

export default async function EssaysManagement() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  const essays = await getEssays();
  
  return <EssaysManagementClient initialEssays={essays} />;
}
