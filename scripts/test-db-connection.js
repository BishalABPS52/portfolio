require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log('❌ MONGODB_URI environment variable is not set');
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
    console.log('🔄 Testing MongoDB connection...');
    console.log('📍 Connecting to:', MONGODB_URI);
    await dbConnect();
    console.log('✅ MongoDB connection successful!');
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📊 Found ${collections.length} collections in the database`);
    
    // Test connection state
    console.log('🔗 Connection state:', mongoose.connection.readyState);
    console.log('📋 Database name:', mongoose.connection.name);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('💡 Common issues:');
    console.error('   - Check if MongoDB is running (if using local connection)');
    console.error('   - Verify the connection string format');
    console.error('   - Check network connectivity (if using remote connection)');
    console.error('   - Ensure database user has proper permissions');
    process.exit(1);
  }
}

testConnection();