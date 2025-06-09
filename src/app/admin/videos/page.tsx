import dbConnect from '@/lib/db';
import { Video } from '@/models/Video';
import VideosManagementClient from './VideosManagementClient';
import Link from 'next/link';
import { checkAdminAuth } from '@/lib/adminAuth';

async function getVideos() {
  try {
    await dbConnect();
    const videos = await Video.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(videos));
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function VideosManagement() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  const initialVideos = await getVideos();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin/dashboard" className="text-red-600 hover:text-red-800 mb-2">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Video Management</h1>
              <p className="text-gray-600">Manage your video content</p>
            </div>
          </div>
        </div>

        <VideosManagementClient initialVideos={initialVideos} />
      </div>
    </div>
  );
}
