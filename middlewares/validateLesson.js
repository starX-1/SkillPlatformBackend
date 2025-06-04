export function validateLesson(req, res, next) {
    const { title, content, video_url, lesson_order } = req.body;
    const errors = [];

    if (!title || typeof title !== 'string') {
        errors.push('Title is required and must be a string.');
    }

    if (lesson_order && typeof lesson_order !== 'number') {
        errors.push('Lesson order must be a number.');
    }

    if (video_url && typeof video_url !== 'string') {
        errors.push('Video URL must be a string.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation errors', errors });
    }

    next();
}
