const express = require('express');
const unitController = require('../controller/unitController');
const catchAsync = require('../service/catchAsync');
const { unitSchema } = require('../validation/schemas');
const { validate } = require('../validation/validate');

const router = express.Router();

router.route('/')
    /**
     * GET /units
     * @summary récupère la liste des unités
     * @tag GET
     * @returns {Array.<Unit>} 200 - success response - application/json
     */
    .get(catchAsync(unitController.getAllUnits))
    /**
     * POST /units
     * @summary ajoute une nouvelle unité
     * @tag POST
     * @param {Unit} request.body
     * @returns {} 200 - success response - application/json
     */
    .post(validate(unitSchema), catchAsync(unitController.addUnit));

router.route('/:id')
    /**
     * GET /units/:id
     * @summary recupère une unité grâce à son id
     * @tag GET
     * @returns {Unit} 200 - success response - application/json
     */
    .get(catchAsync(unitController.getUnitById))
    /**
     * DELETE /units/:id
     * @summary supprime une unité grâce à son id
     * @tag DELETE
     * @returns {} 200 - success response - application/json
     */
    .delete(catchAsync(unitController.deleteunit));

module.exports = router;