require('dotenv').config();
const {throwError, errorHandler} = require('./common.controller');
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");

const { User } = require('../db');
const { Op } = require("sequelize");

exports.getUserList = (req, res, next) => {
    // #swagger.description = 'Retrieves the list of users registered.'
    // #swagger.tags = ['Users'] #swagger.security = [{ "bearerAuth": [] }]

    console.log('The user getUserList() method was called!');
    const currentPage = req.query.page || 1;
    const perPage = process.env.ITEMS_PER_PAGE;
    let totalItems;
    User.count()
        .then(function(count) {
            totalItems = count;
            return User.findAll({
                limit: perPage,
                offset: (currentPage - 1) * perPage,
                attributes: {exclude: ['password']},
                });
        })
        .then(userList => {
            res.status(200).json({
                message: 'Fetched users successfully.',
                users: userList,
                currentPage,
                totalItems
            });
        })
        .catch(err => {
            return errorHandler(err, next);
        });
};

exports.updateUser = (req, res, next) => {
    // #swagger.description = 'Updates the requested user fields.'
    // #swagger.tags = ['Users'] #swagger.security = [{ "bearerAuth": [] }]

    const userId = req.params.userId;
    console.log('The user updateUser() method was called: ', userId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throwError(422, 'Validation failed, entered data is incorrect.', errors.array());
    }
    if (req.userId !== userId) {
        throwError(403, 'Not Authorized, you cannot update another user.')
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    User.findByPk(userId)
        .then(user => {
            if (!user) {
                throwError(422, 'Could not find user.');
            }
            return bcrypt.hash(password, 12)
                .then(hashedPw => {
                    user.name = name;
                    user.email = email;
                    user.password = hashedPw
                    return user.save();
                });
        })
        .then(result => {
            delete result.dataValues.password;
            res.status(200).json({
                message: 'User updated!',
                post: result
            });
        })
        .catch(err => {
            return errorHandler(err, next);
        });
}

exports.deleteUser = (req, res, next) => {
    // #swagger.description = 'Deletes the requested user.'
    // #swagger.tags = ['Users'] #swagger.security = [{ "bearerAuth": [] }]
    const userId = req.params.userId;
    console.log('The user deleteUser() method was called: ', userId);
    if (req.userId !== userId) {
        throwError(403, 'Not Authorized, you cannot delete another user')
    }
    let deletedUser;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                throwError(422, 'Could not find user.');
            }
            deletedUser = user.dataValues;
            deletedUser = {...deletedUser};
            return user.destroy();
        })
        .then(user => {
            delete deletedUser.password;
            res.status(200).json({
                message: 'Deleted user.',
                user: deletedUser
            });
        })
        .catch(err => {
            return errorHandler(err, next);
        })
}
