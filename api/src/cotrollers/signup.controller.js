require('dotenv').config();
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
// Source: https://app.sendgrid.com/settings/sender_auth/senders
const sendgridTransport = require('nodemailer-sendgrid-transport');

const { Signup, User } = require('../db');
const { Op } = require("sequelize");

const {throwError, errorHandler} = require('./common.controller');
const crypto = require("crypto");

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_KEY
    }
}));

exports.postSignup = (req, res, next) => {
    // #swagger.description = 'Creates a new user and sends a verification email.'
    // #swagger.tags = ['Signup']

    console.log('Signup postSignup method was called:', req.body.email);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throwError(422, 'Validation failed.', errors.array());
    }

    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log('post signup token generation error: ', err)
            throwError(500, 'Token generation failed.', err);
        }

        const email = req.body.email;
        const name = req.body.name;
        const token = buffer.toString('hex');
        const password = req.body.password;

        bcrypt.hash(password, 12)
            .then(hashedPw => {
                return Signup.create({
                    email,
                    password: hashedPw,
                    name,
                    resetToken: token,
                    resetTokenExpiration: Date.now() + 3600000 // + 1 hour
                });
            })
            .then(result => {
                console.log("the signup object was saved", result.id);
                const httpProtocol = req.hostname === 'localhost' ? 'http' : 'https';
                const httpPort = req.hostname === 'localhost' ? req.socket.localPort : '';
                return transporter.sendMail({
                    to: email,
                    from: 'valdiviavv@hotmail.com',
                    subject: 'Confirmation email!',
                    html: `
                    <p>Hi ${name}, your user was created.</p>
                    <p>Click this link to confirm your email: <a href="${httpProtocol}://${req.hostname}:${httpPort}/signup/${token}">link</a></p>
                    `
                })
            })
            .then(result => {
                console.log('the email was sent', result);
                res.status(201).json({
                    message: 'Confirmation email sent!',
                    date: new Date().toISOString()
                });
            })
            .catch(err => {
                return errorHandler(err, next);
            });
    });
};

exports.confirmSignup = (req, res, next) => {
    // #swagger.description = 'Confirms the user email using the link sent to the user.'
    // #swagger.tags = ['Signup']

    const token = req.params.token;
    console.log('Signup confirmSignup method was called.', token);
    Signup.findOne({ where:  {
            resetToken: token,
            resetTokenExpiration : {
                [Op.gt]: Date.now()
            }
        }})
        .then(result => {
            return User.create({
                email: result.email,
                password: result.password,
                name: result.name
            });
        })
        .then(result => {
            res.status(201).json({
                message: 'User created!',
                userId: result.id
            });
        })
        .catch(err => {
            return errorHandler(err, next);
        });
};

exports.login = (req, res, next) => {
    // #swagger.description = 'Generates a token using the provided credentials.'
    // #swagger.tags = ['Signup']

    console.log('Signup login method was called:', req.body.email);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throwError(422, 'Validation failed.', errors.array());
    }

    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({where: {email}})
        .then(user => {
            if (!user) {
                throwError(401, 'A user with this email could not be found.');
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                throwError(401, 'Wrong password!');
            }
            const token = jwt.sign({
                    email: loadedUser.email,
                    userId: loadedUser.id
                },
                process.env.JWT_SECRET,
                {
                expiresIn: '1h'
            });
            res.status(200).json({
                token,
                userId: loadedUser.id
            });
            clearSignUpsCollection();
        })
        .catch(err => {
            return errorHandler(err, next);
        });
};

function clearSignUpsCollection() {
    console.log('the clearSignUpsCollection() method was called')
    Signup.destroy({where: {
            resetTokenExpiration: {[Op.lt]: Date.now()}
        }})
        .then(result => {
            console.log('one or several old signup docs were found and cleared: ', result);
        })
        .catch(err => {
            console.log('there was an error deleting old signup docs: ', err)
    });
}
