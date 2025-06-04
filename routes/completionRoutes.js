import express from 'express';
import { markLessonComplete, getCompletedLessons } from '../controllers/completionController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/mark-complete', protect, markLessonComplete);
router.get('/get-completed-lessons', protect, getCompletedLessons);

export default router;
