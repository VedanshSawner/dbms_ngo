const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// REGISTER route
router.post('/register', registerUser);

// LOGIN route
router.post('/login', loginUser);

module.exports = { authRouter: router };
