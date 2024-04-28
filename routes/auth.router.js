const express = require('express');
const boom = require('@hapi/boom');
const auth = require('../utils/auth');
const _cache = require('node-cache');

const router = express.Router();

const cache = new NodeCache();

router.post('/', (req, res, next) =>{
    try{
        if(req.body.apiKey === undefined || req.body.apiKey === ''){
            return next(boom.badRequest());
        }

        if(!auth.isValid(req.body.apiKey)){
            return next(boom.unauthorized());
        }

        const apiKey = auth.getToken(req.body.apiKey);

        //TODO: save api key in cache
        //cache.set("")

        res.status(201).json({
            message: 'created',
            apiKey: apiKey
        });
    }catch(err){
        next(err)
    }
});