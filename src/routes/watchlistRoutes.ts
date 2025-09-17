import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { addToWatchlist, deleteFromWatchlist, getWatchlist } from '../controllers/watchlistController';

const router = express.Router();

router.post('/add', protect, addToWatchlist);
router.delete('/delete', protect, deleteFromWatchlist);
router.get('/get', protect, getWatchlist);

export default router;