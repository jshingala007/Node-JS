const express = require("express");
const routes = express.Router();
const multer = require("multer");
const path = require("path");

const {
  addblog,
  submitBlog,
  deleteblog,
  logout,
  editblog,
  updateblog,
} = require("../controller/BlogController");

const st = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const UniqueName = `${Math.round(
      Math.random() * 10000
    )}-${Date.now()}${path.extname(file.originalname)}`;

    cb(null, UniqueName);
  },
});

const file = multer({ storage: st }).single("image");
routes.get("/addblog", addblog);
routes.post("/submitblog", file, submitBlog);
routes.get("/deleteblog", deleteblog);
routes.get("/editblog", editblog);
routes.post("/updateblog", file, updateblog);
routes.get("/logout", logout);

module.exports = routes;
