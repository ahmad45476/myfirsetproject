// artwork-service/src/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/artwork-db';
    
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // لم تعد ضرورية في إصدارات Mongoose الحديثة
      // useFindAndModify: false // لم تعد ضرورية في إصدارات Mongoose الحديثة
    });

    console.log('🎨 Connected to MongoDB Artwork Database');
    
    // إعداد مستمعات للأحداث
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from DB');
    });
    
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    // إغلاق التطبيق عند فشل الاتصال
    process.exit(1);
  }
};

module.exports = connectDB;