const { Router } = require('express');
const dogsController = require('../cotrollers/dogs.controllers');
const isAuth = require('../middleware/is-auth');

const dogsRouter = Router();

dogsRouter.get('/', isAuth, dogsController.getDogList);
dogsRouter.get('/:id', isAuth, dogsController.getDogById);
dogsRouter.post('/', isAuth,dogsController.createDog);
dogsRouter.put('/:id', isAuth, dogsController.updateDog);
dogsRouter.delete('/:id', isAuth, dogsController.deleteDogById);

module.exports = dogsRouter;
