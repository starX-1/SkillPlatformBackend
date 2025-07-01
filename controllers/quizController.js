import Quiz from '../models/Quiz.js';
import { v4 as uuidv4 } from 'uuid';
import Enrollment from '../models/Enrollment.js';
import QuizResponse from '../models/QuizResponse.js';
import Module from '../models/Module.js';
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
        res.status(201).json({ id: quiz.id });
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

export const getUserQuizzesWithStatus = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. Get enrolled module IDs for the user
        const enrollments = await Enrollment.findAll({
            where: { user_id: userId },
            raw: true,
        });

        const moduleIds = enrollments.map(e => e.module_id);

        if (moduleIds.length === 0) {
            return res.json([]); // No enrolled modules = no quizzes
        }

        // 2. Get all quizzes in enrolled modules
        const quizzes = await Quiz.findAll({
            where: { module_id: moduleIds },
            raw: true,
        });

        // 3. Get all quiz responses by this user
        const responses = await QuizResponse.findAll({
            where: { user_id: userId },
            raw: true,
        });

        // 4. Map quizzes with status
        const result = quizzes.map(quiz => {
            const response = responses.find(r => r.quiz_id === quiz.id);
            let status = 'not_started';

            if (response) {
                status = response.submitted_at ? 'submitted' : 'in_progress';
            }

            return {
                ...quiz,
                status,
            };
        });

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get quizzes for user' });
    }
};
