const express = require('express');
const router = express.Router();

// Created another auth.js file in controllers which include the sign
// in and sign up methods
const signin = require('../controllers/auth');

// Making the two post operations
router.post('/signin', signin);

module.exports = router;