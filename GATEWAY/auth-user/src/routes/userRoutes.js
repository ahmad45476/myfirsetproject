const express = require('express');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const { followArtist, unfollowArtist, getFollowingArtists, getMyFollowers } = require('../controllers/followController');

router.get('/followers', verifyToken, getMyFollowers);

//router.post('/', authMiddleware, UserController.createUser);
router.get('/', UserController.getAllUsers);

router.post('/follow/:artistId', verifyToken, followArtist);
router.post('/unfollow/:artistId', verifyToken, unfollowArtist);
router.get('/following', verifyToken, getFollowingArtists);

// GET /api/auth/search?query=اسم
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const results = await User.find({
      name: { $regex: query, $options: 'i' },
      role: 'artist' // أو أي شرط يحدد أنه فنان
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error searching artists' });
  }
});
router.get('/:id', UserController.getUserById);
router.put('/:id', authMiddleware, UserController.updateUser);
router.delete('/:id', authMiddleware, UserController.deleteUser);
module.exports = router;
