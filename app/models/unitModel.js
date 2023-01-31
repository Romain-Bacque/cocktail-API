const pool = require("../service/pgPool");
const CoreModel = require("./coreModel");
const ExpressError = require("../service/ExpressError");

class Unit extends CoreModel {
  static tableName = "unit";
  #title;

  constructor(config) {
    super(config);
    this.title = config.title;
  }

  get title() {
    return this.#title;
  }

  set title(value) {
    if (typeof value !== "string") {
      throw new ExpressError("title must be a string!", 400);
    }
    this.#title = value;
  }

  static async getById(id) {
    const query = {
      text: `SELECT * FROM "unit" WHERE "id" = $1;`,
      values: [id],
    };
    const result = await pool.query(query);

    if (result.rowCount > 0) {
      const unit = new this(result.rows[0]);
      return unit;
    } else return null;
  }

  async insertOne() {
    const query = {
      text: `INSERT INTO "unit" ("title") VALUES ($1) RETURNING "id", "title";`,
      values: [this.title],
    };
    const result = await pool.query(query);

    return result.rowCount > 0;
  }
}

module.exports = Unit;
