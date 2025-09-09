// utils/errors.js - FIXED
const constants = require('./constants');
const errorClasses = require('./errors/index'); // ✅ Add /index

module.exports = {
  ...constants,
  ...errorClasses,
};