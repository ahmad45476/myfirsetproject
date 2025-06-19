const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middleware/authMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', AuthMiddleware, AuthController.getMe);

module.exports = router;
