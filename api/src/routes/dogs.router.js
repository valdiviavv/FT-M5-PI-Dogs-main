const { Router } = require('express');
const dogsController = require('../cotrollers/dogs.controllers');

const dogsRouter = Router();

dogsRouter.get('/', dogsController.getDogList);
dogsRouter.get('/:id', dogsController.getDogById);
dogsRouter.post('/',dogsController.createDog);
dogsRouter.put('/:id', dogsController.updateDog);
dogsRouter.delete('/:id', dogsController.deleteDogById);

module.exports = dogsRouter;
