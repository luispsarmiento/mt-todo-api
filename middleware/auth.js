const asyncHandler = require("./async");
const mtCrypt = require('../utils/mtCrypt');
const boom = require('@hapi/boom');
const moment = require('moment');
const auth = require('../utils/auth');
const cache = require('../utils/cache');
const superagent = require('superagent');
const UserService = require('./../services/user.service');

const userService = new UserService();

exports.authentication = asyncHandler(async (req, res, next) => {
    try{
        const response = await superagent.get(process.env.SECURITY_API_URL+"/api/OAuth/TokenValidate")
                                         .set({'authorization': req.headers.authorization});
        const data = await response.body;

        const user = await userService.findOne(data.id);
        if (!user){
            return next(boom.unauthorized());
        }
        req.user = user[0];

        next();
    }
    catch(err){
        return next(boom.unauthorized());
    }
});