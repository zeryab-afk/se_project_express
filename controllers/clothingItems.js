const mongoose = require('mongoose');
const ClothingItem = require('../models/clothingItem');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_SERVER } = require('../utils/errors');

// GET all items
module.exports.getClothingItems = (req, res) => ClothingItem.find({})   // ✅ Added return
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' }); // ✅ return
    });

// CREATE new item
module.exports.createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Missing required fields' });
  }

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })  // ✅ return
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid data passed to create item' }); // ✅ return
      }
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' }); // ✅ return
    });
};

// DELETE item
module.exports.deleteClothingItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid item ID format' });
  }

  return ClothingItem.findByIdAndDelete(itemId)   // ✅ return
    .then((item) => {
      if (!item) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Item not found' }); // ✅ return
      }
      return res.send(item); // ✅ return added
    })
    .catch((err) => {
      console.error(err);
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' }); // ✅ return
    });
};

// LIKE item
module.exports.likeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid item ID format' });
  }

  return ClothingItem.findByIdAndUpdate(   // ✅ return
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Item not found' }); // ✅ return
      }
      return res.send(item); // ✅ return
    })
    .catch((err) => {
      console.error(err);
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' }); // ✅ return
    });
};

// DISLIKE item
module.exports.dislikeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid item ID format' });
  }

  return ClothingItem.findByIdAndUpdate(   // ✅ return
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Item not found' }); // ✅ return
      }
      return res.send(item); // ✅ return
    })
    .catch((err) => {
      console.error(err);
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' }); // ✅ return
    });
};
