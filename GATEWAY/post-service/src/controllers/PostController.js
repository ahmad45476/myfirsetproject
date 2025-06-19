const PostService = require('../services/PostService');

const createPost = async (req, res) => {
  try {
    const { title, description, category, artistId } = req.body;
    const image = req.file?.filename;

    if (!title || !image || !artistId) {
      return res.status(400).json({
        message: 'الحقول المطلوبة مفقودة (title, image, artistId)'
      });
    }

    const post = await PostService.createPost({
      title,
      description,
      category,
      image,
      artistId
    });

    res.status(201).json({ message: 'Post created', data: post });
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostService.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await PostService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post', error: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await PostService.updatePost(req.params.id, req.body);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post updated', data: post });
  } catch (err) {
    res.status(500).json({ message: 'Error updating post', error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await PostService.deletePost(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post', error: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};