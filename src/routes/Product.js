import express from 'express';
const router = express.Router();
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';
import auth from '../middleware/auth.js';

router.post('/:type', auth, createProduct);

router.get('/:type', auth, getProducts);

router.delete('/:type/:id', auth, deleteProduct);

router.patch('/:type/:id', auth, updateProduct);

export default router;