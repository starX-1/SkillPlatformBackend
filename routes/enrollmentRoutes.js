import express from 'express';
import { enrollUser, getCourseEnrollments, getUserEnrollments } from '../controllers/enrollmentController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateEnrollment } from '../middlewares/validateEnrollment.js';

const router = express.Router();

router.post('/enroll', protect, validateEnrollment, enrollUser);
router.get('/getMyEnrollments', protect, getUserEnrollments);
router.get("/getCourseEnrollments/:courseId", protect, getCourseEnrollments); // Assuming this is to get all enrollments for a specific course


export default router;
