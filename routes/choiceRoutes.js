import express from 'express';
import {
    createChoice,
    getAllChoices,
    getChoiceById,
    getChoicesByQuestion,
    updateChoice,
    deleteChoice,
} from '../controllers/choiceController.js';

import { validateChoiceData } from '../middlewares/validateChoice.js';

const router = express.Router();

router.post('/create', validateChoiceData, createChoice);
router.get('/get-all', getAllChoices);
router.get('/get-choice-by-id/:id', getChoiceById);
router.get('/get-choices-by-question/:question_id', getChoicesByQuestion); // 🔍 get choices for a question
router.put('/update-choice/:id', validateChoiceData, updateChoice);
router.delete('/delete-choice/:id', deleteChoice);

export default router;
