const crypto = require('crypto');
const cryptoJS = require("crypto-js");

const generateKey = () => {
    const key = crypto.randomBytes(32);

    return key.toString('hex')
}

const encrypt = (value, key) => {
    return cryptoJS.AES.encrypt(value, key).toString();
}

const decrypt = (value, key) => {
    const bytes  = cryptoJS.AES.decrypt(value, key);
    var valueDecrypted = bytes.toString(cryptoJS.enc.Utf8);

    return valueDecrypted;
}

module.exports = { generateKey, encrypt, decrypt };