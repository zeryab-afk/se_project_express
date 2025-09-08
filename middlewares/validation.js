// middleware/validation.js - NEW FOR PROJECT 15
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

// Custom URL validation
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// Validation schemas
const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const createItemValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    weather: Joi.string().required().valid('hot', 'warm', 'cold'),
    imageUrl: Joi.string().required().custom(validateURL),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().hex().length(24),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validateURL),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  createItemValidation,
  idValidation,
  updateUserValidation,
};