const asyncHandler = require('../middleware/async');
const SpaceService = require('./../services/space.service');

const service = new SpaceService();

// @desc      Get all tasks
// @route     GET /api/tasks
// @access    Public
exports.get = asyncHandler(async (req, res, next) => {
    try{
        const result = await service.find(req.user._id);

        res.json(result);
    }catch(err){
        next(err);
    }
});

exports.getById = asyncHandler(async (req, res, next) => {
    try{
        const {id} = req.params;

        const doc = await service.findOne(req.user._id, id);

        if (doc == undefined || doc == null){
            res.status(404).json();
        }

        res.json(doc);
    }catch(err){
        next(err);
    }
});

exports.create = asyncHandler(async (req, res, next) => {
    try{
        const body = {...req.body, user_id: req.user._id};

        const doc = await service.create(body);

        res.status(201).json({
            message: 'created',
            data: doc
        });
    }catch(err){
        next(err)
    }
});

exports.update = asyncHandler(async (req, res, next) => {
    try {
        const {id} = req.params;
        const body = {...req.body, user_id: req.user._id};
        const newDocument = await service.update(id, body);

        res.json({
            message: 'update',
            data: newDocument,
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
