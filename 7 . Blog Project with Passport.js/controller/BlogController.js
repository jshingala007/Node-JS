const BlogModel = require("../models/BlogModel");
const path = require("path");
const fs = require("fs");

const addblog = (req, res) => {
  return res.render("addblog");
};

const submitBlog = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    const { title, caption } = req.body;
    const image = req.file.path;
    await BlogModel.create({
      title: title,
      caption: caption,
      image: image,
    });

    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteblog = async (req, res) => {
  try {
    // console.log(req.query);
    const id = req.query.id;
    const blog = BlogModel.findById(id);

    // delete old image;
    if (!blog) console.log("blog not found");

    if (blog.image) {
      fs.unlinkSync(blog.image);
    }

    // delete blog
    await BlogModel.findByIdAndDelete(id);

    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return false;
  }
};

// editblog - extract id
const editblog = async (req, res) => {
  const id = req.query.id;
  try {
    const blog = await BlogModel.findById(id);

    if (!blog) {
      console.log("blog not found");
      return false;
    }

    return res.render("editblog", {
      blog,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateblog = async (req, res) => {
  console.log(req.body, "req.body");
  // console.log(req.file, "file");
  try {
    const { id, title, caption, existingImage } = req.body;
    const image = req.file ? req.file.path : req.body.existingImage;

    const blog = await BlogModel.findById(id);
    // console.log("blog", blog.image);
    if (req.file && blog.image) {
      fs.unlinkSync(blog.image);
      console.log("OLD IMAGE DELETED");
    }

    await BlogModel.findByIdAndUpdate(id, {
      title: title,
      caption: caption,
      image: image,
    });

    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    return false;
  }
};
// logout
const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return false;
    }
    return res.redirect("/");
  });
};

module.exports = {
  addblog,
  submitBlog,
  deleteblog,
  logout,
  editblog,
  updateblog,
};
