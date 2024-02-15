import { Request, Response } from 'express';
import { Product } from '../models/productModel';

// Controller function to add a new product
const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, stockQuantity } = req.body;

  // Create a new product instance
  const product = new Product({ name, description, price, stockQuantity });
  await product.save(); // Save the product to the database

  // Send a response with the newly created product
  res.status(201).send(product);
};

const listProducts = async (req: Request, res: Response) => {
  // Default values for pagination
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10; // Default limit: 10 items per page
  const skip = (page - 1) * limit;
  console.log("ssssss");
  console.log({  page, limit, skip });
  console.log("ssssss2");

  try {
    // Find products with pagination
    const products = await Product.find({}).skip(skip).limit(limit);

    // Optional: Count total documents for pagination metadata
    const totalDocuments = await Product.countDocuments({});
    const totalPages = Math.ceil(totalDocuments / limit);

    // Send a response with products and pagination info
    res.status(200).json({
      products,
      page,
      limit,
      totalDocuments,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};


// Controller function to update a product
const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { name, description, price, stockQuantity } = req.body;

  // Find the product by ID
  const product = await Product.findById(productId);

  // If the product is not found, send a 404 response
  if (!product) {
    return res.status(404).send('Product not found');
  }

  // Update the product fields
  product.name = name;
  product.description = description;
  product.price = price;
  product.stockQuantity = stockQuantity;

  // Save the updated product
  await product.save();

  // Send a response with the updated product
  res.status(200).send(product);
};

// Controller function to delete a product
const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  // Find the product by ID and delete it
  const product = await Product.findByIdAndDelete(productId);

  // If the product is not found, send a 404 response
  if (!product) {
    return res.status(404).send('Product not found');
  }

  // Send a response with status 204 (No Content) as the product is successfully deleted
  res.status(204).send(product);
};

// Controller function to simulate the purchase of a product
const purchaseProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { quantity } = req.body; // Quantity to purchase

  // Find the product by ID
  const product = await Product.findById(productId);

  // If the product is not found, send a 404 response
  if (!product) {
    return res.status(404).send('Product not found');
  }

  // Check if there is sufficient stock for the purchase
  if (product.stockQuantity < quantity) {
    return res.status(400).send('Insufficient stock');
  }

  // Reduce the stock quantity by the purchased quantity
  product.stockQuantity -= quantity;

  // Save the updated product
  await product.save();

  // Send a response with a success message and the purchased product
  res.status(200).send({
    message: `Purchased ${quantity} of ${product.name}`,
    product,
  });
};

// Exporting the controller functions
export { addProduct, deleteProduct, listProducts, purchaseProduct, updateProduct };
