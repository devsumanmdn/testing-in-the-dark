const https = require("https");
const path = require("path");
const express = require("express");
const next = require("next");

const getHttpsCerts = require("./config/https.config");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./site" });
const handle = app.getRequestHandler();

const expressApp = express();

if (!process.env.PORT) {
  process.env.PORT = 3000;
}

expressApp.set("port", process.env.PORT);

app.prepare().then(() => {
  expressApp.get("/a", (req, res) => {
    return app.render(req, res, "/a", req.query);
  });

  expressApp.get("/b", (req, res) => {
    return app.render(req, res, "/b", req.query);
  });

  expressApp.get("/posts/:id", (req, res) => {
    return app.render(req, res, "/posts", { id: req.params.id });
  });

  expressApp.get("*", (req, res) => {
    return handle(req, res);
  });
});

server = https
  .createServer(getHttpsCerts(), expressApp)
  .listen(expressApp.get("port"), () => {
    console.log(`Server started on port ${expressApp.get("port")}`); // eslint-disable-line no-console
  });
