// middleware/errorHandler.js - NEW FOR PROJECT 15
const { ERROR_SERVER } = require('../utils/errors');

const errorHandler = (err, req, res) => {
  const { statusCode = ERROR_SERVER, message } = err;

  res.status(statusCode).send({
    message: statusCode === ERROR_SERVER
      ? 'An error occurred on the server'
      : message,
  });
};

module.exports = errorHandler;
