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
 * handle 404
 */
 router.use(errorHandler.notFound);

 /**
  * handle Express errors
  */
 router.use(errorHandler.manage);

module.exports = router;
