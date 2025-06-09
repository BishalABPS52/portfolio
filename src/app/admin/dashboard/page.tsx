import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import { Video } from '@/models/Video';
import { Poem } from '@/models/Poem';
import Design from '@/models/Design';
import Quote from '@/models/Quote';
import Essay from '@/models/Essay';
import { GameUser } from '@/models/GameUser';
import Highscore from '@/models/Highscore';
import AdminDashboardClient from './AdminDashboardClient';
import { checkAdminAuth } from '@/lib/adminAuth';

interface DashboardStats {
  blogs: number;
  videos: number;
  poems: number;
  designs: number;
  quotes: number;
  essays: number;
  gameUsers: number;
  highscores: number;
}

async function getDashboardStats(): Promise<DashboardStats> {
  try {
    await dbConnect();
    
    const [
      blogsCount,
      videosCount,
      poemsCount,
      designsCount,
      quotesCount,
      essaysCount,
      gameUsersCount,
      highscoresCount
    ] = await Promise.all([
      Blog.countDocuments(),
      Video.countDocuments(),
      Poem.countDocuments(),
      Design.countDocuments(),
      Quote.countDocuments(),
      Essay.countDocuments(),
      GameUser.countDocuments(),
      Highscore.countDocuments()
    ]);

    return {
      blogs: blogsCount,
      videos: videosCount,
      poems: poemsCount,
      designs: designsCount,
      quotes: quotesCount,
      essays: essaysCount,
      gameUsers: gameUsersCount,
      highscores: highscoresCount
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      blogs: 0,
      videos: 0,
      poems: 0,
      designs: 0,
      quotes: 0,
      essays: 0,
      gameUsers: 0,
      highscores: 0
    };
  }
}

export default async function AdminDashboard() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  const initialStats = await getDashboardStats();
  return <AdminDashboardClient initialStats={initialStats} />;
}