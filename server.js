require("dotenv").config();

const debug = require("debug")("server");
const port = process.env.PORT || 3000;

const app = require("./app");

app.listen(port, _ => {
  debug(`listening on port ${port}`);
});
