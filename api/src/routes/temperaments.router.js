const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const temperamentController = require('../cotrollers/temperaments.controllers');

const temperamentRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
temperamentRouter.get('/', temperamentController.getTemperamentList);

module.exports = temperamentRouter;
