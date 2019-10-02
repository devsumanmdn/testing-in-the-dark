const apiRouter = require("express").Router();
const userRouter = require("./userRouter");

apiRouter.use("/users", userRouter);

module.exports = apiRouter;
