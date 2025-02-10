const express = require('express');
const { 
    getSpaceByIdValidation, 
    createSpaceValidation, 
    updateSpaceValidation 
} = require('../validations/space.validation');
const { 
    get,
    getById,
    create,
    update,
    remove 
} = require('../controllers/space.controller');
const { authentication } = require('../middleware/auth');

const router = express.Router();

router.get('/', authentication, get);
  
router.get('/:id',
    authentication,
    getSpaceByIdValidation,
    getById);

router.post('/',
    authentication,
    createSpaceValidation,
    create)

router.patch('/:id',
    authentication,
    getSpaceByIdValidation,
    updateSpaceValidation,
    update);

router.delete('/:id',
    authentication,
    getSpaceByIdValidation,
    remove);

module.exports = router;