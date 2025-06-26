import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import User from '../models/user.js';


Enrollment.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
Course.hasMany(Enrollment, { foreignKey: 'course_id' });

export const enrollUser = async (req, res) => {
    const user_id = req.user.id;
    const { course_id } = req.body;

    try {
        const exists = await Enrollment.findOne({ where: { user_id, course_id } });
        if (exists) return res.status(400).json({ message: 'Already enrolled in this course' });

        const enrollment = await Enrollment.create({ user_id, course_id });
        res.status(201).json({ message: 'Enrolled successfully', enrollment });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const getUserEnrollments = async (req, res) => {
    const user_id = req.user.id;

    try {
        const enrollments = await Enrollment.findAll({
            where: { user_id },
            // join with courses table to get course details
            include: [{
                model: Course,
                as: 'course',
                attributes: ['id', 'title', 'description', 'thumbnail_url', 'created_by', 'created_at'],
                include: [
                    {
                        model: User,
                        as: 'creator',
                        attributes: ['id', 'full_name', 'email'],
                    }
                ]
            }],
        });
        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).json({ message: 'Could not fetch enrollments', error: err.message });
    }
};


// get all users enrolled in a course
export const getCourseEnrollments = async (req, res) => {
    const { courseId } = req.params;

    try {
        const enrollments = await Enrollment.findAll({
            where: { course_id: courseId },
            // include: ['user'],
        });
        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).json({ message: 'Could not fetch course enrollments', error: err.message });
    }
}