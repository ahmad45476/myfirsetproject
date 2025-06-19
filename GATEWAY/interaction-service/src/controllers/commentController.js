const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
   const { artworkId, text,userId } = req.body;
  try {
    if (!artworkId || !text) {
      return res.status(400).json({ error: 'artworkId and text are required' });
    }
   
    const comment = await Comment.create({
      artworkId,
      userId, // ✅ متوافق مع التوكن الجديد
      text
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const comments = await Comment.find({ artworkId })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};