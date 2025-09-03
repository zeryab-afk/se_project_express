// controllers/users.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  ERROR_UNAUTHORIZED,
  ERROR_CONFLICT,
} = require('../utils/errors');
const { JWT_SECRET } = require('../utils/config');

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

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      // NEW: Return both token and user data
      res.status(201).send({
        token,
        user: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email
        }
      });
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

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(ERROR_BAD_REQUEST).send({ message: 'Email and password are required' });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      // NEW: Return both token and user data
      res.send({
        token,
        user: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email
        }
      });
    })
    .catch((err) => {
      if (err.message === 'Incorrect email or password') {
        return res.status(ERROR_UNAUTHORIZED).send({ message: err.message });
      }
      return res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true },
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

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateUser,
};