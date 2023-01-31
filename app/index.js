const express = require("express");
const app = express();
const router = require("./routers/");
const cors = require("cors");
const expressJSDocSwagger = require("express-jsdoc-swagger");

const options = {
  info: {
    version: "1.0.0",
    title: "Cocktail API",
    license: {
      name: "MIT",
    },
  },
  security: {
    BasicAuth: {
      type: "http",
      scheme: "basic",
    },
  },
  swaggerUIPath: "/cocktailapidoc",
  baseDir: __dirname,
  filesPattern: "./**/*.js",
};

expressJSDocSwagger(app)(options);

app.use(cors({ origin: "*" }));

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

module.exports = app;
