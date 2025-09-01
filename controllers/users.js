const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  ERROR_UNAUTHORIZED,
  ERROR_CONFLICT
} = require('../utils/errors');
const { JWT_SECRET } = require('../utils/config');

// ✅ REMOVED: getUsers function (no longer needed)

// ✅ UPDATED: getUser replaced with getCurrentUser
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error('User not found');
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid user ID' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: err.message });
      }
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};

// ✅ UPDATED: createUser to handle email and password
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      // Remove password from response
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;

      res.status(201).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid data passed to create user' });
      }
      if (err.code === 11000) {
        return res.status(ERROR_CONFLICT).send({ message: 'Email already exists' });
      }
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};

// ✅ NEW: login controller
const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch((err) => {
      res.status(ERROR_UNAUTHORIZED).send({ message: err.message });
    });
};

// ✅ NEW: updateUser controller
const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error('User not found');
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid data passed to update user' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_NOT_FOUND).send({ message: err.message });
      }
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};

// ✅ UPDATED: Export statement
module.exports = { getCurrentUser, createUser, login, updateUser };