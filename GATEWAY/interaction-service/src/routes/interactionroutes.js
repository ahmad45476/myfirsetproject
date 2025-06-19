const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const likeController = require('../controllers/likeController');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer(); 

// Middleware للتحقق من التوكن JWT
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    req.user = decoded;  // احفظ بيانات المستخدم في req.user
    next();
  });
};

// المسارات
router.post('/comments', commentController.addComment);  // يُفضل إضافة التوثيق هنا أيضاً
router.get('/comments/:artworkId', commentController.getComments);
router.post('/likes', upload.none(), likeController.toggleLike);  // أضف التوثيق هنا
router.get('/likes/:artworkId', likeController.getLikesCount);

module.exports = router;
