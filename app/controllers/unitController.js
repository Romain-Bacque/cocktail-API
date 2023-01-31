const debug = require("debug")("controller");
const { Unit } = require("../models");
const assert = require("assert");
const express = require("express");

const unitController = {
  /**
   * Method to return a list of units
   * @param {*} _ unused parameter
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express response function
   */
  async getAllUnits(_, res, next) {
    const results = await Unit.getAll();

    if (results) {
      const units = results.map((result) => ({
        id: result.id,
        title: result.title,
      }));

      res.status(200).json(units);
    } else next();
  },
  /**
   * Method to return a unit
   * @param {express.Request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express response function
   */
  async getUnitById(req, res, next) {
    const { id } = req.params;

    assert.ok(!isNaN(id), "id must be a number!");

    const result = await Unit.getById(id);

    if (result) {
      const unit = { id: result.id, title: result.title };

      res.status(200).json(unit);
    } else next();
  },
  /**
   * Method to add a unit, then return a list of updated units
   * @param {express.Request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express response function
   */
  async addUnit(req, res, next) {
    const unit = new Unit(req.body);
    const result = await unit.insertOne();

    if (result) {
      res.sendStatus(200);
    } else next();
  },
  /**
   * Method to delete unit
   * @param {express.Request} req Express request object
   * @param {express.Response} res Express response object
   * @param {express.NextFunction} next Express response function
   */
  async deleteUnit(req, res, next) {
    const { id } = req.params;

    assert.ok(!isNaN(id), "id must be a number!");

    const result = await Unit.deleteOne(id);

    if (result) {
      res.sendStatus(200);
    } else next();
  },
};

module.exports = unitController;
