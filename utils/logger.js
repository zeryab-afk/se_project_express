// utils/logger.js - NEW FOR PROJECT 15
const winston = require('winston');
const expressWinston = require('express-winston');

// Create logs directory if it doesn't exist
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'logs/request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};