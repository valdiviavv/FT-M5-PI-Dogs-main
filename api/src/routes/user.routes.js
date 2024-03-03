const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');

const userController = require('../cotrollers/user.controller');

const router = express.Router();

router.get('/', isAuth, userController.getUserList);

router.put('/:userId', [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage('Please enter a valid password with a minimum of 8 characters'),
        body('name')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Please enter a valid name.')
    ],
    isAuth, userController.updateUser);

router.delete('/:userId', isAuth, userController.deleteUser);

module.exports = router;