import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

export const checkEnrollment = async (req, res, next) => {
    const user_id = req.user.id;
    const user_role = req.user.role;
    const course_id =
        req.params.courseId ||
        req.params.id ||
        req.body.course_id ||
        req.query.course_id;


    if (!course_id) {
        return res.status(400).json({ message: 'Course ID is required.' });
    }

    try {
        // If admin, allow access
        if (user_role === 'admin') return next();

        // If course creator, allow access
        const course = await Course.findByPk(course_id);
        if (course && course.created_by === user_id) return next();

        // Otherwise, check enrollment
        const enrollment = await Enrollment.findOne({
            where: { user_id, course_id }
        });

        if (!enrollment) {
            return res.status(403).json({ message: 'Access denied. You are not enrolled in this course.' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ message: 'Error checking access.', error: err.message });
    }
};
