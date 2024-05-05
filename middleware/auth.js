const asyncHandler = require("./async");
const mtCrypt = require('../utils/mtCrypt');
const boom = require('@hapi/boom');
const moment = require('moment');
const auth = require('../utils/auth');
const cache = require('../utils/cache');
const UserService = require('./../services/user.service');

const userService = new UserService();

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
        //get the user
        let _userId = atob(apiKey.split('.')[1]).split('|')[2];
        const user = await userService.findOne(_userId);
        if (!user){
            return next(boom.unauthorized());
        }
        req.user = user[0];
        
        next();
    }
    catch(err){
        return next(boom.unauthorized);
    }
});