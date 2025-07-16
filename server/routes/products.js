const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

// GET /api/products - Public products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// GET /api/products/me - Logged-in user's products
router.get("/me", auth, async (req, res) => {
  try {
    const myProducts = await Product.find({ sellerId: req.user.id });
    res.json(myProducts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your products" });
  }
});

// POST /api/products - Add new product
router.post("/", auth, async (req, res) => {
  const { title, description, price, type, imageUrl } = req.body;

  if (!title || !price || !imageUrl) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newProduct = new Product({
      title,
      description,
      price,
      type,
      imageUrl,
      sellerId: req.user.id,
      sellerEmail: req.body.sellerEmail // passed from frontend
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to add product" });
  }
});

// PUT /api/products/:id - Edit product
router.put("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    if (product.sellerId.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

// DELETE /api/products/:id - Delete product
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    if (product.sellerId.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    await product.remove();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
