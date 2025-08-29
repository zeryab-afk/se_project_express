const User = require('../models/user');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_SERVER } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('User not found');
      error.name = 'DocumentNotFoundError';
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid user ID' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_NOT_FOUND).send({ message: err.message });
      } else {
        res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Invalid data passed to create user' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'An error has occurred on the server' });
      }
    });
};

module.exports = { getUsers, getUser, createUser };