import express from 'express';
import { createProduct, getProducts } from '../Controller/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);

export default router;
