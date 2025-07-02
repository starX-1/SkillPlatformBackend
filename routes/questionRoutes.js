import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { checkEnrollment, checkUploader } from '../middlewares/checkEnrollment.js';
import { validateQuestionData } from '../middlewares/validateQuestion.js';

const router = express.Router();

router.post('/questions/create', protect, validateQuestionData, checkUploader, createQuestion);
router.get('/questions/get-all', protect, checkEnrollment, getAllQuestions);
router.get('/questions/get-single/:id', protect, getQuestionById);
router.put('/questions/update/:id', protect, validateQuestionData, checkUploader, updateQuestion);
router.delete('/questions/delete-single/:id', protect, checkUploader, deleteQuestion);

export default router;
