const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/items', require('./clothingItems')); // Add this line

// Handle non-existent resources
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

module.exports = router;