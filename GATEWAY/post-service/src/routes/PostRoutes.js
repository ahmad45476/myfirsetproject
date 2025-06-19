const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const upload = require('../middlewares/upload');

router.post('/', upload.single('image'), PostController.createPost);
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

// GET /api/posts/search?query=نص
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const results = await Post.find({
      content: { $regex: query, $options: 'i' }
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error searching posts' });
  }
});

module.exports = router;
