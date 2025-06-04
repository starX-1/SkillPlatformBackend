import Completion from '../models/Completion.js';

export const markLessonComplete = async (req, res) => {
    const { lesson_id } = req.body;
    const user_id = req.user.id;

    try {
        const existing = await Completion.findOne({ where: { lesson_id, user_id } });
        if (existing) {
            return res.status(400).json({ message: 'Lesson already completed' });
        }

        const completion = await Completion.create({ lesson_id, user_id });
        res.status(201).json({ message: 'Lesson marked as completed', completion });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const getCompletedLessons = async (req, res) => {
    const user_id = req.user.id;

    try {
        const completions = await Completion.findAll({ where: { user_id } });
        res.status(200).json(completions);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch completions', error: err.message });
    }
};
