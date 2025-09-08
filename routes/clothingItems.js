// routes/clothingItems.js - UPDATED FOR PROJECT 15
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require('../controllers/clothingItems');
const { createItemValidation, idValidation } = require('../middlewares/validation');

router.get('/', getClothingItems);
router.post('/', auth, createItemValidation, createClothingItem);
router.delete('/:itemId', auth, idValidation, deleteClothingItem);
router.put('/:itemId/likes', auth, idValidation, likeItem);
router.delete('/:itemId/likes', auth, idValidation, dislikeItem);

module.exports = router;