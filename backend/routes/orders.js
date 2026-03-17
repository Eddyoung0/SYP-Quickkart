import express from 'express';
import { checkoutOrders, getAllOrders, getUserOrders, updateDeliveryStatus } from '../Controller/ordersController.js';

const router = express.Router();

router.post('/checkout', checkoutOrders);
router.get('/', getAllOrders);
router.get('/user/:userId', getUserOrders);
router.patch('/:orderId/delivery-status', updateDeliveryStatus);

export default router;
