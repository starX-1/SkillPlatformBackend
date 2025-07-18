import QuizResponse from '../models/QuizResponse.js';
import { v4 as uuidv4 } from 'uuid';

export const createQuizResponse = async (req, res, next) => {
    try {
        // const { user_id, quiz_id, submitted_at } = req.body;
        const user_id = req.user.id;
        const { quiz_id } = req.body;


        const existing = await QuizResponse.findOne({
            where: { user_id: user_id, quiz_id: quiz_id }
        })

        if (existing) {
            if (existing.submitted_at) {
                return res.status(400).json({ message: 'Quiz Already Submitted' })
            }
            return res.status(400).json({ message: 'Quiz Already Started' })
        }

        const response = await QuizResponse.create({
            id: uuidv4(),
            user_id,
            quiz_id,
            submitted_at: null,
        });

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
};

export const getAllQuizResponses = async (req, res, next) => {
    try {
        const responses = await QuizResponse.findAll();
        res.json(responses);
    } catch (err) {
        next(err);
    }
};

export const getQuizResponseById = async (req, res, next) => {
    try {
        const response = await QuizResponse.findByPk(req.params.id);
        if (!response) return res.status(404).json({ message: 'Quiz response not found' });
        res.json(response);
    } catch (err) {
        next(err);
    }
};

export const getQuizResponsesByUser = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const responses = await QuizResponse.findAll({ where: { user_id } });
        res.json(responses);
    } catch (err) {
        next(err);
    }
};

export const getQuizResponsesByQuiz = async (req, res, next) => {
    try {
        const { quiz_id } = req.params;
        const responses = await QuizResponse.findAll({ where: { quiz_id } });
        res.json(responses);
    } catch (err) {
        next(err);
    }
};

export const updateQuizResponse = async (req, res, next) => {
    try {
        const response = await QuizResponse.findByPk(req.params.id);
        if (!response) return res.status(404).json({ message: 'Quiz response not found' });

        await response.update(req.body);
        res.json(response);
    } catch (err) {
        next(err);
    }
};

export const deleteQuizResponse = async (req, res, next) => {
    try {
        const response = await QuizResponse.findByPk(req.params.id);
        if (!response) return res.status(404).json({ message: 'Quiz response not found' });

        await response.destroy();
        res.json({ message: 'Quiz response deleted' });
    } catch (err) {
        next(err);
    }
};
