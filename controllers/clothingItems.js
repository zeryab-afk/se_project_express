const mongoose = require('mongoose');
const ClothingItem = require('../models/clothingItem');
const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  ERROR_FORBIDDEN // ✅ NEW: Import FORBIDDEN error
} = require('../utils/errors');

// GET all items
module.exports.getClothingItems = (req, res) => ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' }));

// CREATE new item
module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Missing required fields' });
  }

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      // ✅ REMOVED: console.error
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid data passed to create item' });
      }
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};

// DELETE item - ✅ UPDATED: Added ownership check
module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid item ID format' });
  }

  return ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Item not found' });
      }

      // ✅ NEW: Check if user owns the item
      if (item.owner.toString() !== req.user._id) {
        return res.status(ERROR_FORBIDDEN).send({ message: 'Cannot delete another user\'s item' });
      }

      return ClothingItem.findByIdAndDelete(itemId)
        .then(() => res.send({ message: 'Item deleted' }));
    })
    .catch((err) => {
      // ✅ REMOVED: console.error
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid item ID' });
      }
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};

// LIKE item
module.exports.likeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid item ID format' });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Item not found' });
      }
      return res.send(item);
    })
    .catch((err) => {
      // ✅ REMOVED: console.error
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid item ID' });
      }
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};

// DISLIKE item
module.exports.dislikeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid item ID format' });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Item not found' });
      }
      return res.send(item);
    })
    .catch((err) => {
      // ✅ REMOVED: console.error
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid item ID' });
      }
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};