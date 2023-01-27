const express = require('express');
const ingredientController = require('../controller/ingredientController');
const catchAsync = require('../service/catchAsync');
const { ingredientSchema } = require('../validation/schemas');
const { validate } = require('../validation/validate');

const router = express.Router();

router.route('/')
    /**
     * GET /ingredients
     * @summary get the ingreddients list
     * @tag GET
     * @returns {Array.<Ingredient>} 200 - success response - application/json
     */
    .get(catchAsync(ingredientController.getAllIngredients))
    /**
     * POST /ingredients
     * @summary add a new ingredient
     * @tag POST
     * @param {Ingredient} request.body
     * @returns {} 200 - success response - application/json
     * @returns {} 404 - not found
     * @returns {} 500 - internal server error
     */
    .post(validate(ingredientSchema), catchAsync(ingredientController.addIngredient))

router.route('/:id')
    /**
     * GET /ingredients/:id
     * @summary get a ingredient thanks to its id
     * @tag GET
     * @returns {Ingredient} 200 - success response - application/json
     * @returns {} 404 - not found
     * @returns {} 500 - internal server error
     */
    .get(catchAsync(ingredientController.getIngredientById))
    /**
     * DELETE /ingredients/:id
     * @summary delete a ingredient thanks to its id
     * @tag DELETE
     * @returns {} 200 - success response - application/json
     * @returns {} 404 - not found
     * @returns {} 500 - internal server error
     */
    .delete(catchAsync(ingredientController.deleteIngredient));

module.exports = router;