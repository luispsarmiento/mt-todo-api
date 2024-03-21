const express = require('express');
const { 
    getTaskByIdValidation, 
    createTaskValidation, 
    updateTaskValidation 
} = require('../validations/task.validation');
const { 
    getTasks,
    getTaskById,
    create,
    update,
    remove 
} = require('../controllers/task.controller');

const router = express.Router();

router.get('/', getTasks);
  
router.get('/:id',
    getTaskByIdValidation,
    getTaskById);

router.post('/', 
    createTaskValidation,
    create)

router.patch('/:id', 
    getTaskByIdValidation,
    updateTaskValidation,
    update);

router.delete('/:id', 
    getTaskByIdValidation,
    remove);

module.exports = router;