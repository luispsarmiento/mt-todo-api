const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi); //Reference: https://stackoverflow.com/questions/57658864/how-to-validate-for-objectid

const id = Joi.objectId();
const name = Joi.string().min(10).max(200);
const scheduledDate = Joi.date().format('YYYY-MM-DD HH:mm:ss')
const status = Joi.string().min(7).max(9)
const completedDate = Joi.date().format('YYYY-MM-DD HH:mm:ss')

const createTaskSchema = Joi.object({
    name: name.required()
});

const updateTaskSchema = Joi.object({
    name: name.required(),
    scheduledDate: scheduledDate,
    status: status.required(),
    completedDate: completedDate
});

const getTaskSchema = Joi.object({
    id: id.required()
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema };