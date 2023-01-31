const pool = require("../service/pgPool");
const CoreModel = require("./coreModel");
const ExpressError = require("../service/ExpressError");

class Ingredient extends CoreModel {
  static tableName = "ingredient";
  #name;
  #unit;
  #unitId;

  constructor(config) {
    super(config);
    this.name = config.name;
    this.unit = config.unit;
    this.unitId = config.unitId;
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
    if (!value) return;
    if (typeof value !== "string") {
      throw new ExpressError("unit must be a string!", 400);
    }

    this.#unit = value;
  }

  get unitId() {
    return this.#unitId;
  }

  set unitId(value) {
    if (!value) return;
    if (typeof value !== "number") {
      throw new ExpressError("unit must be a number!", 400);
    }

    this.#unitId = value;
  }

  static async getById(id) {
    const query = {
      text: `SELECT * FROM "get_ingredient_details"($1);`,
      values: [id],
    };
    const result = await pool.query(query);

    if (result.rowCount > 0) {
      const ingredient = new this(result.rows[0]);

      return ingredient;
    } else return null;
  }

  async insertOne() {
    const query = {
      text: `SELECT * FROM "insert_ingredient"($1);`,
      values: [{ name: this.name, unitId: this.unitId }],
    };
    const result = await pool.query(query);

    if (result.rowCount > 0) {
      return result.rows;
    } else return null;
  }
}

module.exports = Ingredient;
