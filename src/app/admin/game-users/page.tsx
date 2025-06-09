import dbConnect from '@/lib/db';
import { GameUser } from '@/models/GameUser';
import GameUsersManagementClient from './GameUsersManagementClient';
import { checkAdminAuth } from '@/lib/adminAuth';

async function getGameUsers() {
  try {
    await dbConnect();
    const users = await GameUser.find().lean();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error('Error fetching game users:', error);
    return [];
  }
}

export default async function GameUsersManagement() {
  // Check authentication before proceeding
  await checkAdminAuth();
  
  const initialUsers = await getGameUsers();
  return <GameUsersManagementClient initialUsers={initialUsers} />;
}
