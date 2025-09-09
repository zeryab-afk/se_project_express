const { ERROR_BAD_REQUEST } = require('../errors');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_BAD_REQUEST;
    this.name = 'BadRequestError';
  }
}

module.exports = BadRequestError;