const { Router } = require('express');
const temperamentController = require('../cotrollers/temperaments.controllers');
const isAuth = require('../middleware/is-auth');

const temperamentRouter = Router();

temperamentRouter.get('/', isAuth, temperamentController.getTemperamentList);
temperamentRouter.get('/:id', isAuth, temperamentController.getTemperamentById);
temperamentRouter.post('/,', isAuth,temperamentController.createTemperament);
temperamentRouter.put('/:id', isAuth,temperamentController.updateTemperament);
temperamentRouter.delete('/:id', isAuth,temperamentController.deleteTemperamentById);

module.exports = temperamentRouter;
