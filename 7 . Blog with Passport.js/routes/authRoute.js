const express = require("express");
const routes = express.Router();
// const passport = require("passport");

const {
  login,
  register,
  registerUser,
  loginUser,
  dashboard,
} = require("../controller/AuthController");
const passport = require("passport");
// const { register } = require("module");

routes.get("/", login);
routes.get("/register", register);
routes.post("/registerUser", registerUser);
routes.post(
  "/loginUser",
  passport.authenticate("local", { failureRedirect: "/" }),
  loginUser
);

routes.get("/dashboard", passport.checkUser, dashboard);

module.exports = routes;
