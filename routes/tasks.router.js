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
const { authentication } = require('../middleware/auth');

const router = express.Router();

router.get('/', authentication, getTasks);
  
router.get('/:id',
    authentication,
    getTaskByIdValidation,
    getTaskById);

router.post('/',
    authentication,
    createTaskValidation,
    create)

router.patch('/:id',
    authentication,
    getTaskByIdValidation,
    updateTaskValidation,
    update);

router.delete('/:id',
    authentication,
    getTaskByIdValidation,
    remove);

module.exports = router;