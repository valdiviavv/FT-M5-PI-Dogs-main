const express = require('express');
const { body } = require('express-validator');

const { User } = require('../db');
const signupController = require('../cotrollers/signup.controller');

const router = express.Router();

const signupValidations = [
    body('email')
        .not().isEmpty()
        .withMessage('Email should not be empty.')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .normalizeEmail().custom((value, {req}) => {
        return User.findOne({
            where: {
                email: value
            }
        })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject(new Error('E-Mail address already exists!'));
                }
            });
    }),
    body('password')
        .trim()
        .isLength({ min: 8 })
        .withMessage('Password minimal length is 8 characters.')
        .isLength({ max: 30 })
        .withMessage('Password maximal length is 30 characters.')
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        .withMessage('Password should have at least one number and one special character'),
    body('name')
        .trim()
        .not().isEmpty()
        .withMessage('Name should not be empty.')
        .isLength({ min: 3 })
        .withMessage('Name minimal length is 3 characters.')
        .isLength({ max: 50 })
        .withMessage('Name maximal length is 50 characters.')
];

const loginValidations = [
    body('email')
        .not().isEmpty()
        .withMessage('password should not be empty.'),
    body('password')
        .not().isEmpty()
        .withMessage('password should not be empty.'),
];

router.post('/signup', signupValidations, signupController.postSignup);
router.get('/signup/:token', signupController.confirmSignup)
router.post('/login', loginValidations, signupController.login);

module.exports = router;
