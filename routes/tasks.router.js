const express = require('express');
const { 
    getTasks,
    getTaskById,
    create,
    update,
    remove 
} = require('../controllers/task.controller');

const router = express.Router();

router.get('/', getTasks);
  
router.get('/:id', getTaskById);

router.post('/', create)

router.patch('/:id', update);

router.delete('/:id', remove);

module.exports = router;