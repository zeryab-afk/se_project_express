// utils/config.js - UPDATED FOR PROJECT 15
require('dotenv').config();

// NEW: Use environment variables with fallbacks
const { JWT_SECRET = 'your-secret-key', NODE_ENV } = process.env;

module.exports = {
  // NEW: Different secret for production vs development
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};