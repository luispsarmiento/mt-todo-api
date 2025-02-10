const validationHandler = require('../middleware/validator')
const { 
    getSpaceSchema, 
    createSpaceSchema, 
    updateSpaceSchema 
} = require('../schemas/space.schema');

exports.getSpaceByIdValidation = validationHandler(getSpaceSchema, 'params');
exports.createSpaceValidation = validationHandler(createSpaceSchema, 'body');
exports.updateSpaceValidation = validationHandler(updateSpaceSchema, 'body');
