import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { addReview } from '../controllers/reviewController';

const router = express.Router();

router.post('/add', protect, addReview);

export default router;