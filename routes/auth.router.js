const express = require('express');
const mtCrypt = require('../utils/mtCrypt');
const boom = require('@hapi/boom');
const auth = require('../utils/auth');
const cache = require('../utils/cache');

const router = express.Router();

const getToken = (apiKey) => {
    var key = mtCrypt.generateKey();
    var hash = mtCrypt.encrypt(apiKey, key);
    
    cache.set(hash, key, (60 * 60 * 24))

    return `${hash}`
}

router.post('/', (req, res, next) =>{
    try{
        if(req.body.apiKey === undefined || req.body.apiKey === ''){
            return next(boom.badRequest());
        }

        if(!auth.isValid(req.body.apiKey)){
            return next(boom.unauthorized());
        }

        const apiKey = getToken(req.body.apiKey);

        res.status(201).json({
            message: 'created',
            apiKey: apiKey
        });
    }catch(err){
        next(err)
    }
});

module.exports = router;