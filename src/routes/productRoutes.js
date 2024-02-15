"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const checkAuth_1 = require("../middleware/checkAuth"); // Assume you have authentication middleware
const router = express_1.default.Router();
// Public routes
router.get('/', productController_1.listProducts);
router.post('/purchase/:productId', checkAuth_1.checkAuth, productController_1.purchaseProduct);
// Protected routes
router.post('/', checkAuth_1.checkAuth, productController_1.addProduct);
router.put('/:productId', checkAuth_1.checkAuth, productController_1.updateProduct);
router.delete('/:productId', checkAuth_1.checkAuth, productController_1.deleteProduct);
exports.default = router;
