const express = require('express');

const signupRouter = require("./signup.routes");
const userRouter = require("./user.routes");
const dogsRouter = require("./dogs.router");
const temperamentRouter = require("./temperaments.router");

const router = express.Router();

router.use('/', signupRouter);
router.use('/users', userRouter);
router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentRouter);

module.exports = router;