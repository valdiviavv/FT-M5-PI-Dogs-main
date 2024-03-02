const express = require('express');

const dogsRouter = require("./dogs.router");
const temperamentRouter = require("./temperaments.router");

const router = express.Router();

router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentRouter);

module.exports = router;