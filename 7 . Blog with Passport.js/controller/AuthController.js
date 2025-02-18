const UserModel = require("../models/UserModel");
const BlogModel = require("../models/BlogModel");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  if (res.locals.users) {
    return res.render("dashboard");
  }
  return res.render("login");
};

const register = (req, res) => {
  return res.render("register");
};

const registerUser = async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  // check if both passwords match
  if (password != cpassword) {
    console.log("passowrds do not match");
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    await UserModel.create({
      name: name,
      email: email,
      password: password,
      cpassword: cpassword,
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const loginUser = (req, res) => {
  return res.redirect("/dashboard");
};

const dashboard = async (req, res) => {
  try {
    const blogs = await BlogModel.find({});
    console.log(blogs);

    return res.render("dashboard", {
      blogs: blogs,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = {
  login,
  register,
  loginUser,
  registerUser,
  dashboard,
};
