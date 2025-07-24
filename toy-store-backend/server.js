const express = require('express');
const dotenv = require('dotenv');

// Nạp biến môi trường
dotenv.config();

// DÒNG KIỂM TRA: In biến MONGO_URI ra để xem nó có giá trị không
console.log('Giá trị MONGO_URI:', process.env.MONGO_URI); 

const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Kết nối tới MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));