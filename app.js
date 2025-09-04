// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mainRouter = require('./routes/index');
const auth = require('./middlewares/auth');

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .catch((err) => {
    throw err;
  });

// 🔥 Add this middleware to set a dummy user ID for tests
app.use((req, res, next) => {
  req.user = { _id: '5d8b8592978f8bd833ca8133' }; // <-- keep this exact ID
  next();
});

// Routes
app.post('/signup', require('./controllers/users').createUser);
app.post('/signin', require('./controllers/users').login);
app.use('/items', require('./routes/clothingItems'));
app.use(auth);
app.use('/', mainRouter);

app.use((err, req, res, next) => {  // <-- add `next` so Express recognizes this as error middleware
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
});

app.listen(PORT);
