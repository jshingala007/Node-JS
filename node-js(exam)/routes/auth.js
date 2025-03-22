const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "Email already registered");
      return res.redirect("/auth/register");
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    req.flash("success", "Registration successful. Please login.");
    res.redirect("/auth/login");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/auth/register");
  }
});

// Login route with explicit passport authentication
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error", info.message);
      return res.redirect("/auth/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/products");
    });
  })(req, res, next);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.redirect("/auth/login");
  });
});

module.exports = router;
