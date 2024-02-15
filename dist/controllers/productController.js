"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.purchaseProduct = exports.listProducts = exports.deleteProduct = exports.addProduct = void 0;
const productModel_1 = require("../models/productModel");
// Controller function to add a new product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stockQuantity } = req.body;
    // Create a new product instance
    const product = new productModel_1.Product({ name, description, price, stockQuantity });
    yield product.save(); // Save the product to the database
    // Send a response with the newly created product
    res.status(201).send(product);
});
exports.addProduct = addProduct;
const listProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Default values for pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit: 10 items per page
    const skip = (page - 1) * limit;
    console.log("ssssss");
    console.log({ page, limit, skip });
    console.log("ssssss2");
    try {
        // Find products with pagination
        const products = yield productModel_1.Product.find({}).skip(skip).limit(limit);
        // Optional: Count total documents for pagination metadata
        const totalDocuments = yield productModel_1.Product.countDocuments({});
        const totalPages = Math.ceil(totalDocuments / limit);
        // Send a response with products and pagination info
        res.status(200).json({
            products,
            page,
            limit,
            totalDocuments,
            totalPages,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});
exports.listProducts = listProducts;
// Controller function to update a product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { name, description, price, stockQuantity } = req.body;
    // Find the product by ID
    const product = yield productModel_1.Product.findById(productId);
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
    yield product.save();
    // Send a response with the updated product
    res.status(200).send(product);
});
exports.updateProduct = updateProduct;
// Controller function to delete a product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    // Find the product by ID and delete it
    const product = yield productModel_1.Product.findByIdAndDelete(productId);
    // If the product is not found, send a 404 response
    if (!product) {
        return res.status(404).send('Product not found');
    }
    // Send a response with status 204 (No Content) as the product is successfully deleted
    res.status(204).send(product);
});
exports.deleteProduct = deleteProduct;
// Controller function to simulate the purchase of a product
const purchaseProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { quantity } = req.body; // Quantity to purchase
    // Find the product by ID
    const product = yield productModel_1.Product.findById(productId);
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
    yield product.save();
    // Send a response with a success message and the purchased product
    res.status(200).send({
        message: `Purchased ${quantity} of ${product.name}`,
        product,
    });
});
exports.purchaseProduct = purchaseProduct;
