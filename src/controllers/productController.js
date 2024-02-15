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
// Add a new product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stockQuantity } = req.body;
    const product = productModel_1.Product.build({ name, description, price, stockQuantity });
    yield product.save();
    res.status(201).send(product);
});
exports.addProduct = addProduct;
// List all products
const listProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.Product.find({});
    res.status(200).send(products);
});
exports.listProducts = listProducts;
// Update a product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { name, description, price, stockQuantity } = req.body;
    const product = yield productModel_1.Product.findById(productId);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.stockQuantity = stockQuantity;
    yield product.save();
    res.status(200).send(product);
});
exports.updateProduct = updateProduct;
// Delete a product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const product = yield productModel_1.Product.findByIdAndDelete(productId);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.status(204).send(product);
});
exports.deleteProduct = deleteProduct;
// Simulate purchase of a product
const purchaseProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { quantity } = req.body; // Quantity to purchase
    const product = yield productModel_1.Product.findById(productId);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    if (product.stockQuantity < quantity) {
        return res.status(400).send('Insufficient stock');
    }
    product.stockQuantity -= quantity;
    yield product.save();
    res.status(200).send({
        message: `Purchased ${quantity} of ${product.name}`,
        product,
    });
});
exports.purchaseProduct = purchaseProduct;
