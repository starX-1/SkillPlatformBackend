import express from 'express';
import {
    createQuizResponse,
    getAllQuizResponses,
    getQuizResponseById,
    getQuizResponsesByUser,
    getQuizResponsesByQuiz,
    updateQuizResponse,
    deleteQuizResponse,
} from '../controllers/quizResponseController.js';

import { validateQuizResponseData } from '../middlewares/validateQuizResponse.js';
import { protect } from '../middlewares/authMiddleware.js';
import { checkEnrollment } from '../middlewares/checkEnrollment.js';

const router = express.Router();

// ✅ Create a quiz response (protected, enrollment check)
router.post('/create', protect, checkEnrollment, validateQuizResponseData, createQuizResponse);

// ✅ Get all quiz responses (admin/instructor view)
router.get('/get-all-responses', protect, checkEnrollment, getAllQuizResponses);

// ✅ Get a specific quiz response by ID
router.get('/get-quiz-response/:id', protect, checkEnrollment, getQuizResponseById);

// ✅ Get all responses submitted by a specific user
router.get('/get-user-quiz-responses/:user_id', protect, checkEnrollment, getQuizResponsesByUser);

// ✅ Get all responses for a specific quiz
router.get('/get-quiz-responses/:quiz_id', protect, checkEnrollment, getQuizResponsesByQuiz);

// ✅ Update a specific quiz response
router.put('/update/:id', protect, checkEnrollment, validateQuizResponseData, updateQuizResponse);

// ✅ Delete a quiz response
router.delete('/delete/:id', protect, checkEnrollment, deleteQuizResponse);

export default router;
