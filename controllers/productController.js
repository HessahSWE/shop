const Product = require('../models/Product');
const productService = require('../services/productService');
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

router.post('/purchase/:productId', authMiddleware, productController.purchaseProduct);

exports.purchaseProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productService.purchaseProduct(productId);
    res.json({ message: "Purchase successful", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stockQuantity } = req.body;
    let product = new Product({ name, description, price, stockQuantity });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stockQuantity } = req.body;
    let product = await Product.findByIdAndUpdate(id, { name, description, price, stockQuantity }, { new: true });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Directly delete the product without fetching it first
    const result = await Product.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};





