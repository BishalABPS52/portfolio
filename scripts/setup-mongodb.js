#!/usr/bin/env node

/**
 * MongoDB Setup and Connection Test Script
 * This script tests the MongoDB connection and sets up the database with proper indexes
 */

const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Import models (we need to use a different approach for models in Node.js context)
const connectDB = require('../src/lib/db');

// Define schemas directly for setup script
const highscoreSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, maxlength: 50 },
  score: { type: Number, required: true, min: 0 },
  questionsAnswered: { type: Number, required: true, min: 0 },
  gameCompletedAt: { type: Date, default: Date.now },
  rank: { type: Number }
}, { timestamps: true });

const availabilityStatusSchema = new mongoose.Schema({
  isAvailable: { type: Boolean, required: true, default: true },
  statusMessage: { type: String, required: true, trim: true, maxlength: 200 },
  lastUpdated: { type: Date, default: Date.now },
  updatedBy: { type: String, default: 'admin' }
}, { timestamps: true });

// Create models
const Highscore = mongoose.model('Highscore', highscoreSchema);
const AvailabilityStatus = mongoose.model('AvailabilityStatus', availabilityStatusSchema);

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'bishal-portfolio';

async function testConnection() {
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

async function setupDatabase() {
  console.log('\n🛠️ Setting up database indexes and collections...');
  
  try {
    // Ensure indexes for Highscore model
    await Highscore.createIndexes();
    console.log('✅ Highscore indexes created');
    
    // Ensure indexes for AvailabilityStatus model
    await AvailabilityStatus.createIndexes();
    console.log('✅ AvailabilityStatus indexes created');
    
    // Initialize availability status if it doesn't exist
    const existingStatus = await AvailabilityStatus.findOne();
    if (!existingStatus) {
      const defaultStatus = new AvailabilityStatus({
        isAvailable: true,
        statusMessage: 'Available for Work',
        updatedBy: 'system'
      });
      await defaultStatus.save();
      console.log('✅ Default availability status initialized');
    } else {
      console.log('✅ Availability status already exists');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    return false;
  }
}

async function validateModels() {
  console.log('\n🔍 Validating database models...');
  
  try {
    // Test Highscore model
    const testScore = new Highscore({
      username: 'TestUser',
      score: 1000,
      questionsAnswered: 5
    });
    
    const validationError = testScore.validateSync();
    if (validationError) {
      throw new Error(`Highscore model validation failed: ${validationError.message}`);
    }
    console.log('✅ Highscore model validation passed');
    
    // Test AvailabilityStatus model
    const testStatus = new AvailabilityStatus({
      isAvailable: true,
      statusMessage: 'Test message'
    });
    
    const statusValidationError = testStatus.validateSync();
    if (statusValidationError) {
      throw new Error(`AvailabilityStatus model validation failed: ${statusValidationError.message}`);
    }
    console.log('✅ AvailabilityStatus model validation passed');
    
    return true;
  } catch (error) {
    console.error('❌ Model validation failed:', error.message);
    return false;
  }
}

async function getDatabaseStats() {
  console.log('\n📊 Database Statistics:');
  
  try {
    const highscoreCount = await Highscore.countDocuments();
    const availabilityCount = await AvailabilityStatus.countDocuments();
    
    console.log(`   🎯 Highscores: ${highscoreCount} records`);
    console.log(`   🔄 Availability Status: ${availabilityCount} records`);
    
    if (highscoreCount > 0) {
      const topScore = await Highscore.findOne().sort({ score: -1 });
      console.log(`   🏆 Top Score: ${topScore.username} - ${topScore.score}`);
    }
    
    const currentStatus = await AvailabilityStatus.findOne();
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
  console.log('🚀 MongoDB Setup and Validation Tool');
  console.log('=====================================\n');
  
  let success = true;
  
  // Test connection
  success = await testConnection() && success;
  
  if (!success) {
    console.log('\n❌ Connection test failed. Please fix connection issues before proceeding.');
    process.exit(1);
  }
  
  // Setup database
  success = await setupDatabase() && success;
  
  // Validate models
  success = await validateModels() && success;
  
  // Get stats
  success = await getDatabaseStats() && success;
  
  if (success) {
    console.log('\n🎉 MongoDB setup completed successfully!');
    console.log('📝 Summary:');
    console.log('   ✅ Connection established');
    console.log('   ✅ Database indexes created');
    console.log('   ✅ Models validated');
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
