import express from 'express';
import { enrollUser, getUserEnrollments } from '../controllers/enrollmentController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateEnrollment } from '../middlewares/validateEnrollment.js';

const router = express.Router();

router.post('/enroll', protect, validateEnrollment, enrollUser);
router.get('/getMyEnrollments', protect, getUserEnrollments);

export default router;
