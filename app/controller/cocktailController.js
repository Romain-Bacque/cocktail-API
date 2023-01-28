const debug = require("debug")("controller");
const { Cocktail } = require("../model");
const assert = require("assert");
const express = require("express");

const cocktailController = {
  /**
   * Method to return a list of cocktails
   * @param {*} _ unused parameter
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express response function
   */
  async getAllCocktails(_, res, next) {
    const results = await Cocktail.getAll();

    if (results) {
      const cocktails = results.map((result) => ({
        id: result.id,
        name: result.name,
        details: result.details,
      }));

      res.status(200).json(cocktails);
    } else next();
  },
  /**
   * Method to return a cocktail
   * @param {express.Request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express response function
   */
  async getCocktailById(req, res, next) {
    const { id } = req.params;

    assert.ok(!isNaN(id), "id must be a number!");

    const result = await Cocktail.getById(id);

    if (result) {
      const cocktail = {
        id: result.id,
        name: result.name,
        details: result.details,
      };

      res.status(200).json(cocktail);
    } else next();
  },
  /**
   * Method to add a cocktail, then return an updated cocktail list
   * @param {express.Request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express response function
   */
  async addCocktail(req, res, next) {
    const cocktail = new Cocktail(req.body);
    const results = await cocktail.insertOne();

    if (results) {
      res.status(200).json(results);
    } else next();
  },
  /**
   * Method to modify a cocktail, then return an updated cocktail list
   * @param {express.Request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express response function
   */
  async editCocktail(req, res, next) {
    const { id } = req.params;

    assert.ok(!isNaN(id), "id must be a number!");

    const cocktail = new Cocktail({ id, ...req.body });
    const results = await cocktail.updateOne();

    if (results) {
      res.status(200).json(results);
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

    assert.ok(!isNaN(id), "id must be a number!");

    const result = await Cocktail.deleteOne(id);

    if (result) {
      res.sendStatus(200);
    } else next();
  },
};

module.exports = cocktailController;
