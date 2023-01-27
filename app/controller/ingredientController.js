const debug = require('debug')('controller');
const { Ingredient } = require('../model');
const ExpressError = require('../service/ExpressError');
const assert = require('assert');

/**
 * ingredient is composed of 2 properties: name, details
 * @typedef {Object} Ingredient
 * @property {String} name nom de l'ingredient
 * @property {String} unit titre de l'unité
 */
const ingredientController = {
    /**
     * Method to return an ingredient list
     * @param {*} _ unused parameter
     * @param {express.Response} res Express response object
     * @param {express.NextFunction} next Express response function
     * @returns {Array.<Ingredient>}
     */
    async getAllIngredients(_, res, next) {
        const results = await Ingredient.getAll();
        
        if(results) {
            const ingredients = results.map(result => ({ ingredient: result.name, unit: result.unit }));
        
            debug(ingredients);
            res.status(200).json(ingredients);
        } else next();
    },
    /**
     * Method to return an ingredient
     * @param {express.Request} req Express request object
     * @param {express.Response} res Express response object
     * @param {express.NextFunction} next Express response function
     * @returns {Ingredient}
     */
    async getIngredientById(req, res, next) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const result = await Ingredient.getById(id);
        
        if(result) {
            const ingredient = { ingredient: result.name, unit: result.unit };

            debug(ingredient);
            res.status(200).json(ingredient);
        } else next();
    },
    /**
     * Method to add an ingredient, then return an updated ingredient list
     * @param {express.Request} req Express request object
     * @param {express.Response} res Express response object
     * @param {express.NextFunction} next Express response function
     * @returns {Array.<Ingredient>}
     */
    async addIngredient(req, res, next) {
        const newIngredient = new Ingredient(req.body);
        const result = await newIngredient.insertOne();
        
        if(result) {
            const ingredients = { ingredient: result.ingredient, unit: result.unit };

            debug(result);
            res.status(200).json(ingredients);
        } else next();
    },
    /**
     * Methode to delete an ingredient
     * @param {express.Request} req Express request object
     * @param {express.Response} res Express response object
     * @param {express.NextFunction} next Express response function
     */
    async deleteIngredient(req, res, next) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const result = await Ingredient.deleteOne(id);

        debug(result);
        if(result) {
            res.sendStatus(200);
        } else next();
    },
}

module.exports = ingredientController;
