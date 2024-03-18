const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    })
}

const boomErrorHandler = (err, req, res, next) => {
    if(err.IsBoom){
        const { output } = err;
        res.status(err.statusCode).json(output.payload)
    } else {
        next(err);
    }
}

module.exports = {errorHandler, boomErrorHandler};