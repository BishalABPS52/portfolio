import dbConnect from '@/lib/db';
import { Poem } from '@/models/Poem';
import PoemsManagementClient from './PoemsManagementClient';
import { checkAdminAuth } from '@/lib/adminAuth';

async function getPoems() {
  try {
    await dbConnect();
    const poems = await Poem.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(poems));
  } catch (error) {
    console.error('Error fetching poems:', error);
    return [];
  }
}

export default async function PoemsManagement() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  const poems = await getPoems();
  
  return <PoemsManagementClient initialPoems={poems} />;
}
