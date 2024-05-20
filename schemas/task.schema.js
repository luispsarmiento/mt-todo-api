const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi); //Reference: https://stackoverflow.com/questions/57658864/how-to-validate-for-objectid

const id = Joi.objectId();
const name = Joi.string().min(10).max(200);
const scheduledDate = Joi.date().format('YYYY-MM-DD HH:mm:ss');
const status = Joi.string().min(7).max(9);
const completedDate = Joi.date().format('YYYY-MM-DD HH:mm:ss');
const notes = Joi.string().min(0).max(1500);
const priority = Joi.number().integer().min(0);

const createTaskSchema = Joi.object({
    name: name.required(),
    priority: priority.required()
});

const updateTaskSchema = Joi.object({
    name: name.required(),
    priority: priority.required(),
    scheduledDate: scheduledDate,
    status: status.required(),
    completedDate: completedDate,
    notes: notes
});

const getTaskSchema = Joi.object({
    id: id.required()
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema };