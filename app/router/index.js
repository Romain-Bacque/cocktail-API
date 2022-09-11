
const express = require('express');
const errorHandler = require('../service/errorHandler');
const cocktailRouter = require('./cocktailRouter');
const ingredientRouter = require('./ingredientRouter');
const unitRouter = require('./unitRouter');
const router = express.Router();

router.use('/cocktails', cocktailRouter);
router.use('/ingredients', ingredientRouter);
router.use('/units', unitRouter);

/**
 * gestion de la 404
 */
 router.use(errorHandler.notFound);

 /**
  * gestion des erreurs
  */
 router.use(errorHandler.manage);

module.exports = router;



