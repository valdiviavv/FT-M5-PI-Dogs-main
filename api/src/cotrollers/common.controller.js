
exports.throwError = (errorCode, message, errors) => {
    const error = new Error(message);
    error.statusCode = errorCode;
    if (errors) {
        error.data = errors
    }
    throw error;
}

exports.errorHandler = (err, next) => {
    console.log('There was an error:', err);
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    return next(err);
}

exports.getFilter = (fieldName, fieldValue, userId) => {
    let filter= {
        creator: userId,
    }
    if (fieldValue) {
        filter[fieldName] = fieldValue
    }
    return filter;
}