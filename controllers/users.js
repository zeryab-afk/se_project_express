const User = require('../models/user');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_SERVER } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      // ✅ FIX: removed console.error
      res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      // ✅ FIX: consistent-return (throw only)
      const error = new Error('User not found');
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      // ✅ FIX: removed console.error
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid user ID' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: err.message });
      }
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      // ✅ FIX: removed console.error
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid data passed to create user' });
      }
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};

module.exports = { getUsers, getUser, createUser };
