import Submission from '../models/Submission.js';
import { v4 as uuidv4 } from 'uuid';

export const createSubmission = async (req, res) => {
    const { lesson_id, submission_url, comment } = req.body;
    const user_id = req.user.id;

    if (!lesson_id || !submission_url) {
        return res.status(400).json({ message: 'Lesson ID and submission URL are required.' });
    }

    try {
        const newSubmission = await Submission.create({
            id: uuidv4(),
            user_id,
            lesson_id,
            submission_url,
            comment,
        });
        return res.status(201).json(newSubmission);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating submission', error: error.message });
    }
};

export const getSubmissionsByLesson = async (req, res) => {
    const { lessonId } = req.params;

    try {
        const submissions = await Submission.findAll({
            where: { lesson_id: lessonId },
            include: ['User'], // optional, eager load user info
        });
        return res.json(submissions);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching submissions', error: error.message });
    }
};

export const getUserSubmissions = async (req, res) => {
    const user_id = req.user.id;

    try {
        const submissions = await Submission.findAll({
            where: { user_id },
        });
        return res.json(submissions);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching user submissions', error: error.message });
    }
};
