const asyncHandler = require("./async");
const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');
const moment = require('moment');
const auth = require('../utils/auth');

exports.authorize = asyncHandler(async (req, res, next) => {
    
    let apiKeyHeader = req.headers['x-api-key'] ?? undefined;
    if (apiKeyHeader === undefined){
        return next(boom.unauthorized());
    }

    //TODO: check if the api key exists in cache

    try{
        apiKeyHeader = apiKeyHeader.split('.')[0];
        let apiKey = await auth.getApiKeyByHash(apiKeyHeader);

        if(apiKey === undefined){
            return next(boom.unauthorized());
        }
        //check expiration
        let expirationDateAsStr = atob(apiKey.split('.')[1]).split('|')[1];
        if (moment().utc().add(-6, 'hours').diff(moment(expirationDateAsStr)) >= 0){
            return next(boom.unauthorized('API key was expire'))
        }
        
        next();
    }
    catch(err){
        return next(boom.unauthorized);
    }
});