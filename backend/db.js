const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000, // 10s timeout
      }
    );
    console.log('✅ Connected to MongoDB Atlas');
    console.log(' Connected to DB:', conn.connection.name);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

module.exports = connectMongo;