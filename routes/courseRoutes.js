import express from 'express';
import { createCourse, getAllCourses, getCourseById, updateCourse } from '../controllers/courseController.js';
import { protect } from '../middlewares/authMiddleware.js'; // JWT auth middleware
import { validateCourse } from '../middlewares/validateCourse.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// List all courses - public route
router.get('/', getAllCourses);

// Create a new course - protected route (only logged-in users)
router.post('/addCourse', protect, isAdmin, validateCourse, createCourse);
router.get('/getCourse/:id', getCourseById); // Get course by ID - public route
router.put('/updateCourse/:id', protect, isAdmin, validateCourse, updateCourse); // Assuming you want to use the same controller for updates

export default router;
