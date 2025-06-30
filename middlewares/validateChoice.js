export const validateChoiceData = (req, res, next) => {
    const { question_id, text } = req.body;

    if (!question_id || !text) {
        return res.status(400).json({ message: 'question_id and text are required' });
    }

    next();
};
