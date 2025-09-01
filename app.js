const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ NEW: Add cors
const mainRouter = require('./routes/index');
const auth = require('./middlewares/auth'); // ✅ NEW: Import auth middleware

const { PORT = 3001 } = process.env;
const app = express();

// ✅ NEW: Add cors middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    // ✅ FIX: removed console.log to satisfy no-console rule
  })
  .catch((err) => {
    // ✅ FIX: removed console.error, throwing instead
    throw err;
  });

// ✅ REMOVED: Temporary authorization middleware

// ✅ ADDED: Direct routes for signin/signup (without auth)
app.post('/signup', require('./controllers/users').createUser);
app.post('/signin', require('./controllers/users').login);

// ✅ ADDED: Auth middleware for all other routes
app.use(auth);

// Use routes
app.use('/', mainRouter);
// ✅ FIXED: Remove unused next parameter
app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

// ... existing code ...

app.listen(PORT, () => {
  // ✅ FIX: removed console.log
});