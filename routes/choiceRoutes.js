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

router.post('/', validateChoiceData, createChoice);
router.get('/', getAllChoices);
router.get('/:id', getChoiceById);
router.get('/question/:question_id', getChoicesByQuestion); // 🔍 get choices for a question
router.put('/:id', validateChoiceData, updateChoice);
router.delete('/:id', deleteChoice);

export default router;
