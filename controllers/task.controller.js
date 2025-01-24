const asyncHandler = require('../middleware/async');
const TaskService = require('./../services/task.service');

const service = new TaskService();

// @desc      Get all tasks
// @route     GET /api/tasks
// @access    Public
exports.getTasks = asyncHandler(async (req, res, next) => {
    try{
        const taskList = await service.find(req.user._id);

        res.json(taskList);
    }catch(err){
        next(err);
    }
});

exports.getTaskById = asyncHandler(async (req, res, next) => {
    try{
        const {id} = req.params;

        const task = await service.findOne(req.user._id, id);

        if (task == undefined || task == null){
            res.status(404).json();
        }

        res.json(task);
    }catch(err){
        next(err);
    }
});

exports.create = asyncHandler(async (req, res, next) => {
    try{
        const body = {...req.body, user_id: req.user._id};

        const newTask = await service.create(body);

        res.status(201).json({
            message: 'created',
            data: newTask
        });
    }catch(err){
        next(err)
    }
});

exports.update = asyncHandler(async (req, res, next) => {
    try {
        const {id} = req.params;
        const body = {...req.body, user_id: req.user._id};
        const taskChanged = await service.update(id, body);

        res.json({
            message: 'update',
            data: taskChanged,
        });
    } catch (err) {
        next(err);
    }
});

exports.remove = asyncHandler(async (req, res, next) => {
    try {
        const {id} = req.params;

        await service.delete(id);

        res.json({
            message: 'deleted',
            _id: id
        });
    } catch (err) {
        next(err);
    }
});
