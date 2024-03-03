require('dotenv').config();
const jwt = require('jsonwebtoken');
const {throwError} = require('../cotrollers/common.controller');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        throwError(401, 'The authorization token was not provided.');
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        throwError(401, 'The authorization token verification failed.');
    }
    if (!decodedToken) {
        throwError(401, 'Not authenticated.');
    }
    req.userId = decodedToken.userId.toString(); //converts the number to string.
    next();
};