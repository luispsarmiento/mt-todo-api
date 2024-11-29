const express = require('express');
const mtCrypt = require('../utils/mtCrypt');
const boom = require('@hapi/boom');
const auth = require('../utils/auth');
const cache = require('../utils/cache');
const superagent = require('superagent');
const { boomErrorHandler } = require('../middleware/error');

const router = express.Router();

const getToken = (apiKey) => {
    var key = mtCrypt.generateKey();
    var hash = mtCrypt.encrypt(apiKey, key);
    
    cache.set(hash, key, (60 * 60 * 24))

    return `${hash}`
}

router.post('/', async (req, res, next) =>{
    try{
        const response = await superagent.post(process.env.SECURITY_API_URL+"/api/OAuth/Login").send(req.body);
        const data = await response.body;

        res.status(201).json(data);
    }catch(err){
        res.status(err.status).json({
            success: false,
            message: err.message
        });
    }
});

router.post('/refresh-token', async (req, res, next) =>{
    try{
        const response = await superagent.post(process.env.SECURITY_API_URL+"/api/OAuth/RefreshToken").send(req.body);
        const data = await response.body;

        res.status(201).json(data);
    }catch(err){
        res.status(err.status).json({
            success: false,
            message: err.message
        });
    }
});

router.post('/logout', async (req, res, next) =>{
    try{
        const response = await superagent.post(process.env.SECURITY_API_URL+"/api/OAuth/Logout").send(req.body);
        const data = await response.body;

        res.status(201).json(data);
    }catch(err){
        res.status(err.status).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;