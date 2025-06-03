import express from 'express';
import { createModule, getModulesByCourse } from '../controllers/moduleController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateModule } from '../middlewares/validateModule.js';

const router = express.Router();

// GET all modules for a course
router.get('/:courseId', getModulesByCourse);

// POST new module to a course (protected)
router.post('/:courseId', protect, validateModule, createModule);

export default router;
