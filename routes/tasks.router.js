const express = require('express');
const TaskService = require('./../services/task.service');

const router = express.Router();
const service = new TaskService();

router.get('/', (req, res) => {
    const taskList = service.find();

    res.json(taskList);
});
  
router.get('/:id', (req, res) => {
    const {id} = req.params;

    const task = service.findOne(id);

    if (task == undefined || task == null){
        res.status(404).json();
    }

    res.json(task);
});

router.post('/', (req, res) => {
    const body = req.body;

    const newTask = service.create(body);

    res.status(201).json({
        message: 'created',
        data: newTask
    });
})

router.patch('/:id', (req, res) => {
    const {id} = req.params;
    const body = req.body;

    const taskChanged = service.update(id, body);

    res.json({
        message: 'update',
        data: taskChanged,
        id
    });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    service.delete(id);

    res.json({
        message: 'deleted',
        id
    });
});

module.exports = router;