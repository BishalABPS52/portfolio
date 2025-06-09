import dbConnect from '@/lib/db';
import Highscore from '@/models/Highscore';
import HighscoresManagementClient from './HighscoresManagementClient';
import { checkAdminAuth } from '@/lib/adminAuth';

async function getHighscores() {
  try {
    await dbConnect();
    const highscores = await Highscore.find().sort({ score: -1 }).lean();
    return JSON.parse(JSON.stringify(highscores));
  } catch (error) {
    console.error('Error fetching highscores:', error);
    return [];
  }
}

export default async function HighscoresManagement() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  const initialHighscores = await getHighscores();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Highscores Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage game highscores and leaderboard entries
        </p>
      </div>
      
      <HighscoresManagementClient initialHighscores={initialHighscores} />
    </div>
  );
}
