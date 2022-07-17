const { Router } = require('express');
const dogsController = require('../cotrollers/dogs.controllers');

const dogsRouter = Router();

dogsRouter.get('/', dogsController.getDogList);

module.exports = dogsRouter;
