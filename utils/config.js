// utils/config.js - FIXED
require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;

// Throw error if JWT_SECRET is missing in production
if (NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required in production');
}

// Use environment variable for production, fallback for development
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = {
  JWT_SECRET: jwtSecret,
};