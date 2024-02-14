import { Request, Response } from 'express';
import { Product } from '../models/productModel';

// Add a new product
const addProduct = async (req: Request, res: Response) => {
  const { name, description, price, stockQuantity } = req.body;

  const product = Product.build({ name, description, price, stockQuantity });
  await product.save();

  res.status(201).send(product);
};

// List all products
const listProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  
  res.status(200).send(products);
};

// Update a product
const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { name, description, price, stockQuantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  product.name = name;
  product.description = description;
  product.price = price;
  product.stockQuantity = stockQuantity;

  await product.save();

  res.status(200).send(product);
};

// Delete a product
const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.status(204).send(product);
};
// Simulate purchase of a product
const purchaseProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { quantity } = req.body; // Quantity to purchase

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  if (product.stockQuantity < quantity) {
    return res.status(400).send('Insufficient stock');
  }

  product.stockQuantity -= quantity;

  await product.save();

  res.status(200).send({
    message: `Purchased ${quantity} of ${product.name}`,
    product,
  });
};

export { addProduct, deleteProduct, listProducts, purchaseProduct, updateProduct };


