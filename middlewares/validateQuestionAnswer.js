export const validateQuestionAnswerData = (req, res, next) => {
    const { quiz_response_id, question_id } = req.body;

    if (!quiz_response_id || !question_id) {
        return res.status(400).json({ message: 'quiz_response_id and question_id are required' });
    }

    next();
};
