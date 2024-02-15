// Importing necessary modules and functions
import express from 'express';
import { addProduct, deleteProduct, listProducts, purchaseProduct, updateProduct } from '../controllers/productController';
import { checkAuth } from '../middleware/checkAuth'; // Assume you have authentication middleware

const router = express.Router();

// Public routes
router.get('/', listProducts); // Route to list all products (public)
router.post('/purchase/:productId', checkAuth, purchaseProduct); // Route to purchase a product (protected)

// Protected routes
router.post('/', checkAuth, addProduct); // Route to add a new product (protected)
router.put('/:productId', checkAuth, updateProduct); // Route to update a product (protected)
router.delete('/:productId', checkAuth, deleteProduct); // Route to delete a product (protected)

export default router;
