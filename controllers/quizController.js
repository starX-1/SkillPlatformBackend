import Quiz from '../models/Quiz.js';
import { v4 as uuidv4 } from 'uuid';

export const createQuiz = async (req, res, next) => {
    try {
        const { module_id, title, instructions, deadline, duration_minutes } = req.body;
        const quiz = await Quiz.create({
            id: uuidv4(),
            module_id,
            title,
            instructions,
            deadline,
            duration_minutes,
        });
        res.status(201).json(quiz);
    } catch (err) {
        next(err);
    }
};

export const getAllQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.findAll();
        res.json(quizzes);
    } catch (err) {
        next(err);
    }
};

export const getQuizById = async (req, res, next) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (err) {
        next(err);
    }
};

export const updateQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        await quiz.update(req.body);
        res.json(quiz);
    } catch (err) {
        next(err);
    }
};

export const deleteQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        await quiz.destroy();
        res.json({ message: 'Quiz deleted' });
    } catch (err) {
        next(err);
    }
};
