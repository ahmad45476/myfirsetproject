// src/models/Like.js
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  artworkId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { unique: ['artworkId', 'userId'] });

module.exports = mongoose.model('Like', likeSchema);