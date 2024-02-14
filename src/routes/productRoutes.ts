import express from 'express';
import { addProduct, deleteProduct, listProducts, purchaseProduct, updateProduct } from '../controllers/productController';
import { checkAuth } from '../middleware/checkAuth'; // Assume you have authentication middleware

const router = express.Router();

// Public routes
router.get('/', listProducts);
router.post('/purchase/:productId', checkAuth, purchaseProduct);
// Protected routes
router.post('/', checkAuth, addProduct);
router.put('/:productId', checkAuth, updateProduct);
router.delete('/:productId', checkAuth, deleteProduct);

export default router;



