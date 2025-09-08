// app.js - UPDATED FOR PROJECT 15
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');

// NEW: Use environment variables with defaults
const { PORT = 3001, MONGODB_URI = 'mongodb://127.0.0.1:27017/wtwr_db', NODE_ENV } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .catch((err) => {
    throw err;
  });

// NEW: Request logging middleware
app.use(requestLogger);

// NEW: Crash test endpoint (remove after review)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Public routes (no authentication required)
app.use('/', require('./routes/auth')); // Auth routes
app.use('/items', require('./routes/clothingItems'));

// Protected routes (authentication required)
app.use(auth);
app.use('/users', require('./routes/users')); // User routes

// Error logging
app.use(errorLogger);

// Celebrate error handler
app.use(errors());

// Centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
