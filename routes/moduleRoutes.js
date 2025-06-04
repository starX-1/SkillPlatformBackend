import express from 'express';
import { createModule, getModuleById, getModulesByCourse, updateModule } from '../controllers/moduleController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateModule } from '../middlewares/validateModule.js';

const router = express.Router();

// GET all modules for a course
router.get('/:courseId', getModulesByCourse);
// POST new module to a course (protected)
router.post('/:courseId', protect, validateModule, createModule);
// GET module by ID (optional, if needed)
router.get('/:courseId/:moduleId', getModuleById);
// update module 
router.put('/:courseId/:moduleId', protect, validateModule, updateModule);


export default router;
