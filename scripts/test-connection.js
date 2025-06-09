const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...');
  
  const MONGODB_URI = process.env.MONGODB_URI;
  console.log('MongoDB URI:', MONGODB_URI);
  
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  try {
    console.log(`📡 Connecting to: ${MONGODB_URI}`);
    
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });

    console.log('✅ MongoDB connection successful!');
    
    // Test database operations
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    console.log(`📊 Connected to database: ${dbName}`);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log(`📋 Available collections: ${collections.map(c => c.name).join(', ') || 'None'}`);
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 MongoDB is not running. Please start MongoDB first.');
    }
    process.exit(1);
  }
}

testConnection();
