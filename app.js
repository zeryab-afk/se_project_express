// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const { NotFoundError } = require('./utils/errors');

const {
  PORT = 3001,
  MONGO_URI, // Use the variable you set in Railway
  NODE_ENV = 'development',
} = process.env;

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB using the cloud URI
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Crash test endpoint
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// Public routes
app.use('/', require('./routes/auth'));
app.use('/items', require('./routes/clothingItems'));

// Protected routes
app.use(auth);
app.use('/users', require('./routes/users'));

// Handle unknown routes
app.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

// Celebrate error handler
app.use(errors());

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT} in ${NODE_ENV} mode`);
});
