/* eslint-disable max-classes-per-file */
// utils/customErrors.js - NEW FOR PROJECT 15
const {
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHORIZED,
  ERROR_FORBIDDEN,
  ERROR_NOT_FOUND,
  ERROR_CONFLICT,
  ERROR_SERVER,
} = require('./errors');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_BAD_REQUEST;
    this.name = 'BadRequestError';
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTHORIZED;
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_FORBIDDEN;
    this.name = 'ForbiddenError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_NOT_FOUND;
    this.name = 'NotFoundError';
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CONFLICT;
    this.name = 'ConflictError';
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_SERVER;
    this.name = 'InternalServerError';
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
