const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3001 } = process.env;
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');

app.listen(3001, () => {             
  console.log("Server is running on port 3001");
});