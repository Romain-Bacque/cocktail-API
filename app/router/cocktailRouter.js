const express = require('express');
const cocktailController = require('../controller/cocktailController');
const catchAsync = require('../service/catchAsync');
const { cocktailSchema } = require('../validation/schemas');
const { validate } = require('../validation/validate');

const router = express.Router();


router.route('/')
    /**
     * GET /cocktails
     * @summary récupère la liste des cocktails
     * @tag GET
     * @returns {Array.<Cocktail>} 200 - success response - application/json
     */
    .get(catchAsync(cocktailController.getAllCocktails))
    /**
     * POST /cocktails
     * @summary ajoute un nouveau cocktail
     * @tag POST
     * @param {Cocktail} request.body
     * @returns {} 200 - success response - application/json
     */
    .post(validate(cocktailSchema), catchAsync(cocktailController.addCocktail))

router.route('/:id')
    /**
     * GET /cocktails/:id
     * @summary recupère un cocktail grâce à son id
     * @tag GET
     * @returns {Cocktail} 200 - success response - application/json
     */
    .get(catchAsync(cocktailController.getCocktailById))
    /**
     * PUT /cocktails/:id
     * @summary modifie un cocktail grâce à son id
     * @tag PUT
     * @param {Cocktail} request.body
     * @returns {Array.<Cocktail>} 200 - success response - application/json
     */
    .put(validate(cocktailSchema), catchAsync(cocktailController.editCocktail))
    /**
     * DELETE /cocktails/:id
     * @summary supprime un cocktail grâce à son id
     * @tag DELETE
     * @returns {} 200 - success response - application/json
     */
    .delete(catchAsync(cocktailController.deleteCocktail));

module.exports = router;