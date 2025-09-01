const express = require('express');
const { StatusCodes } = require('http-status-codes');

const router = express.Router();

router.use('/users', require('./users'));
router.use('/items', require('./clothingItems'));

// Handle non-existent resources
router.use('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({ message: 'Requested resource not found' });
});

module.exports = router;
