const Joi = require('joi');
const mongoose = require('mongoose');

// Custom validator for MongoDB ObjectId
const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const orderItemSchema = Joi.object({
  productId: Joi.string().custom(objectIdValidator, 'ObjectId validation').required()
    .messages({
      'any.required': 'Le produit est obligatoire',
      'any.invalid': 'ID produit invalide',
    }),
  quantity: Joi.number().integer().min(1).required()
    .messages({
      'number.min': 'La quantité doit être au moins 1',
      'any.required': 'La quantité est obligatoire',
    }),
  // unitPrice is optional; you can calculate it on server
  unitPrice: Joi.number().positive().precision(2),
});

const orderSchema = Joi.object({
  items: Joi.array().items(orderItemSchema).min(1).required()
    .messages({
      'array.min': 'La commande doit contenir au moins un produit',
      'any.required': 'Les produits sont obligatoires',
    }),
  userId: Joi.string().custom(objectIdValidator, 'ObjectId validation').required()
    .messages({
      'any.required': 'L\'utilisateur est obligatoire',
      'any.invalid': 'ID utilisateur invalide',
    }),
  status: Joi.string().valid('pending', 'paid', 'cancelled').default('pending'),
});

module.exports = { orderSchema };
