const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  artworkId: { type: String, required: true },
  userId: { type: String, required: true },
  value: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 🔐 جعل التقييم فريدًا لكل artworkId + userId
ratingSchema.index({ artworkId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);