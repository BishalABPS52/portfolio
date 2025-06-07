const dbConnect = require('./db').default;

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const mongoose = await dbConnect();
    console.log('Successfully connected to MongoDB!');
    console.log('Connection URI:', process.env.MONGODB_URI?.split('@')[1] || 'URI not found');
    await mongoose.disconnect();
    console.log('Successfully disconnected.');
  } catch (error) {
    console.error('Database connection test failed:', error);
    process.exit(1);
  }
}

testConnection();
