const Like = require('../models/Like');

exports.toggleLike = async (req, res) => {
  try {
    const {artworkId,userId} = req.body;
     // نأخذ userId من التوكن بعد التحقق
console.log(artworkId);

    if (!artworkId) {
      return res.status(400).json({ error: 'artworkId is required' });
    }

    const existingLike = await Like.findOne({ artworkId, userId });
    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      return res.json({ message: 'Like removed' });
    }

    const newLike = await Like.create({ artworkId, userId });
    res.status(201).json(newLike);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLikesCount = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const count = await Like.countDocuments({ artworkId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
