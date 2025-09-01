const express = require('express');
const { ERROR_NOT_FOUND } = require('../utils/errors');

const router = express.Router();

router.use('/users', require('./users'));
router.use('/items', require('./clothingItems'));

router.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Requested resource not found' });
});

module.exports = router;