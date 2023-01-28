const joi = require("joi");

module.exports.cocktailSchema = joi
  .object({
    name: joi.string().required(),
    details: joi
      .array()
      .items({
        ingredient_id: joi.number().required(),
        quantity: joi.number().required(),
      })
      .required(),
  })
  .required();

module.exports.ingredientSchema = joi
  .object({
    name: joi.string().required(),
    unitId: joi.number().required(),
  })
  .required();

module.exports.unitSchema = joi
  .object({
    id: joi.number(),
    title: joi.string().required(),
  })
  .required();
