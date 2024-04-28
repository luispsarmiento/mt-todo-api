
const mtCrypt = require('./mtCrypt')

let _whiteListApiKey = [];
const getApiKeys = () => {
    const whieListApiKey = process.env.WHITELIST_API_KEY
    _whiteListApiKey = whieListApiKey.split('|');
}

const getApiKeyByHash = (hashApiKey, key) => {
    let _apiKey = undefined;
    for(let apiKey of _whiteListApiKey){
        let apiKeyDecrypted = mtCrypt.decrypt(hashApiKey, key);
        let equal = apiKey === apiKeyDecrypted;
        if (equal){
            _apiKey = apiKey;
            break;
        }
    }

    return _apiKey;
}

const isValid = async (apiKey) => {
    let isValid = false;
    let _apiKey = _whiteListApiKey.filter(k => k === apiKey);

    if (_apiKey != undefined && _apiKey.length > 0){
        isValid = true;
    }

    return isValid;
}

module.exports = {getApiKeys, getApiKeyByHash, isValid};