const baseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(), // extension is defined on joi.string()
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) { // Joi will automatically call this method for whatever value it will receive
        const clean = sanitizeHtml(value, {
          allowedTags: [], // nothing is allowed
          allowedAttributes: {}, // nothing is allowed
        });
        if (clean !== value) return helpers.error("string.escapeHTML");
          return clean;      
      },
    },
  },
});

const joi = baseJoi.extend(extension);

module.exports.cocktailSchema = joi
  .object({
    name: joi.string().escapeHTML().required(),
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
    name: joi.string().escapeHTML().required(),
    unitId: joi.number().required(),
  })
  .required();

module.exports.unitSchema = joi
  .object({
    title: joi.string().escapeHTML().required(),
  })
  .required();
