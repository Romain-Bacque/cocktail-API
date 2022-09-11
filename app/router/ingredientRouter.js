const express = require('express');
const ingredientController = require('../controller/ingredientController');
const catchAsync = require('../service/catchAsync');
const { ingredientSchema } = require('../validation/schemas');
const { validate } = require('../validation/validate');

const router = express.Router();

router.route('/')
    /**
     * GET /ingredients
     * @summary récupère la liste des ingredients
     * @tag GET
     * @returns {Array.<Ingredient>} 200 - success response - application/json
     */
    .get(catchAsync(ingredientController.getAllIngredients))
    /**
     * POST /ingredients
     * @summary ajoute un nouvel ingredient
     * @tag POST
     * @param {Ingredient} request.body
     * @returns {} 200 - success response - application/json
     */
    .post(validate(ingredientSchema), catchAsync(ingredientController.addIngredient))

router.route('/:id')
    /**
     * GET /ingredients/:id
     * @summary recupère un ingredient grâce à son id
     * @tag GET
     * @returns {Ingredient} 200 - success response - application/json
     */
    .get(catchAsync(ingredientController.getIngredientById))
    /**
     * DELETE /ingredients/:id
     * @summary supprime un ingredient grâce à son id
     * @tag DELETE
     * @returns {} 200 - success response - application/json
     */
    .delete(catchAsync(ingredientController.deleteIngredient));

module.exports = router;