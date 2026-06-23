const Joi = require('joi');

module.exports.eventSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(), // Fixed typo: 'contry' -> 'country'
    price: Joi.number().min(0).required(),
    image: Joi.string().allow("", null).optional(),
    date: Joi.date().iso().optional() // Add this if your route uses 'date'
});