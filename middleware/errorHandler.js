const {constants} = require('../constants')

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed", 
                message: err.message, 
                stackTrace: err.stack
            })
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Authorization Failed", 
                message: err.message, 
                stackTrace: err.stack
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden Request", 
                message: err.message, 
                stackTrace: err.stack
            })
                break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found", 
                message: err.message, 
                stackTrace: err.stack
            })
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Failure", 
                message: err.message, 
                stackTrace: err.stack
            })
            break;
        default:
            console.log('Something went wrong!')
            break
    }
}

module.exports = errorHandler