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
const { authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', authorize, getTasks);
  
router.get('/:id',
    authorize,
    getTaskByIdValidation,
    getTaskById);

router.post('/',
    authorize,
    createTaskValidation,
    create)

router.patch('/:id',
    authorize,
    getTaskByIdValidation,
    updateTaskValidation,
    update);

router.delete('/:id',
    authorize,
    getTaskByIdValidation,
    remove);

module.exports = router;