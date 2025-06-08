import dbConnect from './db';

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const mongoose = await dbConnect();
    
    if (!mongoose) {
      console.error('Failed to connect to MongoDB - connection returned null');
      process.exit(1);
    }

    console.log('Successfully connected to MongoDB!');
    console.log('Connection URI:', process.env.MONGODB_URI?.split('@')[1] || 'URI not found');
    
    try {
      await mongoose.disconnect();
      console.log('Successfully disconnected.');
    } catch (disconnectError) {
      console.error('Error disconnecting from MongoDB:', disconnectError);
      process.exit(1);
    }
  } catch (error) {
    console.error('Database connection test failed:', error);
    process.exit(1);
  }
}

testConnection();
