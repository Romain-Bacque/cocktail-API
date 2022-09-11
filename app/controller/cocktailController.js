const debug = require('debug')('controller');
const { Cocktail } = require('../model');
const ExpressError = require('../service/ExpressError');
const assert = require('assert')

/**
 * cocktail est composé de 2 propriétés: name, details
 * @typedef {Object} Cocktail
 * @property {String} name nom du cocktail
 * @property {Array} details les details de la recette du cocktail
 */
const cocktailController = {
    /**
     * Méthode pour retourner une liste de cocktails
     * @returns {Array.<Cocktail>}
     */
    async getAllCocktails(_, res) {
        const results = await Cocktail.getAll();
        
        if(results) {
            const cocktails = results.map(result => ({ name: result.name, details: result.details }));
        
            debug(cocktails);
            res.status(200).json(cocktails);
        } else throw new ExpressError('not found', 404);
    },
    /**
     * Méthode pour retourner un Cocktail
     * @returns {Cocktail}
     */
    async getCocktailById(req, res) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const result = await Cocktail.getById(id);
        
        if(result) {
            const cocktail = { cocktail: result.name, details: result.details };

            debug(cocktail);
            res.status(200).json(cocktail);
        } else throw new ExpressError('not found', 404);
    },
    /**
     * Méthode pour ajouter un cocktail, puis retourne une liste de cocktails à jour
     * @returns {Array.<Cocktail>}
     */
    async addCocktail(req, res) {
        const newCocktail = await new Cocktail(req.body);
        const result = await newCocktail.insertOne();
        
        if(result) {
            const cocktails = { cocktail: result.cocktail, details: result.details };

            debug(result);
            res.status(200).json(cocktails);
        } else throw new ExpressError('not found', 404);
    },
    /**
     * Méthode pour modifier un cocktail, puis retourne une liste de cocktails à jour
     * @returns {Array.<Cocktail>}
     */
    async editCocktail(req, res) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const newCocktail = await new Cocktail(req.body);
        const result = await newCocktail.updateOne(id);
        
        if(result) {
            const cocktails = { cocktail: result.cocktail, details: result.details };

            debug(result);
            res.status(200).json(cocktails);
        } else throw new ExpressError('not found', 404);
    },
    /**
     * Méthode pour supprimer un cocktail
     */
    async deleteCocktail(req, res) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const result = await Cocktail.deleteOne(id);

        if(result) {
            res.sendStatus(200);
        } else throw new ExpressError('not found', 404);
    },
}

module.exports = cocktailController;
