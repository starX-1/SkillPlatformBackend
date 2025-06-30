import express from 'express';
import {
  createQuestionAnswer,
  getAllQuestionAnswers,
  getQuestionAnswerById,
  getAnswersByQuizResponse,
  updateQuestionAnswer,
  deleteQuestionAnswer,
} from '../controllers/questionAnswerController.js';

import { validateQuestionAnswerData } from '../middlewares/validateQuestionAnswer.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, validateQuestionAnswerData, createQuestionAnswer);
router.get('/', protect, getAllQuestionAnswers);
router.get('/:id', protect, getQuestionAnswerById);
router.get('/quiz-response/:quiz_response_id', protect, getAnswersByQuizResponse);
router.put('/update/:id', protect, validateQuestionAnswerData, updateQuestionAnswer);
router.delete('/delete/:id', protect, deleteQuestionAnswer);

export default router;
