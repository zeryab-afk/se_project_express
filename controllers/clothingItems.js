// controllers/clothingItems.js - FIXED IMPORT
const mongoose = require('mongoose');
const ClothingItem = require('../models/clothingItem');
// CHANGE THIS IMPORT:
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
} = require('../utils/errors/index'); // ✅ Changed from '../utils/customErrors'

// ... rest of your code remains exactly the same ...
module.exports.getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() => next(new InternalServerError('An error has occurred on the server')));
};

module.exports.createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return next(new BadRequestError('Missing required fields'));
  }

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid data passed to create item'));
      }
      return next(new InternalServerError('An error has occurred on the server'));
    });
};

module.exports.deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError('Invalid item ID format'));
  }

  return ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError('Item not found'));
      }

      if (item.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Cannot delete another user\'s item'));
      }

      return ClothingItem.findByIdAndDelete(itemId)
        .then(() => res.send({ message: 'Item deleted' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item ID'));
      }
      return next(new InternalServerError('An error has occurred on the server'));
    });
};

module.exports.likeItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError('Invalid item ID format'));
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError('Item not found'));
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item ID'));
      }
      return next(new InternalServerError('An error has occurred on the server'));
    });
};

module.exports.dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError('Invalid item ID format'));
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError('Item not found'));
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item ID'));
      }
      return next(new InternalServerError('An error has occurred on the server'));
    });
};