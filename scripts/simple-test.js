const mongoose = require('mongoose');
const { config } = require('dotenv');

config({ path: '.env.local' });

console.log('Starting MongoDB connection test...');
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
  
  // Test basic operations
  const testData = {
    username: 'TestUser',
    score: 100,
    questionsAnswered: 5,
    gameCompletedAt: new Date()
  };
  
  const db = mongoose.connection.db;
  const collection = db.collection('highscores');
  
  return collection.insertOne(testData);
})
.then((result) => {
  console.log('✅ Test data inserted:', result.insertedId);
  return mongoose.connection.db.collection('highscores').findOne({ _id: result.insertedId });
})
.then((document) => {
  console.log('✅ Test data retrieved:', document);
  console.log('🎉 MongoDB setup is working correctly!');
})
.catch((error) => {
  console.error('❌ MongoDB test failed:', error.message);
})
.finally(() => {
  mongoose.connection.close();
  console.log('🔌 Connection closed');
  process.exit(0);
});
