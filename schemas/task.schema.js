const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi); //Reference: https://stackoverflow.com/questions/57658864/how-to-validate-for-objectid

const id = Joi.objectId();
const name = Joi.string().min(1).max(200);
const scheduledDate = Joi.date().utc().allow(null);
const status = Joi.string().min(7).max(9);
const completedDate = Joi.date().utc().allow(null);
const notes = Joi.string().min(0).max(1500);
const priority = Joi.number().integer().min(0);
const startDate = Joi.date().utc().allow(null);
const breakDate = Joi.date().utc().allow(null);
const focusTimer = Joi.number().allow(null)
const space_id = Joi.objectId();

const subTaskSchema = Joi.object({
  name: name,
  status: status
});

const createTaskSchema = Joi.object({
    name: name.required(),
    priority: priority.required(),
    scheduledDate: scheduledDate,
    status: status,
    completedDate: completedDate,
    notes: notes,
    subTasks: Joi.array().items(subTaskSchema),
    space_id: space_id
});

const updateTaskSchema = Joi.object({
    name: name.required(),
    priority: priority.required(),
    scheduledDate: scheduledDate,
    status: status.required(),
    completedDate: completedDate,
    notes: notes,
    subTasks: Joi.array().items(subTaskSchema),
    startDate: startDate,
    breakDate: breakDate,
    focusTimer: focusTimer
});

const getTaskSchema = Joi.object({
    id: id.required()
});

const moveToSpaceSchema = Joi.object({
    space_id: space_id.required()
});

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema, moveToSpaceSchema };
