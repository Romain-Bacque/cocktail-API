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
     * @returns {} 404 - not found
     * @returns {} 500 - internal server error
     */
    .get(catchAsync(unitController.getAllUnits))
    /**
     * POST /units
     * @summary add a new unit
     * @tag POST
     * @param {Unit} request.body
     * @returns {} 200 - success response - application/json
     * @returns {} 404 - not found
     * @returns {} 500 - internal server error
     */
    .post(validate(unitSchema), catchAsync(unitController.addUnit));

router.route('/:id')
    /**
     * GET /units/:id
     * @summary get a unit thanks to its id
     * @tag GET
     * @returns {Unit} 200 - success response - application/json
     * @returns {} 404 - not found
     * @returns {} 500 - internal server error
     */
    .get(catchAsync(unitController.getUnitById))
    /**
     * DELETE /units/:id
     * @summary delete a unit thanks to its id
     * @tag DELETE
     * @returns {} 200 - success response - application/json
     * @returns {} 404 - not found
     * @returns {} 500 - internal server error
     */
    .delete(catchAsync(unitController.deleteunit));

module.exports = router;