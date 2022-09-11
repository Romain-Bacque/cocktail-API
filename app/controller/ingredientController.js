const debug = require('debug')('controller');
const { Ingredient } = require('../model');
const ExpressError = require('../service/ExpressError');
const assert = require('assert')

/**
 * ingredient est composé de 2 propriétés: name, details
 * @typedef {Object} Ingredient
 * @property {String} name nom de l'ingredient
 * @property {String} unit titre de l'unité
 */
const ingredientController = {
    /**
     * Méthode pour retourner une liste d'ingredients
     * @returns {Array.<Ingredient>}
     */
    async getAllIngredients(_, res) {
        const results = await Ingredient.getAll();
        
        if(results) {
            const ingredients = results.map(result => ({ ingredient: result.name, unit: result.unit }));
        
            debug(ingredients);
            res.status(200).json(ingredients);
        } else throw new ExpressError('not found', 404);
    },
    /**
     * Méthode pour retourner un ingredient
     * @returns {Ingredient}
     */
    async getIngredientById(req, res) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const result = await Ingredient.getById(id);
        
        if(result) {
            const ingredient = { ingredient: result.name, unit: result.unit };

            debug(ingredient);
            res.status(200).json(ingredient);
        } else throw new ExpressError('not found', 404);
    },
    /**
     * Méthode pour ajouter un ingredient, puis retourne une liste d'ingredients à jour
     * @returns {Array.<Ingredient>}
     */
    async addIngredient(req, res) {
        const newIngredient = await new Ingredient(req.body);
        const result = await newIngredient.insertOne();
        
        if(result) {
            const ingredients = { ingredient: result.ingredient, unit: result.unit };

            debug(result);
            res.status(200).json(ingredients);
        } else throw new ExpressError('not found', 404);
    },
    /**
     * Méthode pour supprimer un ingredient
     */
    async deleteIngredient(req, res) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const result = await Ingredient.deleteOne(id);

        if(result) {
            res.sendStatus(200);
        } else throw new ExpressError('not found', 404);
    },
}

module.exports = ingredientController;
