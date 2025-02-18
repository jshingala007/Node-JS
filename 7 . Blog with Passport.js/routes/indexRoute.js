const express = require("express");
const routes = express.Router();

routes.use("/", require("../routes/authRoute"));
routes.use("/", require("../routes/blogRoute"));

module.exports = routes;
