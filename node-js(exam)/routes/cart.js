const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const isAuthenticated = require("../middleware/auth");

// Get cart
router.get("/", isAuthenticated, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId"
    );
    if (!cart) {
      cart = { items: [] };
    }
    res.render("cart/index", {
      title: "Shopping Cart",
      cart: cart,
      user: req.user,
      messages: {
        error: req.flash("error"),
        success: req.flash("success"),
      },
    });
  } catch (error) {
    res.render("cart/index", {
      title: "Shopping Cart",
      cart: { items: [] },
      user: req.user,
      messages: {
        error: "Error loading cart",
        success: null,
      },
    });
  }
});

// Add to cart
router.post("/add", isAuthenticated, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += parseInt(quantity);
    } else {
      cart.items.push({ productId, quantity: parseInt(quantity) });
    }

    await cart.save();
    req.flash("success", "Item added to cart");
    res.redirect("/cart");
  } catch (error) {
    req.flash("error", "Error adding to cart");
    res.redirect("/products");
  }
});

// Update cart item
router.post("/update/:productId", isAuthenticated, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === req.params.productId
    );

    if (item) {
      item.quantity = parseInt(quantity);
      if (item.quantity <= 0) {
        cart.items = cart.items.filter(
          (item) => item.productId.toString() !== req.params.productId
        );
      }
    }

    await cart.save();
    res.redirect("/cart");
  } catch (error) {
    req.flash("error", "Error updating cart");
    res.redirect("/cart");
  }
});

// Remove from cart
router.post("/remove/:productId", isAuthenticated, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId
    );

    await cart.save();
    req.flash("success", "Item removed from cart");
    res.redirect("/cart");
  } catch (error) {
    req.flash("error", "Error removing item from cart");
    res.redirect("/cart");
  }
});

module.exports = router;
