export const validateQuestionData = (req, res, next) => {
    const { quiz_id, text, type } = req.body;

    if (!quiz_id || !text || !type) {
        return res.status(400).json({ message: 'quiz_id, text, and type are required' });
    }

    if (!['multiple_choice', 'text'].includes(type)) {
        return res.status(400).json({ message: 'type must be either "multiple_choice" or "text"' });
    }

    next();
};
