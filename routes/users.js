// routes/users.js - UPDATED FOR PROJECT 15
const express = require('express');
const auth = require('../middlewares/auth');
const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation'); // NEW: Import validation middleware

const router = express.Router();

// CHANGED: Added validation middleware to PATCH route
router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateUserValidation, updateUser); // NEW: Added validation

module.exports = router;