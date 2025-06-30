import Question from '../models/Question.js';
import { v4 as uuidv4 } from 'uuid';

export const createQuestion = async (req, res, next) => {
    try {
        const { quiz_id, text, type } = req.body;

        if (!['multiple_choice', 'text'].includes(type)) {
            return res.status(400).json({ message: 'Invalid question type' });
        }

        const question = await Question.create({
            id: uuidv4(),
            quiz_id,
            text,
            type,
        });

        res.status(201).json(question);
    } catch (err) {
        next(err);
    }
};

export const getAllQuestions = async (req, res, next) => {
    try {
        const questions = await Question.findAll();
        res.json(questions);
    } catch (err) {
        next(err);
    }
};

export const getQuestionById = async (req, res, next) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });
        res.json(question);
    } catch (err) {
        next(err);
    }
};

export const updateQuestion = async (req, res, next) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        await question.update(req.body);
        res.json(question);
    } catch (err) {
        next(err);
    }
};

export const deleteQuestion = async (req, res, next) => {
    try {
        const question = await Question.findByPk(req.params.id);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        await question.destroy();
        res.json({ message: 'Question deleted' });
    } catch (err) {
        next(err);
    }
};

export const getQuestionsByQuiz = async (req, res, next) => {
  try {
    const { quiz_id } = req.params;
    const questions = await Question.findAll({ where: { quiz_id } });

    res.json(questions);
  } catch (err) {
    next(err);
  }
};
