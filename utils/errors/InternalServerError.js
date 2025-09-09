const { ERROR_SERVER } = require('../errors');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_SERVER;
    this.name = 'InternalServerError';
  }
}

module.exports = InternalServerError;