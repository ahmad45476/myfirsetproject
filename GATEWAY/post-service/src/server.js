require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const postRoutes = require('./routes/PostRoutes');

const app = express();
connectDB();
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  }));
app.use(express.json());
app.use('/', postRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Post Service running on port ${PORT}`));