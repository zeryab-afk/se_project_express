const express = require('express');
const auth = require('../middlewares/auth');
const {
  getCurrentUser,
  updateUser
  // ✅ REMOVED: createUser and login (they're used directly in app.js)
} = require('../controllers/users');

const router = express.Router();

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateUser);

module.exports = router;