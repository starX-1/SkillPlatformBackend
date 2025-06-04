import express from 'express';
import { createLesson, getLessonsByModule } from '../controllers/lessonController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateLesson } from '../middlewares/validateLesson.js';

const router = express.Router();

// GET all lessons for a module
router.get('/:moduleId', getLessonsByModule);

// POST new lesson to a module
router.post('/:moduleId', protect, validateLesson, createLesson);

export default router;
