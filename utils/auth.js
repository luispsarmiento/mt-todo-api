// This is to encrypt data

const getToken = async (apiKey) => {
    var salt = await bcrypt.genSaltSync(16);
    var hash = await bcrypt.hashSync(apiKey, salt);

    return `${hash}.${salt}`
};

let _whiteListApiKey = [];
const getApiKeys = () => {
    const whieListApiKey = process.env.WHITELIST_API_KEY
    _whiteListApiKey = whieListApiKey.split('|');
}

const getApiKeyByHash = async (hashApiKey) => {
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

const isValid = async (apiKey) => {
    let isValid = false;
    let _apiKey = _whiteListApiKey.filter(k => k === apiKey);

    if (_apiKey != undefined && _apiKey.length > 0){
        isValid = true;
    }

    return isValid;
}

module.exports = {getToken, getApiKeys, getApiKeyByHash, isValid};