import express from 'express';
import { getProfileRoute, getProtectedRoute } from '../controllers/protectedController.js';
const router = express.Router()

router.get('/', getProtectedRoute);
router.get('/profile', getProfileRoute);

export default router;
