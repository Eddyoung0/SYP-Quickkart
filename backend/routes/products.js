import express from 'express';
import { createProduct, getProductById, getProducts } from '../Controller/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

export default router;
