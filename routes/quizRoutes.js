import express from 'express';
import {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    updateQuiz,
    deleteQuiz,
    getUserQuizzesWithStatus,
} from '../controllers/quizController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { checkUploader } from '../middlewares/checkEnrollment.js';

const router = express.Router();

router.post('/quiz/create', protect, checkUploader, createQuiz);
router.get('/quiz/get-all', protect, getAllQuizzes);
router.get('/quiz/get-by-id/:id', protect, getQuizById);
router.put('/update/:id', protect, checkUploader, updateQuiz);
router.delete('/delete/:id', protect, checkUploader, deleteQuiz);
router.get('/quiz/user', protect, getUserQuizzesWithStatus);

export default router;
