require("dotenv").config();
const https = require("https");
const path = require("path");
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");

const getHttpsCerts = require("./config/https.config");
require("./config/mongoose.config");
const apiRouter = require("./api");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./site" });
const handle = app.getRequestHandler();

const expressApp = express();

expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());

if (!process.env.PORT) {
  process.env.PORT = 3000;
}

expressApp.set("port", process.env.PORT);

expressApp.use("/api", apiRouter);

app.prepare().then(() => {
  expressApp.get("*", (req, res) => {
    return handle(req, res);
  });
});

server = https
  .createServer(getHttpsCerts(), expressApp)
  .listen(expressApp.get("port"), () => {
    console.log(`Server started on port ${expressApp.get("port")}`); // eslint-disable-line no-console
  });
