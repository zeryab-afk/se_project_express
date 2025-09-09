// middleware/errorHandler.js - FIXED
const { ERROR_SERVER } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;

  res.status(statusCode).send({
    message: statusCode === ERROR_SERVER
      ? 'An error occurred on the server'
      : message,
  });
  next(); // Added to avoid unused parameter warning
};

module.exports = errorHandler;