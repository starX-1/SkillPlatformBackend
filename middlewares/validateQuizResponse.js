export const validateQuizResponseData = (req, res, next) => {
    const { user_id, quiz_id } = req.body;

    if (!user_id || !quiz_id) {
        return res.status(400).json({ message: 'user_id and quiz_id are required' });
    }

    next();
};
