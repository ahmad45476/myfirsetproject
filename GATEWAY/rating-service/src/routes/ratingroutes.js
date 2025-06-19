const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingcontroller');
const jwt = require('jsonwebtoken');

// Authentication Middleware
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Rating Routes
router.post('/',  ratingController.addRating);
router.get('/:artworkId', ratingController.getAverageRating);
router.get('/myrate', ratingController.getUserRating);
module.exports = router;