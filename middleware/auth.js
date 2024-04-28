const asyncHandler = require("./async");
const mtCrypt = require('../utils/mtCrypt');
const boom = require('@hapi/boom');
const moment = require('moment');
const auth = require('../utils/auth');
const cache = require('../utils/cache');

exports.authorize = asyncHandler(async (req, res, next) => {
    
    let apiKeyHeader = req.headers['x-api-key'] ?? undefined;

    if (apiKeyHeader === undefined){
        return next(boom.unauthorized());
    }

    key = cache.get(apiKeyHeader);
    
    if ( key == undefined ){
        return next(boom.unauthorized());
    }

    try{
        let apiKey = auth.getApiKeyByHash(apiKeyHeader, key);

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