export const validateEnrollment = (req, res, next) => {
    const { course_id } = req.body;
    if (!course_id) {
        return res.status(400).json({ message: 'course_id is required' });
    }
    next();
}