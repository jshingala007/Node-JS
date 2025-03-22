const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const isAuthenticated = require("../middleware/auth");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get all products
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products/index", {
      title: "Products",
      products: products,
      user: req.user,
    });
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

// Create product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, qty, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const product = new Product({
      name,
      price,
      qty,
      description,
      image,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
});

// Update product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, qty, description } = req.body;
    const updateData = { name, price, qty, description };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

module.exports = router;
