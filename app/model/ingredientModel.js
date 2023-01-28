const client = require("../service/pgClient");
const CoreModel = require("./coreModel");
const ExpressError = require("../service/ExpressError");

class Ingredient extends CoreModel {
  static tableName = "ingredient";
  #name;
  #unit;

  constructor(config) {
    super(config);
    this.name = config.name;
    this.unit = config.unit;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (typeof value !== "string") {
      throw new ExpressError("name must be a string!", 400);
    }
    this.#name = value;
  }

  get unit() {
    return this.#unit;
  }

  set unit(value) {
    if (typeof value !== "string") {
      throw new ExpressError("unit must be a string!", 400);
    }

    this.#unit = value;
  }

  static async getById(id) {
    const query = {
      text: `SELECT * FROM "get_ingredient_details"($1);`,
      values: [id],
    };
    const result = await client.query(query);

    if (result.rowCount > 0) {
      const ingredient = new this(result.rows[0]);

      return ingredient;
    } else return null;
  }

  async insertOne() {
    const query = {
      text: `SELECT * FROM "insert_cocktail"($1);`,
      values: [{ name: this.name, unit: this.unit }],
    };
    const result = await client.query(query);

    return result.rowCount > 0;
  }

  static async deleteOne(id) {
    const query = {
      text: `DELETE FROM "ingredient" WHERE "id" = $1;`,
      values: [id],
    };

    const result = await client.query(query);

    return result.rowCount > 0;
  }
}

module.exports = Ingredient;
