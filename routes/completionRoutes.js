import express from 'express';
import { markLessonComplete, getCompletedLessons } from '../controllers/completionController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { checkEnrollment } from '../middlewares/checkEnrollment.js';

const router = express.Router();

router.post('/mark-complete', protect, checkEnrollment, markLessonComplete);
router.post('/get-completed-lessons', protect, checkEnrollment, getCompletedLessons);

export default router;
