// routes/clothingItems.js
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require('../controllers/clothingItems');

// CHANGED: Make GET /items public, protect other routes
router.get('/', getClothingItems);
router.post('/', auth, createClothingItem);
router.delete('/:itemId', auth, deleteClothingItem);
router.put('/:itemId/likes', auth, likeItem);
router.delete('/:itemId/likes', auth, dislikeItem);

module.exports = router;