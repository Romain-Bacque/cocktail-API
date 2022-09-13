const debug = require('debug')('controller');
const { Unit } = require('../model');
const ExpressError = require('../service/ExpressError');
const assert = require('assert')

/**
 * unit est composé de 2 propriétés: name, details
 * @typedef {Object} Unit
 * @property {String} title titre de l'unité
 */
const unitController = {
    /**
     * Méthode pour retourner une liste d'unités
     * @returns {Array.<Unit>}
     */
    async getAllUnits(_, res) {
        const results = await Unit.getAll();
        
        if(results) {
            const units = results.map(result => ({ id: result.id, title: result.title }));
        
            debug(units);
            res.status(200).json(units);
        } else throw new ExpressError('not found', 404);
    },
    /**
     * Méthode pour retourner une unité
     * @returns {Unit}
     */
    async getUnitById(req, res) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const result = await Unit.getById(id);
        
        if(result) {
            const unit = { id: result.id, title: result.title };

            debug(unit);
            res.status(200).json(unit);
        } else throw new ExpressError('not found', 404);
    },
    /**
     * Méthode pour ajouter une unité, puis retourne une liste d'unités à jour
     * @returns {Array.<Unit>}
     */
    async addUnit(req, res) {
        const newUnit = new Unit(req.body);
        const result = await newUnit.insertOne();
        
        if(result) {
            const unit = { id: result.id, title: result.title };

            debug(unit);
            res.status(200).json(unit);
        } else throw new ExpressError('not found', 404);
    },
    /**
     * Méthode pour supprimer une unité
     */
    async deleteIngredient(req, res) {
        const { id } = req.params;

        assert.ok(!isNaN(id), 'id must be a number!');

        const result = await Unit.deleteOne(id);

        if(result) {
            res.sendStatus(200);
        } else throw new ExpressError('not found', 404);
    },
}

module.exports = unitController;
