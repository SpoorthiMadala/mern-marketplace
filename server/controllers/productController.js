import Product from "../models/Product.js";


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    await product.deleteOne(); // or product.remove() if using older Mongoose
    res.status(200).json({ message: "Product deleted successfully" });

  } catch (err) {
    console.error("🔥 Delete Error:", err); // <== log actual error
    res.status(500).json({ message: "Server error while deleting product" });
  }
};


// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, price, type, phone } = req.body;
    const imageUrl = req.file?.path;

    const product = new Product({
      name,
      price,
      type,
      phone,
      imageUrl,
      user: req.user.id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding product" });
  }
};

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

// GET MY PRODUCTS (only products uploaded by logged-in user)
export const getMyProducts = async (req, res) => {
  try {
    const myProducts = await Product.find({ user: req.user.id });
    res.json(myProducts);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching user products" });
  }
};
