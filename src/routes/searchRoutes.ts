import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getSearchList, addToSearchList } from '../controllers/searchController';

const router = express.Router()

router.post('/add', protect, addToSearchList)
router.get('/get', protect, getSearchList)

export default router