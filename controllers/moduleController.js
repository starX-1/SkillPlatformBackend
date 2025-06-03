import Module from '../models/Module.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new module
export async function createModule(req, res) {
    try {
        const { title, module_order } = req.body;
        const { courseId } = req.params;

        if (!title) {
            return res.status(400).json({ message: 'Module title is required' });
        }

        const newModule = await Module.create({
            id: uuidv4(),
            title,
            module_order,
            course_id: courseId,
        });

        res.status(201).json({ message: 'Module created', module: newModule });
    } catch (error) {
        console.error('Create module error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Get all modules for a course
export async function getModulesByCourse(req, res) {
    try {
        const { courseId } = req.params;

        const modules = await Module.findAll({
            where: { course_id: courseId },
            order: [['module_order', 'ASC']],
        });

        res.json({ modules });
    } catch (error) {
        console.error('Fetch modules error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
