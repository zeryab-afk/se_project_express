const { ERROR_CONFLICT } = require('../errors');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CONFLICT;
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;