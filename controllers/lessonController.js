import Lesson from '../models/Lesson.js';
import { v4 as uuidv4 } from 'uuid';

// Create lesson
export async function createLesson(req, res) {
  try {
    const { moduleId } = req.params;
    const { title, content, video_url, lesson_order } = req.body;

    const lesson = await Lesson.create({
      id: uuidv4(),
      module_id: moduleId,
      title,
      content,
      video_url,
      lesson_order,
    });

    res.status(201).json({ message: 'Lesson created', lesson });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Get lessons by module
export async function getLessonsByModule(req, res) {
  try {
    const { moduleId } = req.params;
    const lessons = await Lesson.findAll({
      where: { module_id: moduleId },
      order: [['lesson_order', 'ASC']],
    });

    res.status(200).json({ lessons });
  } catch (error) {
    console.error('Fetch lessons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
