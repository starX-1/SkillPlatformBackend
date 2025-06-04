import express from 'express';
import { createLesson, getLessonById, getLessonsByModule, updateLesson } from '../controllers/lessonController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateLesson } from '../middlewares/validateLesson.js';

const router = express.Router();

// GET all lessons for a module
router.get('/getByModule/:moduleId', getLessonsByModule);
router.get('/getByLesson/:lessonId', getLessonById); // Assuming this is to get a lesson by ID
// update lesson 
router.put('/:moduleId/:lessonId', protect, validateLesson, updateLesson);
// POST new lesson to a module
router.post('/:moduleId', protect, validateLesson, createLesson);

export default router;
