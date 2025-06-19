require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/', authRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
  res.send('Auth-User Service is running');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Auth-User Service running on port ${PORT}`));
