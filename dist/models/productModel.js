"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for the Product
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});
// Define a static method called 'build' which creates a new Product document
productSchema.statics.build = (attrs) => {
    return new Product(attrs);
};
// Create the Product model using the schema
const Product = mongoose_1.default.model('Product', productSchema);
exports.Product = Product;
