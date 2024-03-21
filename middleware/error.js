const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        error: err.message || 'Server Error'
    })
}

const boomErrorHandler = (err, req, res, next) => {
    if(err.isBoom){
        const { output } = err;
        res.status(output.statusCode).json(output.payload)
    }

    next(err);
}

module.exports = {errorHandler, boomErrorHandler};