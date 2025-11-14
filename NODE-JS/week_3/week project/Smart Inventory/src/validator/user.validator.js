const Joi = require('joi');

const userValidationSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.base': 'Le nom doit être une chaîne de caractères',
      'string.empty': 'Le nom est requis',
      'string.min': 'Le nom doit contenir au moins 2 caractères',
      'string.max': 'Le nom ne peut pas dépasser 50 caractères',
      'any.required': 'Le nom est requis'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': "L'email doit être valide",
      'string.empty': "L'email est requis",
      'any.required': "L'email est requis"
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Le mot de passe est requis',
      'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
      'any.required': 'Le mot de passe est requis'
    })
});

module.exports = userValidationSchema;
