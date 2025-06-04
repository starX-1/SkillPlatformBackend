import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { checkEnrollment } from '../middlewares/checkEnrollment.js'; // reuse if you have this
import { createSubmission, getSubmissionsByLesson, getUserSubmissions } from '../controllers/submissionController.js';

const router = express.Router();

// Student creates a submission (must be enrolled)
router.post('/makeSubmission', protect, checkEnrollment, createSubmission);

// Get submissions for a lesson (admin, creator or enrolled only)
router.get('/lesson/:lessonId', protect, checkEnrollment, getSubmissionsByLesson);

// Get submissions made by the logged-in user
router.get('/mySubmissions', protect, getUserSubmissions);

export default router;
