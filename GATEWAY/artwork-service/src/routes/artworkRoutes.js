// src/routes/artworkRoutes.js

const express = require('express');
const router = express.Router();
const { 
  createArtwork,
  getArtworks,
  searchArtworks
} = require('../controllers/artworkcontroller');

// إنشاء عمل فني جديد
router.post('/', createArtwork);

// جلب كل الأعمال الفنية
router.get('/', getArtworks);
router.get('/search', searchArtworks);



module.exports = router;