"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing necessary modules and functions
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const checkAuth_1 = require("../middleware/checkAuth"); // Assume you have authentication middleware
const router = express_1.default.Router();
// Public routes
router.get('/', productController_1.listProducts); // Route to list all products (public)
router.post('/purchase/:productId', checkAuth_1.checkAuth, productController_1.purchaseProduct); // Route to purchase a product (protected)
// Protected routes
router.post('/', checkAuth_1.checkAuth, productController_1.addProduct); // Route to add a new product (protected)
router.put('/:productId', checkAuth_1.checkAuth, productController_1.updateProduct); // Route to update a product (protected)
router.delete('/:productId', checkAuth_1.checkAuth, productController_1.deleteProduct); // Route to delete a product (protected)
exports.default = router;
