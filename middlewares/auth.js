const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { ERROR_UNAUTHORIZED } = require('../utils/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(ERROR_UNAUTHORIZED).send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(ERROR_UNAUTHORIZED).send({ message: 'Authorization required' });
  }

  req.user = payload;
  return next(); // ✅ Always return
};

module.exports = auth;
