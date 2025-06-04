import express from 'express';
import { createLesson, getLessonById, getLessonsByModule, updateLesson } from '../controllers/lessonController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateLesson } from '../middlewares/validateLesson.js';
import { checkEnrollment } from '../middlewares/checkEnrollment.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// GET all lessons for a module
router.get('/getByModule/:moduleId', protect, checkEnrollment, getLessonsByModule);
router.get('/getByLesson/:lessonId', protect, checkEnrollment, getLessonById); // Assuming this is to get a lesson by ID
// update lesson 
router.put('/:moduleId/:lessonId', protect, isAdmin, validateLesson, updateLesson);
// POST new lesson to a module
router.post('/:moduleId', protect, isAdmin, validateLesson, createLesson);

export default router;
