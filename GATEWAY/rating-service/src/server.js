require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ratingRoutes = require('../src/routes/ratingroutes');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', ratingRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI_RATING)
  .then(() => console.log('Rating DB Connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Rating Service running on port ${PORT}`));