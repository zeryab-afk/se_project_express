/* eslint-disable global-require */
module.exports = {
  BadRequestError: require('./BadRequestError'),
  UnauthorizedError: require('./UnauthorizedError'),
  ForbiddenError: require('./ForbiddenError'),
  NotFoundError: require('./NotFoundError'),
  ConflictError: require('./ConflictError'),
  InternalServerError: require('./InternalServerError'),
};