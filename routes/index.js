// routes/index.js - UPDATED FOR PROJECT 15
const express = require('express');
const { NotFoundError } = require('../utils/errors/index');

const router = express.Router();

// 404 handler for undefined routes
router.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
