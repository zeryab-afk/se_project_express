const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');

const { PORT = 3001 } = process.env;
const app = express();

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

// Temporary authorization middleware - USE ONE OF THESE IDs
app.use((req, res, next) => {
  req.user = {
    _id: '68b14587079503c84fa2bfb8'
  };
  next();
});

// Use routes - This should come AFTER the auth middleware (ONLY ONCE)
app.use("/", mainRouter);

app.listen(PORT, () => {
  // ✅ FIX: removed console.log
});
