#!/usr/bin/env node

/**
 * MongoDB Connection Test Script
 * 
 * This script tests the MongoDB connection using the configuration from db.ts
 * Make sure to set up your .env.local file with MONGODB_URI before running this script.
 * 
 * Usage:
 *   node scripts/test-db-connection.js
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set');
  console.log('📝 Please create a .env.local file with your MongoDB connection string');
  console.log('   Example: MONGODB_URI=mongodb://localhost:27017/portfolio');
  console.log('   Or use the template: cp .env.local.template .env.local');
  process.exit(1);
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('✅ Using existing MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Hide credentials
    
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ New MongoDB connection established');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

async function testConnection() {
  try {
    console.log('🧪 Testing MongoDB connection...');
    console.log('⏱️  Timeout: 10 seconds\n');
    
    await dbConnect();
    
    // Test database operations
    console.log('📊 Database operations test:');
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`   Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('   Collection names:', collections.map(c => c.name).join(', '));
    }
    
    // Test database info
    const dbInfo = await mongoose.connection.db.admin().ping();
    console.log('   Database ping:', dbInfo.ok === 1 ? '✅ OK' : '❌ Failed');
    
    // Get database stats
    try {
      const stats = await mongoose.connection.db.stats();
      console.log(`   Database size: ${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Total documents: ${stats.objects}`);
    } catch (statsError) {
      console.log('   Database stats: ⚠️  Unable to retrieve (permissions)');
    }
    
    console.log('\n🎉 MongoDB connection test completed successfully!');
    console.log('💡 Your database is ready for the portfolio application.');
    
  } catch (error) {
    console.error('\n❌ MongoDB connection test failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('   - Check if MongoDB server is running');
      console.log('   - Verify the connection string in .env.local');
      console.log('   - For MongoDB Atlas, check network access and credentials');
    }
    
    process.exit(1);
  } finally {
    // Close connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Database connection closed');
    }
  }
}

// Add timeout for the test
const timeoutMs = 10000;
const timeoutPromise = new Promise((_, reject) => {
  setTimeout(() => reject(new Error('Connection test timed out')), timeoutMs);
});

Promise.race([testConnection(), timeoutPromise])
  .catch(error => {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  });
