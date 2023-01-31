const debug = require("debug")("controller");
const { Ingredient } = require("../models");
const assert = require("assert");
const express = require("express");

const ingredientController = {
  /**
   * Method to return an ingredient list
   * @param {*} _ unused parameter
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express response function
   */
  async getAllIngredients(_, res, next) {
    const results = await Ingredient.getAll();

    if (results) {
      const ingredients = results.map((result) => ({
        id: result.id,
        name: result.name,
        unit: result.unit,
      }));

      res.status(200).json(ingredients);
    } else next();
  },
  /**
   * Method to return an ingredient
   * @param {express.Request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express response function
   */
  async getIngredientById(req, res, next) {
    const { id } = req.params;

    assert.ok(!isNaN(id), "id must be a number!");

    const result = await Ingredient.getById(id);

    if (result) {
      const ingredient = {
        id: result.id,
        name: result.name,
        unit: result.unit,
      };

      res.status(200).json(ingredient);
    } else next();
  },
  /**
   * Method to add an ingredient, then return an updated ingredient list
   * @param {express.Request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express response function
   */
  async addIngredient(req, res, next) {
    const ingredient = new Ingredient(req.body);
    const results = await ingredient.insertOne();

    if (results) {
      res.status(200).json(results);
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

    assert.ok(!isNaN(id), "id must be a number!");

    const result = await Ingredient.deleteOne(id);

    if (result) {
      res.sendStatus(200);
    } else next();
  },
};

module.exports = ingredientController;
