const baseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean == value) {
          return clean;
        }
        return helpers.error("string.escapeHTML");
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
