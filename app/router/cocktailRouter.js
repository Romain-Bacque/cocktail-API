const express = require("express");
const cocktailController = require("../controller/cocktailController");
const catchAsync = require("../service/catchAsync");
const { cocktailSchema } = require("../validation/schemas");
const { validate } = require("../validation/validate");

const router = express.Router();

router
  .route("/")
  /**
   * GET /cocktails
   * @summary get the cocktails list
   * @tag GET
   * @returns {Array.<Cocktail>} 200 - success response - application/json
   */
  .get(catchAsync(cocktailController.getAllCocktails))
  /**
   * POST /cocktails
   * @summary add a new cocktail
   * @tag POST
   * @param {Cocktail} request.body
   * @returns {} 200 - success response - application/json
   */
  .post(validate(cocktailSchema), catchAsync(cocktailController.addCocktail));

router
  .route("/:id")
  /**
   * GET /cocktails/:id
   * @summary get a cocktail thanks to its id
   * @tag GET
   * @returns {Cocktail} 200 - success response - application/json
   * @returns {} 404 - not found
   * @returns {} 500 - internal server error
   */
  .get(catchAsync(cocktailController.getCocktailById))
  /**
   * PUT /cocktails/:id
   * @summary edit a cocktail thanks to its id
   * @tag PUT
   * @param {Cocktail} request.body
   * @returns {Array.<Cocktail>} 200 - success response - application/json
   * @returns {} 404 - not found
   * @returns {} 500 - internal server error
   */
  .put(validate(cocktailSchema), catchAsync(cocktailController.editCocktail))
  /**
   * DELETE /cocktails/:id
   * @summary delete a cocktail thanks to its id
   * @tag DELETE
   * @returns {} 200 - success response - application/json
   * @returns {} 404 - not found
   * @returns {} 500 - internal server error
   */
  .delete(catchAsync(cocktailController.deleteCocktail));

module.exports = router;
