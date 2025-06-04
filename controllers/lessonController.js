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

// get lesson by id 
export async function getLessonById(req, res) {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findOne({
      where: { id: lessonId },
    });

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.status(200).json({ lesson });
  } catch (error) {
    console.error('Fetch lesson by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
// Update lesson
export async function updateLesson(req, res) {
  try {
    const { lessonId } = req.params;
    const { title, content, video_url, lesson_order } = req.body;

    const lesson = await Lesson.findOne({
      where: { id: lessonId },
    });

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    lesson.title = title || lesson.title;
    lesson.content = content || lesson.content;
    lesson.video_url = video_url || lesson.video_url;
    lesson.lesson_order = lesson_order || lesson.lesson_order;

    await lesson.save();

    res.status(200).json({ message: 'Lesson updated', lesson });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}