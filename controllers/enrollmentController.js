import Enrollment from '../models/Enrollment.js';

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
        const enrollments = await Enrollment.findAll({ where: { user_id } });
        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).json({ message: 'Could not fetch enrollments', error: err.message });
    }
};
