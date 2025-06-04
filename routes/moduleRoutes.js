import express from 'express';
import { createModule, getModuleById, getModulesByCourse, updateModule } from '../controllers/moduleController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateModule } from '../middlewares/validateModule.js';
import { checkEnrollment } from '../middlewares/checkEnrollment.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// GET all modules for a course
router.get('/:courseId', getModulesByCourse);
// POST new module to a course (protected)
router.post('/:courseId', protect, isAdmin, validateModule, createModule);
// GET module by ID (optional, if needed)
router.get('/:courseId/:moduleId', protect, checkEnrollment, getModuleById);
// update module 
router.put('/update/:courseId/:moduleId', protect, isAdmin, validateModule, updateModule);


export default router;
