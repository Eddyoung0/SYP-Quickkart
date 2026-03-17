import express from 'express';
import { createReview, getReviews } from '../Controller/reviewController.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);

export default router;
