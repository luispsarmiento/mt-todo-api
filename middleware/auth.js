const asyncHandler = require("./async");
const bcrypt = require('bcryptjs');
const boom = require('@hapi/boom');
const moment = require('moment');

let _whiteListApiKey = [];
const getApiKeys = () => {
    const whieListApiKey = process.env.WHITELIST_API_KEY
    _whiteListApiKey = whieListApiKey.split('|');
}

const getApiKey = async (hashApiKey) => {
    let _apiKey = undefined;
    for(let apiKey of _whiteListApiKey){
        let equeal = await bcrypt.compare(apiKey, hashApiKey);
        if (equeal){
            _apiKey = apiKey;
            break;
        }
    }

    return _apiKey;
}

exports.authorize = asyncHandler(async (req, res, next) => {
    getApiKeys();
    
    let apiKeyHeader = req.headers['x-api-key'] ?? undefined;
    if (apiKeyHeader === undefined){
        return next(boom.unauthorized());
    }

    try{
        let apiKey = await getApiKey(apiKeyHeader);

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