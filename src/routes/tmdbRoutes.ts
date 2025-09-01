import express from 'express';
import { getPopularMedia, getTrendingMedia, getDetails, getSearchMedia, getMediaProviders } from '../controllers/tmdbController'

const router = express.Router()

router.get('/:platform/popular', getPopularMedia);
router.get('/:platform/trending/:time_window', getTrendingMedia);
router.get('/:platform/:media_id', getDetails);
router.get('/:platform/search', getSearchMedia);
router.get('/:platform/:id/providers', getMediaProviders)

export default router;