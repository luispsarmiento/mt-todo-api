const validationHandler = require('../middleware/validator')
const { 
    getTaskSchema, 
    createTaskSchema, 
    updateTaskSchema 
} = require('../schemas/task.schema');

exports.getTaskByIdValidation = validationHandler(getTaskSchema, 'params');
exports.createTaskValidation = validationHandler(createTaskSchema, 'body');
exports.updateTaskValidation = validationHandler(updateTaskSchema, 'body');
