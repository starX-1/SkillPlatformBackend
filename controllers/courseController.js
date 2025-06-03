import Course from '../models/Course.js';

export async function createCourse(req, res) {
    try {
        const { title, description, thumbnail_url } = req.body;
        const created_by = req.user.id;  // assuming you have JWT middleware that sets req.user

        if (!title) {
            return res.status(400).json({ message: 'Course title is required' });
        }

        const newCourse = await Course.create({
            title,
            description,
            thumbnail_url,
            created_by,
        });

        res.status(201).json({ message: 'Course created', course: newCourse });
    } catch (error) {
        console.error('Create course error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function getAllCourses(req, res) {
    try {
        const courses = await Course.findAll({
            include: [{ association: 'creator', attributes: ['id', 'full_name', 'email'] }],
            order: [['created_at', 'DESC']],
        });
        res.json({ courses });
    } catch (error) {
        console.error('Get courses error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export async function getCourseById(req, res) {
    try {
        const { id } = req.params;
        const course = await Course.findByPk(id, {
            include: [{ association: 'creator', attributes: ['id', 'full_name', 'email'] }],
        });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ course });
    } catch (error) {
        console.error('Get course by ID error:', error);
        res.status(500).json({ message: 'Server error' });
    }
    
}

export async function updateCourse(req, res) {
    try {
        const { id } = req.params;
        const { title, description, thumbnail_url } = req.body;

        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Only allow updates if the user is the creator
        if (course.created_by !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this course' });
        }

        await course.update({ title, description, thumbnail_url });

        res.json({ message: 'Course updated', course });
    } catch (error) {
        console.error('Update course error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
