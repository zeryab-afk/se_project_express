// utils/errors.js
const constants = require('./constants');
const errorClasses = require('./errors');

module.exports = {
  ...constants,
  ...errorClasses,
};
