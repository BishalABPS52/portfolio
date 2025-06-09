import dbConnect from '@/lib/db';
import Quote from '@/models/Quote';
import QuotesManagementClient from './QuotesManagementClient';
import { checkAdminAuth } from '@/lib/adminAuth';

async function getQuotes() {
  try {
    await dbConnect();
    const quotes = await Quote.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(quotes));
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

export default async function QuotesManagement() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  const quotes = await getQuotes();
  
  return <QuotesManagementClient initialQuotes={quotes} />;
}
