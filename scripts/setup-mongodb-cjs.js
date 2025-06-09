#!/usr/bin/env node

/**
 * MongoDB Setup and Connection Test Script (CommonJS)
 * This script tests the MongoDB connection and sets up the database with proper indexes
 */

const mongoose = require('mongoose');
const { config } = require('dotenv');

// Load environment variables
config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
  console.log('🔍 Testing MongoDB connection...');
  
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    console.log('   Please ensure .env.local contains: MONGODB_URI=mongodb://localhost:27017/bishal-portfolio');
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
    
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Suggestions:');
      console.log('   1. Make sure MongoDB is running: sudo systemctl start mongod');
      console.log('   2. Or start MongoDB manually: mongod --dbpath /var/lib/mongodb');
      console.log('   3. Check if MongoDB service is enabled: sudo systemctl enable mongod');
    }
    
    return false;
  }
}

async function setupCollections() {
  console.log('\n🛠️ Setting up collections and indexes...');
  
  try {
    const db = mongoose.connection.db;
    
    // Create highscores collection with indexes
    const highscoresCollection = db.collection('highscores');
    await highscoresCollection.createIndex({ score: -1 }); // For ranking
    await highscoresCollection.createIndex({ gameCompletedAt: -1 }); // For recent scores
    console.log('✅ Highscores collection and indexes created');
    
    // Create availabilitystatuses collection with indexes
    const availabilityCollection = db.collection('availabilitystatuses');
    await availabilityCollection.createIndex({ lastUpdated: -1 }); // For recent status
    console.log('✅ AvailabilityStatus collection and indexes created');
    
    // Initialize availability status if it doesn't exist
    const existingStatus = await availabilityCollection.findOne();
    if (!existingStatus) {
      const defaultStatus = {
        isAvailable: true,
        statusMessage: 'Available for Work',
        lastUpdated: new Date(),
        updatedBy: 'system'
      };
      await availabilityCollection.insertOne(defaultStatus);
      console.log('✅ Default availability status initialized');
    } else {
      console.log('✅ Availability status already exists');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Collection setup failed:', error.message);
    return false;
  }
}

async function getDatabaseStats() {
  console.log('\n📊 Database Statistics:');
  
  try {
    const db = mongoose.connection.db;
    
    const highscoresCollection = db.collection('highscores');
    const availabilityCollection = db.collection('availabilitystatuses');
    
    const highscoreCount = await highscoresCollection.countDocuments();
    const availabilityCount = await availabilityCollection.countDocuments();
    
    console.log(`   🎯 Highscores: ${highscoreCount} records`);
    console.log(`   🔄 Availability Status: ${availabilityCount} records`);
    
    if (highscoreCount > 0) {
      const topScore = await highscoresCollection.findOne({}, { sort: { score: -1 } });
      console.log(`   🏆 Top Score: ${topScore.username} - ${topScore.score}`);
    }
    
    const currentStatus = await availabilityCollection.findOne();
    if (currentStatus) {
      console.log(`   📍 Current Status: ${currentStatus.isAvailable ? '🟢 Available' : '🔴 Unavailable'}`);
      console.log(`   💬 Message: "${currentStatus.statusMessage}"`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Failed to get database stats:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 MongoDB Setup and Validation Tool (CommonJS)');
  console.log('===============================================\n');
  
  let success = true;
  
  // Test connection
  success = await connectToDatabase() && success;
  
  if (!success) {
    console.log('\n❌ Connection test failed. Please fix connection issues before proceeding.');
    process.exit(1);
  }
  
  // Setup collections
  success = await setupCollections() && success;
  
  // Get stats
  success = await getDatabaseStats() && success;
  
  if (success) {
    console.log('\n🎉 MongoDB setup completed successfully!');
    console.log('📝 Summary:');
    console.log('   ✅ Connection established');
    console.log('   ✅ Collections and indexes created');
    console.log('   ✅ Default data initialized');
    console.log('   ✅ Ready for production use');
    console.log('\n🔗 Your application can now use:');
    console.log('   📡 API: /api/highscores');
    console.log('   📡 API: /api/availability');
    console.log('   🎮 QuizTime backend integration');
    console.log('   🔧 Admin panel: /admin/availability');
  } else {
    console.log('\n❌ Setup completed with errors. Please review the issues above.');
  }
  
  // Close connection
  await mongoose.connection.close();
  console.log('\n🔌 Database connection closed.');
}

// Run the setup
main().catch((error) => {
  console.error('💥 Setup script failed:', error);
  process.exit(1);
});
