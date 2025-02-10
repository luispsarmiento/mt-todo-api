const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi); //Reference: https://stackoverflow.com/questions/57658864/how-to-validate-for-objectid

const id = Joi.objectId();
const name = Joi.string().min(1).max(150);
const description = Joi.string().min(1).max(200);

const createSpaceSchema = Joi.object({
    name: name.required(),
    description: description,
});

const updateSpaceSchema = Joi.object({
    name: name.required(),
    description: description,
});

const getSpaceSchema = Joi.object({
    id: id.required()
});

module.exports = { createSpaceSchema, updateSpaceSchema, getSpaceSchema };
