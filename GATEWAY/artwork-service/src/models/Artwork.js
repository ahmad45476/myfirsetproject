// src/models/Artwork.js
const mongoose = require('mongoose');

// Artwork Model
const ArtworkSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, enum: ['painting', 'sculpture', 'digital'] },
});
module.exports = mongoose.model('Artwork', ArtworkSchema);
