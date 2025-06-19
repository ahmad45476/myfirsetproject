// interaction-service/src/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const interactionRoutes = require('./routes/interactionroutes');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', interactionRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI_INTERACTION)
  .then(() => console.log('Interaction DB Connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Interaction Service running on port ${PORT}`));