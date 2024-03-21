const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); //Reference: https://stackoverflow.com/questions/57658864/how-to-validate-for-objectid

const id = Joi.objectId();
const name = Joi.string().min(10).max(200);
const isDone = Joi.bool().default(false);

const createTaskSchema = Joi.object({
    name: name.required(),
    isDone: isDone.required()
});

const updateTaskSchema = Joi.object({
    name: name.required(),
    isDone: isDone.required()
});

const getTaskSchema = Joi.object({
    id: id.required()
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema };