const mongoose = require('mongoose');
// không cần require('dotenv') ở đây

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Biến này sẽ được cung cấp bởi server.js
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Lỗi kết nối MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;