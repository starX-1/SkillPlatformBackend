import Choice from '../models/Choice.js';
import { v4 as uuidv4 } from 'uuid';

export const createChoice = async (req, res, next) => {
    try {
        const { question_id, text, is_correct } = req.body;

        const choice = await Choice.create({
            id: uuidv4(),
            question_id,
            text,
            is_correct: is_correct || false,
        });

        res.status(201).json(choice);
    } catch (err) {
        next(err);
    }
};

export const getAllChoices = async (req, res, next) => {
    try {
        const choices = await Choice.findAll();
        res.json(choices);
    } catch (err) {
        next(err);
    }
};

export const getChoiceById = async (req, res, next) => {
    try {
        const choice = await Choice.findByPk(req.params.id);
        if (!choice) return res.status(404).json({ message: 'Choice not found' });
        res.json(choice);
    } catch (err) {
        next(err);
    }
};

export const getChoicesByQuestion = async (req, res, next) => {
    try {
        const { question_id } = req.params;
        const choices = await Choice.findAll({ where: { question_id } });

        res.json(choices);
    } catch (err) {
        next(err);
    }
};

export const updateChoice = async (req, res, next) => {
    try {
        const choice = await Choice.findByPk(req.params.id);
        if (!choice) return res.status(404).json({ message: 'Choice not found' });

        await choice.update(req.body);
        res.json(choice);
    } catch (err) {
        next(err);
    }
};

export const deleteChoice = async (req, res, next) => {
    try {
        const choice = await Choice.findByPk(req.params.id);
        if (!choice) return res.status(404).json({ message: 'Choice not found' });

        await choice.destroy();
        res.json({ message: 'Choice deleted' });
    } catch (err) {
        next(err);
    }
};
