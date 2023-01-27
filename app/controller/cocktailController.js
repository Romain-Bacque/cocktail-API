const debug = require('debug')('controller');
const { Cocktail } = require('../model');
const ExpressError = require('../service/ExpressError');
const assert = require('assert')

/**
 * Cocktail is composed of 2 properties: name, details
 * @typedef {Object} Cocktail
 * @property {String} name cocktail name
 * @property {Array} details cocktail recipe details
 */
const cocktailController = {
    /**
     * Method to return a list of cocktails
     * @param {*} _ unused parameter
     * @param {express.Response} res Express response object
     * @param {express.NextFunction} next Express response function
     * @returns {Array.<Cocktail>}
     */
    async getAllCocktails(_, res, next) {
        const results = await Cocktail.getAll();
        
        if(results) {
            const cocktails = results.map(result => ({ name: result.name, details: result.details }));
        
            debug(cocktails);
            res.status(200).json(cocktails);
        } else next();
    },
    /**
     * Method to return a cocktail
     * @param {express.Request} req Express request object
     * @param {express.Response} res Express response object
     * @param {express.NextFunction} next Express response function
     * @returns {Cocktail}
     */
    async getCocktailById(req, res, next) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const result = await Cocktail.getById(id);
        
        if(result) {
            const cocktail = { cocktail: result.name, details: result.details };

            debug(cocktail);
            res.status(200).json(cocktail);
        } else next();
    },
    /**
     * Method to add a cocktail, then return an updated cocktail list
     * @param {express.Request} req Express request object
     * @param {express.Response} res Express response object
     * @param {express.NextFunction} next Express response function
     * @returns {Array.<Cocktail>}
     */
    async addCocktail(req, res, next) {
        const newCocktail = new Cocktail(req.body);
        const result = await newCocktail.insertOne();
        
        if(result) {
            const cocktails = { cocktail: result.cocktail, details: result.details };

            debug(result);
            res.status(200).json(cocktails);
        } else next();
    },
    /**
     * Method to modify a cocktail, then return an updated cocktail list
     * @param {express.Request} req Express request object
     * @param {express.Response} res Express response object
     * @param {express.NextFunction} next Express response function
     * @returns {Array.<Cocktail>}
     */
    async editCocktail(req, res, next) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const newCocktail = new Cocktail(req.body);
        const result = await newCocktail.updateOne(id);
        
        if(result) {
            const cocktails = { cocktail: result.cocktail, details: result.details };

            debug(result);
            res.status(200).json(cocktails);
        } else next();
    },
    /**
     * Method to delete a cocktail
     * @param {express.Request} req Express request object
     * @param {express.Response} res Express response object
     * @param {express.NextFunction} next Express response function
     */
    async deleteCocktail(req, res, next) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const result = await Cocktail.deleteOne(id);

        debug(result);
        if(result) {
            res.sendStatus(200);
        } else next();
    },
}

module.exports = cocktailController;
