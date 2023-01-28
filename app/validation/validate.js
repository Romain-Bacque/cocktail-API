const ExpressError = require("../service/ExpressError");
const express = require("express");
const joi = require("joi");

/**
 *
 * @param {joi.ObjectSchema} schema The joi object schema
 * @returns {((req: express.Request, _: any, next: express.NextFunction) => void)}
 */
module.exports.validate = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const msg = error.details.map((el) => el.message).join(", ");
      throw new ExpressError(msg, 400);
    } else {
      next();
    }
  };
};
